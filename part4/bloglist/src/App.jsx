import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userJSON = window.localStorage.getItem('User');

    if(userJSON) {
      const userData = JSON.parse(userJSON);
      setUser(userData);
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = await login({ username, password });
      setUser(userData);

      window.localStorage.setItem('User', JSON.stringify(userData));
    } catch(error) {
      setMessage('Invalid username or password');
      setTimeout(() => setMessage(''), 5000);
    }

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('User');
    setUser(undefined);
  };

  const handleCreation = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.addNew({ title, author, url }, user.token);

      setBlogs(blogs.concat(newBlog));

      setMessage(`Added ${title} by ${author}`);
      setTimeout(() => setMessage(''), 5000);
    } catch(error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 5000);
    }

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <>
      {message && (<p>{message}</p>)}
      {!user ? (
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
            <label htmlFor="password">Password</label>
            <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button type='submit'>Log In</button>
          </form>
        </div>) : (
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Log Out</button>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h2>Create New</h2>
          <form onSubmit={handleCreation}>
            <label htmlFor="title">Title: </label>
            <input type="text" id='title' value={title} onChange={(event) => setTitle(event.target.value)} />
            <label htmlFor="author">Author: </label>
            <input type="text" id='author'value={author} onChange={(event) => setAuthor(event.target.value)} />
            <label htmlFor="url">URL: </label>
            <input type="text" id='url' value={url} onChange={(event) => setUrl(event.target.value)} />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
    </>
  );
};

export default App;
