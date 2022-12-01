import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { Button, Input, Spacer } from '@nextui-org/react';
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
        <Spacer />
        <Input
          type='text'
          id='title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          labelPlaceholder='Title'
        />
        <Spacer y={2} />
        <Input
          type='text'
          id='author'
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          labelPlaceholder='Author'
        />
        <Spacer y={2} />
        <Input
          type='text'
          id='url'
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          labelPlaceholder='URL'
        />
        <Spacer />
        <Button auto='true' type='submit' id='add'>
          Add
        </Button>
      </form>
    </Toggle>
  );
};

export default BlogForm;
