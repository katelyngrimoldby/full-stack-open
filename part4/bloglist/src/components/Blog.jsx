import { useState } from 'react';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
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
          <p>Likes: {blog.likes} <button>Like</button></p>
          <p>Added by: {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
