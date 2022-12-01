import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spacer } from '@nextui-org/react';
import BlogForm from '../components/BlogForm';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
              <Spacer />
            </div>
          ))}
        </Col>
        <Col>
          <h2>Create New</h2>
          <BlogForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Blogs;
