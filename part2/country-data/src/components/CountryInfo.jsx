const CountryInfo = ({country, weather}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages: </h2>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.svg} alt="Flag" width="300" />
      <h2>Weather in {country.name.common}</h2>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} width="150" height="150" />
      <p>Temperature: {weather.main.temp}° C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryInfo;