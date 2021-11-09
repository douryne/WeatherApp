import './main.css'

let city = {
    name: 'Tokyo'
}

const PORT = process.env.PORT;

async function fetchReq() {
    let weather = await fetch(`http://localhost:${PORT}/getWeather?city=${city.name}`);
    let json = await weather.json()
    console.log(json)
}

fetchReq();
