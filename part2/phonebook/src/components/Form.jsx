const Form = ({name, number, handleName, handleNumber, handleSubmit}) => {
  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="nameInput">Name: </label>
      <input type="text" id="nameInput" value={name} onChange={handleName} />
      <label htmlFor="numberInput">Number: </label>
      <input type="text" id="numberInput" value={number} onChange={handleNumber} />
      <button type="submit">Add</button>
    </form>
  )
  
}

export default Form;