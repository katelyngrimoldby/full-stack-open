import { useState } from 'react'


function App() {
  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(entries.find(entry => entry.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const copy = entries.concat({name: newName, number: newNumber})
      setEntries(copy)
  
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Name: </label>
        <input type="text" id="nameInput" value={newName} onChange={(event) => setNewName(event.target.value)} />
        <label htmlFor="numberInput">Number: </label>
        <input type="text" id="numberInput" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <div>
        {entries.map(entry => <p key={entry.name}>{entry.name}: {entry.number}</p>)}
      </div>
    </div>
  )
}

export default App
