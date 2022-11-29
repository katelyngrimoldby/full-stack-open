import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { triggerMessage } from '../reducers/messageReducer';
import { createBlog } from '../reducers/blogReducer';
import Toggle from './Toggle';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const user = useSelector((state) => state.auth);

  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    dispatch(createBlog(blogObject, user.token));

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <Toggle ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor='author'>Author: </label>
        <input
          type='text'
          id='author'
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <label htmlFor='url'>URL: </label>
        <input
          type='text'
          id='url'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type='submit' id='add'>
          Add
        </button>
      </form>
    </Toggle>
  );
};

export default BlogForm;
