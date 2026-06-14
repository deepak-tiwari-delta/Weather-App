const button = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

 

button.addEventListener("click", async() =>{
    const city = cityInput.value.trim();

    if(city === ""){
        console.log("Please enter city name");
        return;
    }
   
    weatherResult.innerHTML = "Loading ...";
    
    const apiKeys = "0f36ff47bf416ba4c5e1c5d84e399bcc";
    const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.cod === 404){
        weatherResult.innerHTML = `<h3> City not Found</h3>`;
        return;
    }

   const iconCode = data.weather[0].icon;
   const description = data.weather[0].description;

const formattedDescription =
    description[0].toUpperCase() + description.slice(1);

const iconUrl =
`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

weatherResult.innerHTML = `
<div class="weather-card">
    <h2>${data.name}</h2>

    <img src="${iconUrl}" alt="Weather Icon">

    <h1>🌡️ ${Math.round(data.main.temp)}°C</h1>

    <p>🤗 Feels Like: ${Math.round(data.main.feels_like)}°C</p>

    <p>💧 Humidity: ${data.main.humidity}%</p>

    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>

    <p>☁️ ${formattedDescription}</p>
</div>
`
;
     
 
});
cityInput.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        button.click();
    }
});