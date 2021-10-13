const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
    });
    
app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apikey = "0c34a6c8d05e31bc4aa6e9d7e0270925";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) { 
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const a = weatherData.main.temp;
        console.log(a);
        const b = weatherData.weather[0].description;
        console.log(b);
        const icon = weatherData.weather[0].icon;
        const image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write('<head><meta charset="utf-8"></head>');
        res.write("<h1>The Temperature in " + query + " is " + a + " degrees celcius with " + b + ".</h1>");
        res.write("<img src=" + image + ">");
        res.send();
      
});    
    }); 
  }); 
  

app.listen(2999, function() {
  console.log("server is running on port 3000");
});
