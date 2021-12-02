const express = require('express');
const axios = require('axios');
const path = require('path');
require("dotenv").config();

const apiKey = `${process.env.WEATHER_OPEN_API_KEY}`;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getWeather', async (req, res) => {
    let city = req.query.city;
    
    let data
    try {
        data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    } catch(e) {
        res.json(e);
        return 0;
    }
    res.json(data.data);
});


app.listen(PORT, () => {
    console.log(`SERVER ON PORT ${PORT}`);
})


