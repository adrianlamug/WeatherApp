const { response } = require("express");

function getWeatherDetails(){
    const apiKey = '5af5421575df11b7fca6bd3f50da2cba';
    const weatherResults = document.querySelector('.weatherResults')
    const city = document.getElementById('cityName').value;
    var request = new XMLHttpRequest()
    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`, true);
    request.onload = async function() {
        var results = JSON.parse(this.response)
        const cityName = results.name;
        const country = results.sys.country;
        const cityTemperature = results.main.temp;
        const feelsLike = results.main.feels_like;
        const windSpeed = results.wind.speed;
        const humidity = results.main.humidity;
        const pressure = results.main.pressure;
        var data = {cityName, country, cityTemperature, feelsLike, windSpeed, humidity, pressure};
        
        weatherResults.innerHTML = `${cityName}, ${country} <br>
        Current temperature: ${cityTemperature}° Feels like: ${feelsLike}° <br>
        Wind Speed: ${windSpeed} km/h<br>
        Humidity: ${humidity} Pressure: ${pressure} <br> 
        Expect: ${results.weather[0].description}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
    };
    
    
    
    request.send();
}


