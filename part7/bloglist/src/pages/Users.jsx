import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Spacer, Link } from '@nextui-org/react';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <Container>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link as={RouterLink} to={`/users/${user.id}`}>
            {user.name}
          </Link>
          <span>
            Has {user.blogs.length} {user.blogs.length === 1 ? 'Blog' : 'Blogs'}
          </span>
          <Spacer />
        </div>
      ))}
    </Container>
  );
};

export default Users;
