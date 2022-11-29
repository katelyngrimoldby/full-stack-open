import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { triggerMessage } from './reducers/messageReducer';
import { getBlogs, likeBlog, removeBlog } from './reducers/blogReducer';
import { setAuth, getAuth, clearAuth } from './reducers/authReducer';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    const userJSON = window.localStorage.getItem('User');

    if (userJSON) {
      const userData = JSON.parse(userJSON);
      dispatch(setAuth(userData));
    }

    dispatch(getBlogs());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(getAuth({ username, password }));

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    dispatch(clearAuth());
  };

  const handleUpdate = async (id, blogObject) => {
    dispatch(likeBlog(id, blogObject));
  };

  const handleDelete = async (id) => {
    dispatch(removeBlog(id, user.token));
  };

  return (
    <>
      {message && <p>{message.message}</p>}
      {!user ? (
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type='submit' id='login'>
              Log In
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Log Out</button>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateBlog={handleUpdate}
              deleteBlog={handleDelete}
            />
          ))}
          <h2>Create New</h2>
          <BlogForm />
        </div>
      )}
    </>
  );
};

export default App;
