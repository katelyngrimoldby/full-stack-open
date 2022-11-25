import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = await login(username, password);
    setUser(userData);

    setUsername('');
    setPassword('');
  };

  return (
    <>
      {!user ? (
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
            <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button type='submit'>Log In</button>
          </form>
        </div>) : (
        <div>
          <p>Logged in as {user.name}</p>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </>
  );
};

export default App;
