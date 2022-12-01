import { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import UpdateAuthor from './components/UpdateAuthor';

const App = () => {
  const [page, setPage] = useState('authors');
  const authors = useQuery(queries.ALL_AUTHORS);
  const books = useQuery(queries.ALL_BOOKS);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('update')}>update author</button>
      </div>

      {authors.loading ? (
        <div>Loading...</div>
      ) : (
        <Authors show={page === 'authors'} authors={authors.data.allAuthors} />
      )}

      {books.loading ? (
        <div>Loading...</div>
      ) : (
        <Books show={page === 'books'} books={books.data.allBooks} />
      )}

      <NewBook show={page === 'add'} />

      {authors.loading ? (
        <div>Loading...</div>
      ) : (
        <UpdateAuthor
          show={page === 'update'}
          authors={authors.data.allAuthors}
        />
      )}
    </div>
  );
};

export default App;
