import { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import queries from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import UpdateAuthor from './components/UpdateAuthor';
import Login from './components/Login';
import Recommended from './components/Recommended';

const App = () => {
  const [token, setToken] = useState('');
  const [page, setPage] = useState('authors');
  const authors = useQuery(queries.ALL_AUTHORS);
  const me = useQuery(queries.ME);
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem('user-token');

    if (token) {
      setToken(token);
    }
  });

  const handleLogout = () => {
    window.localStorage.removeItem('user-token');
    setToken('');
    client.resetStore();
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
        {token && (
          <button onClick={() => setPage('recommended')}>recommended</button>
        )}
        {token && <button onClick={handleLogout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      {authors.loading ? (
        <div>Loading...</div>
      ) : (
        <Authors show={page === 'authors'} authors={authors.data.allAuthors} />
      )}

      <Books show={page === 'books'} />

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
      {me.loading ? (
        <div>Loading...</div>
      ) : (
        <Recommended
          show={page === 'recommended'}
          favGenre={me.data.me.favouriteGenre}
        />
      )}
    </div>
  );
};

export default App;
