import { useState } from 'react'


function App() {
  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if(entries.find(entry => entry.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
    } else {
      const copy = entries.concat({name: newName})
      setEntries(copy)
  
      setNewName('')
    }
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" value={newName} onChange={(event) => setNewName(event.target.value)} />
        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <div>
        {entries.map(entry => <p key={entry.name}>{entry.name}</p>)}
      </div>
    </div>
  )
}

export default App
