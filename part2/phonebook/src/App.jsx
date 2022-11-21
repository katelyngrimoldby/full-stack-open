import { useState, useEffect } from 'react'
import entryService from './services/entryService'
import Entries from './components/Entries'
import Form from './components/Form'
import Filter from './components/Filter'

function App() {
  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    entryService
      .getAll()
      .then(entries => setEntries(entries))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    if(entries.find(entry => entry.name.toUpperCase() === newName.toUpperCase())) {
      alert(`${newName} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      
      entryService
        .create({name: newName, number: newNumber})
        .then(entry => setEntries(entries.concat(entry)))
  
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id) => {
    const entry = entries.find(entry => entry.id === id)
    if(window.confirm(`Delete ${entry.name}?`)) {
      entryService
      .deleteEntry(id)
      .then(() => {
        setEntries([...entries].filter(entry => entry.id !== id))
      })
    }
    
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
        <Filter value={filter} handleChange={(event) => setFilter(event.target.value)} />
      <h2>Add new Entry</h2>
      <Form name={newName} 
        number={newNumber} 
        handleName={(event) => setNewName(event.target.value)} 
        handleNumber={(event) => setNewNumber(event.target.value)} 
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Entries entries={[...entries]} filter={filter} handleClick={(id) => handleDelete(id)} />
      
    </div>
  )
}

export default App
