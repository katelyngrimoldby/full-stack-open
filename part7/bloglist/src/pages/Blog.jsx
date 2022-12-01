import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Spacer,
  Link,
  Input,
  Container,
  Col,
  Row,
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer';
import { triggerMessage } from '../reducers/messageReducer';

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    }
  };

  const handleComment = () => {
    if (comment) {
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
    } else {
      dispatch(
        triggerMessage(
          {
            type: 'error',
            message: 'Cannot submit empty comment',
          },
          5
        )
      );
    }

    setComment('');
  };

  if (blog) {
    return (
      <Container>
        <Row>
          <Col>
            <h2>
              {blog.title} by {blog.author}
            </h2>
            <Link isExternal='true' href={blog.url}>
              {blog.url}
            </Link>
            <Spacer y={0.5} />
            <p>
              Likes: {blog.likes}{' '}
              <Button onClick={handleLike} className='likeButton' size='sm'>
                Like
              </Button>
            </p>
            <Spacer y={0.5} />
            <p>Added by: {blog.user.name}</p>
            {user.username === blog.user.username && (
              <Button flat onClick={handleDelete} className='deleteButton'>
                Remove
              </Button>
            )}
          </Col>
          <Spacer y={2} />
          <Col>
            <h3>Comments</h3>
            <Spacer y={1.5} />
            <Input
              type='text'
              id='comment'
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              labelPlaceholder='Comment'
            />
            <Spacer y={0.5} />
            <Button onClick={handleComment}>Add Comment</Button>
            <ul>
              {blog.comments.length > 0 ? (
                blog.comments.map((comment, index) => (
                  <li key={`${comment}${index}`}>{comment}</li>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Blog;
