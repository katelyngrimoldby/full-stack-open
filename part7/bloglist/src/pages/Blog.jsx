import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(
      likeBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
        comments: blog.comments,
      })
    );
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id, user.token));
    }
  };

  const handleComment = () => {
    dispatch(
      addComment(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
        comments: blog.comments.concat(comment),
      })
    );

    setComment('');
  };

  if (blog) {
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}{' '}
          <button onClick={handleLike} className='likeButton'>
            Like
          </button>
        </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleDelete} className='deleteButton'>
            Remove
          </button>
        )}
        <h3>Comments</h3>
        <label htmlFor='comment'>Add Comment</label>
        <input
          type='text'
          id='comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button onClick={handleComment}>Add Comment</button>
        <ul>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <li key={`${comment}${index}`}>{comment}</li>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </ul>
      </div>
    );
  }
};

export default Blog;
