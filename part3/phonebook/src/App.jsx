import { useState, useEffect } from 'react';
import entryService from './services/entryService';
import Entries from './components/Entries';
import Form from './components/Form';
import Filter from './components/Filter';
import Message from './components/Message';
import './main.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState();

  useEffect(() => {
    entryService
      .getAll()
      .then(entries => setEntries(entries));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(entries.find(entry => entry.name.toUpperCase() === newName.toUpperCase())) {

      if(window.confirm(`${newName} is already in the phonebook. Replace their number with the new one?`)) {
        const entry = entries.find(entry => entry.name.toUpperCase() === newName.toUpperCase());

        entryService
          .update(entry.id, { name: newName, number: newNumber })
          .then(newEntry => {
            setEntries(entries.map(entry => entry.id !== newEntry.id ? entry : newEntry));
            setMessage({ type: 'success', text: `Updated ${newEntry.name}'s number.` });
            setTimeout(() => {
              setMessage(undefined);
            }, 5000);
          });
      }

      setNewName('');
      setNewNumber('');
    } else {
      entryService
        .create({ name: newName, number: newNumber })
        .then(entry => {
          setEntries(entries.concat(entry));
          setMessage({ type: 'success', text: `Added ${entry.name}'s number.` });
          setTimeout(() => {
            setMessage(undefined);
          }, 5000);
        })
        .catch(error => {
          setMessage({ type: 'error', text: error.response.data.error });
          setTimeout(() => {
            setMessage(undefined);
          }, 5000);
        });

      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = (id) => {
    const entry = entries.find(entry => entry.id === id);
    if(window.confirm(`Delete ${entry.name}?`)) {
      entryService
        .deleteEntry(id)
        .then(() => {
          setEntries([...entries].filter(entry => entry.id !== id));
          setMessage({ type: 'success', text: `Removed ${entry.name}'s number.` });
          setTimeout(() => {
            setMessage(undefined);
          }, 5000);
        })
        .catch(() => {
          setMessage({ type: 'error', text: `${entry.name}'s information was already removed.` });
          setEntries([...entries].filter(entry => entry.id !== id));
          setTimeout(() => {
            setMessage(undefined);
          }, 5000);
        });
    }
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Message message={message} />
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
  );
}

export default App;
