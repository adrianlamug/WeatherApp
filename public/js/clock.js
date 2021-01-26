window.onload = function() {
    const mainSection = document.querySelector('.mainSection').innerHTML;
    function showTime() {
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if (hour < 10 ){
            hour = `0${hour}`
        }
        if (minutes < 10 ){
            minutes =`0${minutes}`
        }
        if (seconds < 10){
            seconds =`0${seconds}`
        }
        var time = `<section>${hour} : ${minutes} : ${seconds}</section> `;
        document.querySelector('.mainSection').innerHTML = mainSection +time;
    }
    showTime();
    setInterval(showTime,1000)
}

