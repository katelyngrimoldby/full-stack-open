import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const data = response.data

      setCountries(data)
    })

  }, [])

  useEffect(() => {
    const filtered = [...countries].filter(country => {
      return (country.name.common.toUpperCase().includes(filter.toUpperCase()) || country.name.official.toUpperCase().includes(filter.toUpperCase()))
    })

    setFilteredCountries(filtered)
  }, [filter])

  return (
    <div className="App">
      <label htmlFor="filter">Find Countries</label>
      <input 
        type="search" 
        id="filter" 
        value={filter} 
        onChange={(event) => setFilter(event.target.value)} 
      />

      <div>
        {filteredCountries.length >= 10 ? (<p>Please make your filtration more specific.</p>) : null}
        {(filteredCountries.length < 10 && filteredCountries.length > 1) ? filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>) : null}
        {filteredCountries.length === 1 ? (
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital: {filteredCountries[0].capital[0]}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <h2>Languages: </h2>
            <ul>
              {Object.entries(filteredCountries[0].languages).map(language => <li key={language[0]}>{language[1]}</li>)}
            </ul>
            <img src={filteredCountries[0].flags.svg} alt="Flag" width="300" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
