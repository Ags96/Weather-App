import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {
  const [latlon, setLatlon] = useState();
  const [weather, setWeather] = useState();
  const [search, setSearch] = useState();
  const [temperature, setTemperature] = useState();
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.input.value.toLowerCase().trim());
    e.target.input.value = "";
  };

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLatlon(obj);
    };

    const error = () => {};
    navigator.geolocation.getCurrentPosition(success, error);
  }, [search]);

  useEffect(() => {
    if (!search) {
      if (latlon) {
        const apikey = "3c28762c3185b47c8df5c8e3b4084032";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`;
        axios
          .get(url)
          .then((res) => {
            const celsius = (res.data.main.temp - 273.15).toFixed(1);
            const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);
            setTemperature({ celsius, farenheit });
            setWeather(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (latlon) {
        const apikey = "3c28762c3185b47c8df5c8e3b4084032";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}&q=${search}`;
        axios
          .get(url)
          .then((res) => {
            const celsius = (res.data.main.temp - 273.15).toFixed(1);
            const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);
            setTemperature({ celsius, farenheit });
            setWeather(res.data);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
            setTimeout(() => {
              setError(false);
            }, 3000);
          });
      }
    }
  }, [latlon]);

  return (
    <div className="App">
      {weather ? (
        <>
          <div>
            <div className="title__form__container">
              <h1 className="app__title">Weather App</h1>
              <form onSubmit={handleSearch}>
                <input id="input" type="text" autoComplete="off" />
                <button className="btn__search">Search</button>
              </form>
            </div>
            <WeatherCard
              error={error}
              weather={weather}
              temperature={temperature}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
