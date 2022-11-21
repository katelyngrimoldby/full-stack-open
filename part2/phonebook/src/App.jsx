import { useState } from 'react'
import Entries from './components/Entries'
import Entry from "./components/Entry"
import Form from './components/Form'
import Filter from './components/Filter'

function App() {
  const [entries, setEntries] = useState([{name: "Ada Lovelace", number: "555-111-2222"}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        <Filter value={filter} handleChange={(event) => setFilter(event.target.value)} />
      <h2>Add new Entry</h2>
      <Form name={newName} 
        number={newNumber} 
        handleName={(event) => setNewName(event.target.value)} 
        handleNumber={(event) => setNewNumber(event.target.value)} 
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {/* {entries.map(entry => <Entry key={entry.name} entry={entry} />)} */}
      <Entries entries={[...entries]} filter={filter} />
      
    </div>
  )
}

export default App
