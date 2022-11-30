import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.id}>
          {user.name}: {user.blogs.length}{' '}
          {user.blogs.length === 1 ? 'Blog' : 'Blogs'}
        </p>
      ))}
    </div>
  );
};

export default Users;
