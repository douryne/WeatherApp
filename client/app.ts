import './main.css'

class Weather {
    private static cityName: string = '';
    private static searchBar = <HTMLInputElement>document.querySelector('.search-bar');

    private static cityElem = <Element>document.querySelector('.city');
    private static tempElem = <Element>document.querySelector('.temperature');
    private static descriptionELem = <Element>document.querySelector('.description');
    private static humidityELem = <Element>document.querySelector('.humidity');
    private static windSpeedElem = <Element>document.querySelector('.wind');
    private static iconElem = <HTMLImageElement>document.querySelector('.icon');
    private static dateElem = <Element>document.querySelector('.date');

    async getWeatherData() {
        let data = await fetch(`/getWeather?city=${Weather.cityName}`);
        let json = await data.json();

        if(json.message) return json.message;

        let weatherData = {
            cityName: json.name,
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
        const currDate = this.getCurrentDate();

        if(typeof weatherData === 'string') {
            this.alertError(weatherData);
            return 0;
        }
        
        Weather.cityElem.innerHTML = `Weather in ${weatherData.cityName}`;
        Weather.tempElem.innerHTML = `${Math.round(weatherData.temp)}°C`;
        Weather.descriptionELem.innerHTML = weatherData.description;
        Weather.humidityELem.innerHTML = `Humidity: ${weatherData.humidity}%`;
        Weather.windSpeedElem.innerHTML = `Wind speed: ${weatherData.windSpeed.toFixed(1)} m/s`;
        Weather.iconElem.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
        Weather.dateElem.innerHTML = `${this.dateManage(currDate)}`;

        if(weatherData.description === 'Snow') setInterval(this.createSnowFlake, 50);
        this.changeBackground(weatherData.description);
        const weatherElem = <Element>document.querySelector('.weather');
        weatherElem.classList.replace('loading', 'loaded');
    }

    setCityName() : void {
        Weather.cityName = Weather.searchBar.value;
    }

    getSearchBar() : HTMLInputElement {
        return Weather.searchBar
    }

    getCurrentDate() : Date {
        return new Date();
    }

    dateManage(dateObj: Date) : string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];

        const year = dateObj.getFullYear();
        const month = months[dateObj.getMonth()];
        const date = dateObj.getDate();
        const day = days[dateObj.getDay()];

        return `${date} ${month} (${day}) ${year}`;
    }

    changeBackground(description: string) : void {
        document.body.style.backgroundImage = `url('img/${description}.jpg')`;
    }

    alertError(error: string) : void {
        const alert = <HTMLElement>document.querySelector('.modal');
        const alertText = <Element>document.querySelector('.error');
        const root = document.documentElement;

        alertText.innerHTML = `${error}`;
        root.style.setProperty('--visibility', 'visible');
        alert.classList.toggle('activate');
        
        setTimeout(() => {
            alert.classList.toggle('activate');
            setTimeout(() => root.style.setProperty('--visibility', 'hidden'), 2000);          
        }, 3000)
    }

    createSnowFlake() {
        const snowFlake = document.createElement('div');
        snowFlake.classList.add('snowflake');
        
        snowFlake.style.left = `${Math.random() * window.innerWidth}px`;
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
    weather.setCityName();
    weather.displayWeatherData();
    searchBar.value = '';
})

searchBar.addEventListener('keyup', (event: KeyboardEvent) => {
    if(event.key === 'Enter') {
        weather.setCityName();
        weather.displayWeatherData();
        searchBar.value = '';
    }
})