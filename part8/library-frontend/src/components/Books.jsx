import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import queries from '../queries';

const Books = ({ show, allBooks }) => {
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState('');
  const [getBooks, { loading, error, data }] = useLazyQuery(queries.ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const allGenres = allBooks.map((book) => book.genres);

    setGenres([...new Set(allGenres.flat())]);
    getBooks();
    setFilter('');
  }, [allBooks]);

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
  error && console.log(error);
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
          {data &&
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
