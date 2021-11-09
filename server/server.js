const express = require('express');
const axios = require('axios');
const path = require('path')
require("dotenv").config();
const parse = require('node-html-parser').parse;
const fs = require('fs');

const apiKey = `${process.env.WEATHER_OPEN_API_KEY}`;
const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    var html = fs.readFileSync('./public/index.html', 'utf8');
    const root = parse(html);
 
    const head = root.querySelector('head');
    if (head !== null) {
        head.innerHTML += `<script>window.PORT = ${PORT}</script>`;
    }
    res.send(root.innerHTML);
});

app.use(express.static('public'));

app.get('/getWeather', async (req, res) => {
    let city = req.query.city;
    
    let data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    res.json(data.data);
});


app.listen(PORT, () => {
    console.log(`SERVER ON PORT ${PORT}`)
})


