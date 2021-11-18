import './main.css'

class Weather {
    private static cityName: string = 'Moscow';
    private static searchBar = <HTMLInputElement>document.querySelector('.search-bar');

    private static cityElem = <Element>document.querySelector('.city');
    private static tempElem = <Element>document.querySelector('.temperature');
    private static descriptionELem = <Element>document.querySelector('.description');
    private static humidityELem = <Element>document.querySelector('.humidity');
    private static windSpeedElem = <Element>document.querySelector('.wind');
    private static iconElem = <HTMLImageElement>document.querySelector('.icon');

    async getWeatherData() {
        let data = await fetch(`/getWeather?city=${Weather.cityName}`);
        let json = await data.json();

        let weatherData = {
            humidity: json.main.humidity,
            description: json.weather[0].main,
            windSpeed: json.wind.speed,
            temp: json.main.temp,
            icon: json.weather[0].icon
        }

        return weatherData;
        
    }
    async displayWeatherData() {
        const weatherData =  await this.getWeatherData();
        Weather.cityElem.innerHTML = `Weather in ${Weather.cityName}`;
        Weather.tempElem.innerHTML = `${Math.round(weatherData.temp)}°C`;
        Weather.descriptionELem.innerHTML = weatherData.description;
        Weather.humidityELem.innerHTML = `Humidity: ${weatherData.humidity}%`;
        Weather.windSpeedElem.innerHTML = `Wind speed: ${weatherData.windSpeed.toFixed(1)} m/s`;
        Weather.iconElem.src = `http://openweathermap.org/img/w/${weatherData.icon}.png`
    }

    setCityName() : void {
        Weather.cityName = Weather.searchBar.value;
    }

    getSearchBar() : HTMLInputElement {
        return Weather.searchBar
    }

}

const weather = new Weather();

const searchBar = weather.getSearchBar();
const searchBtn = <HTMLInputElement>document.querySelector('.search button');


searchBtn.addEventListener('click', () => {
    weather.setCityName();
    weather.displayWeatherData();
    searchBar.value = '';
})

