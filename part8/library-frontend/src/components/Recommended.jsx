import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import queries from '../queries';

const Recommended = ({ show, favGenre, books }) => {
  const [getBooks, { loading, error, data }] = useLazyQuery(queries.ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getBooks({ variables: { genre: favGenre } });
  }, [books]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommended</h2>
      <p>
        Books in your favourite genre <b>{favGenre}</b>
      </p>
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
    </div>
  );
};

export default Recommended;
