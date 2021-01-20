import React, { useState } from "react";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

const API_KEY = "";

const App = () => {
  const backgrounds = {
    clear: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg", //photo by Francesco Ungaro
    clouds:
      "https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg", // photo by Josh Sorenson
    drizzle: "https://images.pexels.com/photos/311039/pexels-photo-311039.jpeg", //photo by Lum3n
    snow: "https://images.pexels.com/photos/289649/pexels-photo-289649.jpeg", //photo by pixabay
    rain: "https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?", // photo vy Vlad Chețan
    atmosphere:
      "https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg", // photo by Pixabay
    thunderstorm:
      "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg", // Photo by Johannes Plenio
  };

  const weatherIcons = {
    clear: "wi-day-sunny",
    clouds: "wi-day-fog",
    drizzle: "wi-sleet",
    rain: "wi-storm-showers",
    snow: "wi-snow",
    atmosphere: "wi-fog",
    thunderstorm: "wi-thunderstorm",
  };

  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [fontColor, setFontColor] = useState("white");
  const [tempCelsiusMax, setTempCelsiusMax] = useState(undefined);
  const [tempCelsiusMin, setTempCelsiusMin] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState(backgrounds.clouds);
  const [wind, setWind] = useState(undefined);
  const [error, setError] = useState(false);
  const [windWarning, setWindWarning] = useState({
    storm: false,
    hurricane: false,
  });

  const weatherIconsAndBackground = (icons, rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.thunderstorm);
        setBackground(backgrounds.thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.drizzle);
        setBackground(backgrounds.drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.rain);
        setBackground(backgrounds.rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.snow);
        setBackground(backgrounds.snow);
        setFontColor("black");
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.atmosphere);
        setBackground(backgrounds.atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.clear);
        setBackground(backgrounds.clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.clouds);
        setBackground(backgrounds.clouds);
        break;
      default:
        setBackground(backgrounds.clear);
    }
    if (rangeId >= 600 && rangeId <= 622) {
      setFontColor("rgb(40,40,40)");
    } else {
      setFontColor("white");
    }
  };

  const toCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const windAlert = (wind) => {
    if (wind.speed >= 32) {
      setWindWarning({ storm: false, hurricane: true });
    } else if (wind.speed >= 21) {
      setWindWarning({ storm: true, hurricane: false });
    } else setWindWarning({ storm: false, hurricane: false });
  };

  const getWeather = async (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );
      setError(false);
      const response = await api_call.json();
      console.log(response);
      const { name, sys, weather, wind } = response;
      const { temp, temp_max, temp_min, humidity } = response.main;
      setCity(`${name}, ${sys.country}`);
      setCountry(sys.country);
      setMain(weather[0].main);
      setWind(wind.speed);
      setHumidity(humidity);
      setCelsius(toCelsius(temp));
      setTempCelsiusMax(toCelsius(temp_max));
      setTempCelsiusMin(toCelsius(temp_min));
      setDescription(weather[0].description);
      windAlert(wind);
      weatherIconsAndBackground(weatherIcons, response.weather[0].id);
    } else {
      setError(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Form loadWeather={getWeather} error={error} fontColor={fontColor} />
      <Weather
        city={city}
        weatherIcon={icon}
        temp_celsius={celsius}
        temp_max={tempCelsiusMax}
        temp_min={tempCelsiusMin}
        wind={wind}
        windWarning={windWarning}
        humidity={humidity}
        description={description}
        fontColor={fontColor}
      />
    </div>
  );
};

export default App;
