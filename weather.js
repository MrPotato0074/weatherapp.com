const cityNameOutput = document.getElementById("city-name-output");
const temperatureOutput = document.getElementById("temperature-output");
const descriptionOutput = document.getElementById("description-output");
const logoOutput = document.getElementById("logo");
const weatherBtn = document.getElementById("weather-btn");
const weatherInput = document.getElementById("weather-input");
const errorOutput = document.getElementById("error");

const getWeather = () => {
    const apiKey = '75c995f5d7a351cb8a000e1547d5c2e5';
    const inputCity = weatherInput.value.toLowerCase();
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=${apiKey}`;
    
    fetch(currentWeather)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City not found. Please enter a valid city name.`);
            }else if (response.status === 500) {
                throw new Error('Server error!');
              } else {
                throw new Error(`No response from server!`);
            }
        }
        return response.json();
    })
    .then(data => {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl =  `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        cityNameOutput.innerHTML = cityName;
        temperatureOutput.innerHTML = `${temperature}°C`;
        descriptionOutput.innerHTML = description;
        logoOutput.src = iconUrl;

        document.getElementById("forecast-container").style.display = "block";
        changeCss();

        return fetch(forecast);
    })
    .then(response => response.json())
    .then(forecastData => {
        const forecastContainer = document.getElementById("forecast-days");
        forecastContainer.innerHTML = "";
        const dailyForecasts = forecastData.list.filter(item => {
            return item.dt_txt.includes("12:00:00");
        }).slice(0, 3);
        
        dailyForecasts.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("EN-UK", { weekday: "short" });
            const temp = Math.round(day.main.temp - 273.15);
            const iconCode = day.weather[0].icon;
            
            const dayElement = document.createElement("div");
            dayElement.className = "forecast-day";
            dayElement.innerHTML = `
                <div>${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${day.weather[0].description}">
                <div>${temp}°C</div>
                <div>${day.weather[0].description}</div>
            `;
            
            forecastContainer.appendChild(dayElement);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
        errorOutput.innerHTML = error.message;

        errorOutput.style.display = "block";
    });
};

const changeCss = () => {
    document.getElementById("weather-output").style.display = "flex";
    document.getElementById("wrapper-input").style.height = "85vh";
    document.getElementById("weather-btn").style.height = "45px";
    document.getElementById("weather-input").style.height = "40px";
};

weatherBtn.addEventListener("click", () => {
    errorOutput.innerHTML = '';
    getWeather();
});

weatherInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        errorOutput.innerHTML = '';
        getWeather();
    }
});

console.log(day.dt);

