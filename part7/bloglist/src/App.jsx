import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';
import { getBlogs } from './reducers/blogReducer';
import { getUsers } from './reducers/userReducer';
import { setAuth, getAuth, clearAuth } from './reducers/authReducer';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import User from './pages/User';
import Blog from './pages/Blog';

const App = () => {
  const user = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const message = useSelector((state) => state.message);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const userMatch = useMatch('/users/:id');
  const foundUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const foundBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const dispatch = useDispatch();

  useEffect(() => {
    const userJSON = window.localStorage.getItem('User');

    if (userJSON) {
      const userData = JSON.parse(userJSON);
      dispatch(setAuth(userData));
    }

    dispatch(getBlogs());
    dispatch(getUsers());
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
        <>
          <div>
            <p>Logged in as {user.name}</p>
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <Routes>
            <Route path='/' element={<Blogs />} />
            <Route path='users' element={<Users />} />
            <Route path='users/:id' element={<User user={foundUser} />} />
            <Route path='blogs' element={<Blogs />} />
            <Route path='blogs/:id' element={<Blog blog={foundBlog} />} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
