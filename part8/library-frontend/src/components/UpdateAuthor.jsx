import { useState } from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';

const UpdateAuthor = ({ show, authors }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const [editAuthor] = useMutation(queries.EDIT_AUTHOR, {
    refetchQueries: [{ query: queries.ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name, year: Number(year) },
    });

    setName('');
    setYear('');
  };

  return (
    <div>
      <h3>Add Birth Year</h3>
      <form onSubmit={handleSubmit}>
        <select
          name='authors'
          id='authors'
          value={name}
          onChange={(event) => setName(event.target.value)}
        >
          <option value=''>Select an Author</option>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          type='number'
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder='Birthyear'
        />
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
