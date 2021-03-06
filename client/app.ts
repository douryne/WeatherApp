import './main.css'

class Weather {
    private static searchBar = <HTMLInputElement>document.querySelector('.search-bar');
    private static cityElem = <Element>document.querySelector('.city');
    private static tempElem = <Element>document.querySelector('.temperature');
    private static descriptionELem = <Element>document.querySelector('.description');
    private static humidityELem = <Element>document.querySelector('.humidity');
    private static windSpeedElem = <Element>document.querySelector('.wind');
    private static iconElem = <HTMLImageElement>document.querySelector('.icon');
    private static dateElem = <Element>document.querySelector('.date');
    private static weatherElem = <Element>document.querySelector('.weather');
    private static alert = <HTMLElement>document.querySelector('.modal');
    private static alertText = <Element>document.querySelector('.error');

    private static timerID: NodeJS.Timer;

    async getWeatherData(city: string) {
        let response = await fetch(`/getWeather?city=${city}`);
        if(!response.ok) throw new Error(await response.text())
        let data = await response.json();

        let weatherData = {
            cityName: data.name,
            humidity: data.main.humidity,
            description: data.weather[0].main,
            windSpeed: data.wind.speed,
            temp: data.main.temp,
            icon: data.weather[0].icon
        }
        return weatherData;
        
    }
    async displayWeatherData() {
        let errorMessage = null;
        const cityName = Weather.searchBar.value;
        const weatherData =  await this.getWeatherData(cityName).catch((error) => errorMessage = error.message);

        if(errorMessage) {
            return this.alertError(errorMessage);
        }
        
        Weather.cityElem.innerHTML = `Weather in ${weatherData.cityName}`;
        Weather.tempElem.innerHTML = `${Math.round(weatherData.temp)}°C`;
        Weather.descriptionELem.innerHTML = weatherData.description;
        Weather.humidityELem.innerHTML = `Humidity: ${weatherData.humidity}%`;
        Weather.windSpeedElem.innerHTML = `Wind speed: ${weatherData.windSpeed.toFixed(1)} m/s`;
        Weather.iconElem.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
        Weather.dateElem.innerHTML = `${this.getCurrentDate()}`;

        if(weatherData.description === 'Snow')  Weather.timerID = setInterval(this.createSnowFlake, 100);
        else clearInterval(Weather.timerID);
        this.changeBackground(weatherData.description);
        Weather.weatherElem.classList.replace('loading', 'loaded');
    }

    getSearchBar() {
        return Weather.searchBar
    }

    getCurrentDate() {
        const formatter = new Intl.DateTimeFormat("en", {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            year: 'numeric',
        });
        return formatter.format(new Date());
    }

    changeBackground(description: string) {
        document.body.style.backgroundImage = `url('img/${description}.jpg')`;
    }

    alertError(error: string) {
        const root = document.documentElement;

        Weather.alertText.innerHTML = `${error}`;
        root.style.setProperty('--visibility', 'visible');
        Weather.alert.classList.toggle('activate');
        
        setTimeout(() => {
            Weather.alert.classList.toggle('activate');
            setTimeout(() => root.style.setProperty('--visibility', 'hidden'), 2000);          
        }, 3000)
    }

    createSnowFlake() {
        const snowFlake = document.createElement('div');
        snowFlake.classList.add('snowflake');
        
        snowFlake.style.left = `${Math.random() * window.innerWidth - 15}px`;
        snowFlake.style.animationDuration = `${Math.random() * 2 + 1}s`;
        snowFlake.style.opacity = `${Math.random()}`;
        snowFlake.style.padding = `${Math.random() * 5 + 5}px`;
        snowFlake.style.filter = `blur(${Math.random() - 0.2}em)`

        document.body.appendChild(snowFlake);

        setTimeout(() => {
            snowFlake.remove();
        }, 3000)
    }
}

const weather = new Weather();

const searchBar = weather.getSearchBar();
const searchBtn = <HTMLInputElement>document.querySelector('.search button');


searchBtn.addEventListener('click', () => {
    weather.displayWeatherData();
    searchBar.value = '';
})

searchBar.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') {
        weather.displayWeatherData();
        searchBar.value = '';
    }
})
