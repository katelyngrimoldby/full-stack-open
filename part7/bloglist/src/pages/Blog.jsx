import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(
      likeBlog(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    );
  };

  const handleDelete = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id, user.token));
    }
  };

  if (blog) {
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.info}>{blog.info}</a>
        <p>
          Likes: {blog.likes}{' '}
          <button onClick={handleUpdate} className='likeButton'>
            Like
          </button>
        </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleDelete} className='deleteButton'>
            Remove
          </button>
        )}
      </div>
    );
  }
};

export default Blog;
