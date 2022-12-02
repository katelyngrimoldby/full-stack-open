import { useQuery } from '@apollo/client';
import queries from '../queries';

const Recommended = ({ show, favGenre }) => {
  const books = useQuery(queries.ALL_BOOKS, {
    variables: { genre: favGenre },
  });

  if (books.loading) {
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
          {books &&
            books.data &&
            books.data.allBooks.map((a) => (
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
