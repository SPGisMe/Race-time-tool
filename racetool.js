function stat(strg) {
    if (strg === '') {return '';}
    
    var final = []
    
    function convertSecs(time) {
      let l = time.length;
      let hours = l > 5 ? parseInt(time[l-6] + time[l-5]) * 3600 : parseInt(time[l-5]) * 3600;
      let mins = parseInt(time[l-4] + time[l-3]) * 60;
      let secs = parseInt(time[l-2] + time[l-1]);
      return hours + mins + secs;
    }
    function unconvert(seconds){
      let h = Math.trunc(seconds/3600);
      let m = Math.floor((seconds - h * 3600) / 60);
      let s = (seconds - h * 3600 - m * 60);
    
      return `${h.toString().padStart(2,0)}|${m.toString().padStart(2,0)}|${s.toString().padStart(2,0)}`;
    }
    
    let timesArr = strg.replace(/[|]/g, '').match(/\d{3,6}/g); //replace [|] with whatver divides your times in string
    
    for (x = 0; x < timesArr.length; x++) {
      if (timesArr[x].length < 5){timesArr[x] += '0';}
      
      final.push(convertSecs(timesArr[x]));
    }
    final.sort((a,b) => a-b);
    
    let range = final[final.length - 1] - final[0];
    let average = Math.floor(final.reduce((a,b) => a + b) / final.length);
    let median = final.length % 2 ? final[Math.floor(final.length / 2)]
      : Math.floor((final[final.length / 2] + final[(final.length / 2) - 1]) / 2);
    
    return `Range: ${unconvert(range)} Average: ${unconvert(average)} Median: ${unconvert(median)}`;
}
