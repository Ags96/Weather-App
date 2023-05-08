import React, { useState } from "react";
import "./styles/weatherCard.css";

const WeatherCard = ({ weather, temperature, error }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const handleChangeT = () => setIsCelsius(!isCelsius);

  const urlIcon = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`;
  return (
    <article className="card__container">
      <h2 className="city__name">
        {weather?.name}, {weather?.sys.country}
      </h2>
      {!error ? (
        ""
      ) : (
        <span className="search__error__city">
          Failed to search, try another city
        </span>
      )}
      <section>
        <header className="current__icon-container">
          <img
            className="current__weather-icon"
            src={urlIcon}
            alt="weatherIcon"
          />
        </header>
        <article>
          <h3 className="time__description">
            <b>Clouds: </b>"{weather?.weather[0].description}"
          </h3>
          <ul className="details__container">
            <li className="detail__time">
              <b>Wind Speed: </b>
              <p className="stat__time">{(weather?.wind.speed * 3.6).toFixed(2)} k/h</p>
            </li>
            <li className="detail__time">
              <b>Clouds: </b>
              <p className="stat__time">{weather?.clouds.all} %</p>
            </li>
            <li className="detail__time">
              <b>Pressure: </b>
              <p className="stat__time">{weather?.main.pressure} hPa</p>
            </li>
          </ul>
        </article>
        <footer>
          <h2 className="temp">
            {isCelsius
              ? `${temperature?.celsius} ºC`
              : `${temperature?.farenheit} ºF`}
          </h2>
          <button className="btn__temp" onClick={handleChangeT}>
            Change to {isCelsius ? `ºF` : `ºC`}
          </button>
        </footer>
      </section>
    </article>
  );
};

export default WeatherCard;
