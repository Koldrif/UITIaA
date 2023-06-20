class Class {
    
}

let apiKey = "2f6889df3d55667ed506821e6a039887";

async function start()
{

       // let res = fetch("https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=2f6889df3d55667ed506821e6a039887").toString();
       let request = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=2f6889df3d55667ed506821e6a039887";

}

function printCitiesToDocument(citiesWeather) {
       
}

function saveToStorage(citiesInfo, citiesWeather) {
       for (let i = 0; i < citiesInfo.length; i++) {
              localStorage.setItem(citiesInfo[i][0].local_names.ru, JSON.stringify(citiesWeather[i]));
       }
}

function printWeather(citiesInfo, citiesWeather) {
       let out = document.getElementById("output");
       out.innerHTML += "<div>Погода:</div>"
       console.log(citiesInfo, citiesWeather);
       for (let i = 0; i < citiesInfo.length; i++) {

              out.innerHTML +=`<div><p>Город: ${citiesInfo[i][0].local_names.ru}</p><p>Погода сейчас: ${citiesWeather[i].main.temp}</p></div>`;
       }
}

function findWeather()
{
       let cities = getCities();
       let citiesInfo = [];

       for (let i = 0; i < cities.length; i++) {
              citiesInfo.push(getInfoAboutCity(cities[i]));
       }
       console.log(citiesInfo);
       if(citiesInfo.length !== 0)
       {
              let out = document.getElementById("output");
              out.innerHTML = "";
       }

       let citiesWeather = [];

       for (let i = 0; i < citiesInfo.length; i++) {
              citiesWeather.push(getWeatherInCity(citiesInfo[i]));
       }

       printCitiesToDocument(citiesWeather)
       console.log(citiesWeather);
       saveToStorage(citiesInfo, citiesWeather)
       printWeather(citiesInfo, citiesWeather)
}

function getWeatherInCity(city)
{
       city = city[0];
       console.log(city);
       let weatherRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;
       return jsomResponse(weatherRequest);
}

function getCities()
{
       return document.getElementById("citiesList").value.split(",");
}

function getInfoAboutCity(city, cityLimit = 1)
{
       let cityFromName = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${cityLimit}&appid=${apiKey}`;
       return jsomResponse(cityFromName);
}

function jsomResponse(request)
{
       let xmlHttp = new XMLHttpRequest();
       xmlHttp.open("GET", request, false);
       xmlHttp.send(null);
       return JSON.parse(xmlHttp.responseText);
}
