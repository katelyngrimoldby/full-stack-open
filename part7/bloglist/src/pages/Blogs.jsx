import { useSelector } from 'react-redux';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <h2>Create New</h2>
      <BlogForm />
    </div>
  );
};

export default Blogs;
