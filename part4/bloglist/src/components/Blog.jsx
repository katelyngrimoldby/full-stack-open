import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

  const handleDelete = () => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
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
          {user.username === blog.user.username && (<button onClick={handleDelete}>Remove</button>)}
        </div>
      )}
    </div>
  );
};

export default Blog;
