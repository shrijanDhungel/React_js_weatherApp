import React, { useState } from 'react'
import './WeatherApp.css'

import searchIcons from '../Assets/search.png';
import clearIcons from '../Assets/clear.png';
import cloudIcons from '../Assets/cloud.png';
import drizzleIcons from '../Assets/drizzle.png';
import rainIcons from '../Assets/drizzle.png';
import snowIcons from '../Assets/snow.png';
import windIcons from '../Assets/wind.png';
import humidityIcons from '../Assets/humidity.png';


const WeatherApp = () => {

  let api_key = "8ff80bbb18dd0157ff7d5a3d47e82fac";


  const [wicon, setWicon] = useState(cloudIcons);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value == "")
    {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();


    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");


    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = data.wind.speed+" Km/hr";
    temperature[0].innerHTML = data.main.temp+" °C";
    location[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n")
    {
      setWicon(clearIcons);
    }
  }


  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='search' />
        <div className="search-icon" onClick={()=> {search()}}>
          <img src={searchIcons} alt="" />
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">
        24 C
      </div>
      <div className="weather-location">
        London
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcons} alt="" className='icon' />
          <div className="data">
            <div className="humidity-percent">
              64%
            </div>
            <div className="text">
              Humidity
            </div>
          </div>
        </div>
        <div className="element">
          <img src={windIcons} alt="" className='icon' />
          <div className="data">
            <div className="wind-rate">
              18 km/hr
            </div>
            <div className="text">
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp