import React, { useState } from 'react'
import './WeatherCard.css'
import SearchButton from './SearchButton'

const WeatherCard = ({ weather, temperature }) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const changeTemp = () => setIsCelsius(!isCelsius)
 

  return (
    <article className='card__container'>
        <h1>Weather App</h1>
        <form className='search__form'>
            <input type='text' placeholder='search a city'/>
            <SearchButton />
        </form>
        <h2 className='city__name'>{weather?.name}, {weather?.sys.country}</h2>
        <section>
            <header><img src='https://openweathermap.org/img/wn/10d@2x.png' alt="icon-time" /></header>
            <article>
                <h3 className='time__description'>"{weather?.weather[0].description}"</h3>
                <ul className='details__container'>
                    <li className='li__item'><span className='detail__time__a'>Wind Speed</span>{weather?.wind.speed}m/s</li>
                    <li className='li__item'><span className='detail__time__b'>Clouds</span>{weather?.clouds.all}%</li>
                    <li className='li__item'><span className='detail__time__c'>Pressure</span>{weather?.main.pressure}hPa</li>
                </ul>
            </article>
        </section>
        <footer>
            <h2>
                {
                    isCelsius
                    ?   `${temperature?.celsius} °C`
                    :   `${temperature?.farenheit} °F`   
                }
            </h2>
            <button className='btn__temp' onClick={changeTemp}>Change to { isCelsius ? '°F' : '°C'}</button>
        </footer>
    </article>
  )
}

export default WeatherCard