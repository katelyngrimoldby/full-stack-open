import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState()

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
    setCurrentCountry(undefined)
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
        {currentCountry ? 
          <CountryInfo country={currentCountry} /> 
        : (filteredCountries.length >= 10 ? 
          (<p>Please make your filtration more specific.</p>) 
        : (filteredCountries.length < 10 && filteredCountries.length > 1) ?
          filteredCountries.map(country => {
            <Country key={country.name.common} 
              country={country} 
              handleClick={() => setCurrentCountry(country)} 
            />
          }) 
        : filteredCountries.length === 1 ? 
          setCurrentCountry(filteredCountries[0]) 
        : null)}
      </div>
    </div>
  )
}

export default App
