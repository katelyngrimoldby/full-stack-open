import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleUpdate = () => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    });
  };

  return(
    <div>
      <p>
        {blog.title} {blog.author}{' '}
        <button onClick={handleToggle}>{visible ? 'hide' : 'show'}</button>
      </p>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={handleUpdate}>Like</button></p>
          <p>Added by: {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
