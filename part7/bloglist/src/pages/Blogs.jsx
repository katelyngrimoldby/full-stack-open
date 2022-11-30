import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          {blog.title} by {blog.author}
        </Link>
      ))}
      <h2>Create New</h2>
      <BlogForm />
    </div>
  );
};

export default Blogs;
