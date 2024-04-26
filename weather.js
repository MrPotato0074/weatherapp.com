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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`;
    
    fetch(apiUrl)
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
        changeCss();
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
        errorOutput.innerHTML = error.message;
    });
};

const changeCss = () => {
    document.getElementById("weather-output").style.display = "flex";
    document.getElementById("wrapper-input").style.height = "70vh";
    document.getElementById("weather-btn").style.height = "15vh";
    document.getElementById("weather-input").style.height = "4vh";
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
