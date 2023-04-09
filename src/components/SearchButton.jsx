import React, { useState } from 'react'


const SearchButton = () => {

    const [city, setCity] = useState('')

    /*http://api.openweathermap.org/geo/1.0/direct?q={viedma}&limit=1&appid=3c28762c3185b47c8df5c8e3b4084032*/


  return (
    <div>
        <button className='btn__search' type='button' >Search</button>
    </div>
  )
}

export default SearchButton