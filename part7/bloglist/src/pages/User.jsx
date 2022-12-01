import { Link as RouterLink } from 'react-router-dom';
import { Container, Spacer, Link } from '@nextui-org/react';

const User = ({ user }) => {
  if (user) {
    return (
      <Container>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.length > 0 ? (
            user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link as={RouterLink} to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </li>
            ))
          ) : (
            <p>No blogs added</p>
          )}
        </ul>
      </Container>
    );
  }
};

export default User;
