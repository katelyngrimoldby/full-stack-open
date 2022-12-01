import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import queries from '../queries';

const Login = ({ setToken, setPage, show }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(queries.LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      window.localStorage.setItem('user-token', token);
    }
  }, [result.data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      variables: { username, password },
    });

    setUsername('');
    setPassword('');
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='username'
        />
        <input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='password'
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
};

export default Login;
