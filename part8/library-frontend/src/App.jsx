import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import queries from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import UpdateAuthor from './components/UpdateAuthor';
import Login from './components/Login';

const App = () => {
  const [token, setToken] = useState('');
  const [page, setPage] = useState('authors');
  const authors = useQuery(queries.ALL_AUTHORS);
  const books = useQuery(queries.ALL_BOOKS);

  useEffect(() => {
    const token = window.localStorage.getItem('user-token');

    if (token) {
      setToken(token);
    }
  });

  const handleLogout = () => {
    window.localStorage.removeItem('user-token');
    setToken('');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('update')}>update author</button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
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
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
