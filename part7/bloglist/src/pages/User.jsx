const User = ({ user }) => {
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        <ul>
          {user.blogs.length > 0 ? (
            user.blogs.map((blog) => (
              <li key={blog.id}>
                {blog.title} by {blog.author}
              </li>
            ))
          ) : (
            <p>No blogs added</p>
          )}
        </ul>
      </div>
    );
  }
};

export default User;
