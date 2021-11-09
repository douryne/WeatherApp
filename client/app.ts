import './main.css'
import { PORT } from './env'

let city = {
    name: 'Tokyo'
}

async function fetchReq() {
    let weather = await fetch(`http://localhost:${PORT}/getWeather?city=${city.name}`);
    let json = await weather.json()
    console.log(json)
}

fetchReq();
