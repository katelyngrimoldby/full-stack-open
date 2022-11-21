const Country = ({country, handleClick}) => {
  return(
    <li>
      <span>{country.name.common}</span>
      <button onClick={handleClick}>Show</button>
    </li>
  )
}

export default Country;