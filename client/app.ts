import './main.css'

let city = {
    name: 'Tokyo'
}

async function fetchReq() {
    let weather = await fetch(`http://localhost:3000/getWeather?city=${city.name}`);
    let json = await weather.json()
    console.log(json)
}

fetchReq();