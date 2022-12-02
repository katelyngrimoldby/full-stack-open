import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import queries from '../queries';

const Books = ({ show }) => {
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('');
  useQuery(queries.ALL_BOOKS, {
    onCompleted: (data) => {
      const allGenres = data.allBooks.map((book) => book.genres);

      setGenres([...new Set(allGenres.flat())]);
    },
  });
  const [getBooks, { loading, error, data }] = useLazyQuery(queries.ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getBooks();
    setFilter('');
  }, []);

  const handleClick = (event) => {
    setFilter(event.target.id);
    getBooks({ variables: { genre: event.target.id } });
  };

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <p>{filter ? `Showing books in genre ${filter}` : 'Showing all books'}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks &&
            data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button onClick={handleClick} key={genre} id={genre}>
          {genre}
        </button>
      ))}
      <button onClick={handleClick}>All Genres</button>
    </div>
  );
};

export default Books;
