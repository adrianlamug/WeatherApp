const express = require('express');
const app = express();
const Datastore = require('mysql')


const con = Datastore.createConnection({
    host: "aa1fuo2zpcpkdv5.cheguqo3lqm8.eu-west-1.rds.amazonaws.com",
    user: "root",
    password: "********", //hid the password
    database: "ebdb"
})
const port = process.env.port || 3000;
app.listen(port, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));




app.post('/api', (request, response) => {
    console.log(request);
    const data = request.body;
    const time = Date.now();
    response.json({
        status:'success',
        cityName: data.cityName,
        country: data.country,
        cityTemperature: data.cityTemperature,
        feelsLike : data.feelsLike,
        windSpeed : data.windSpeed,
        humidity: data.humidity,
        pressure: data.pressure
    });
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO weather (city, country, temperature, windSpeed, humidity, pressure) VALUES ('${data.cityName}', '${data.country}', ${data.cityTemperature}, ${data.windSpeed}, ${data.humidity}, ${data.pressure})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
    });
    con.end();
});

