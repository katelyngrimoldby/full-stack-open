import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

describe('Blog component', () => {
  const blog = {
    title: "Sample Title",
    author: "Sample Author",
    url: "samplesite.com",
    likes: 0,
    id: "fakeId",
    user: {
      id: "fakeUserId",
      name: "Sample User",
      username: "sampleuser"
    }
  }
  const user = {
    name: "Sample User",
    username: "sampleuser"
  }

  const mockUpdate = jest.fn()
  const mockDelete = jest.fn()

  beforeAll(() => {
    render(<Blog blog={blog} user={user} updateBlog={mockUpdate} deleteBlog={mockDelete} />)
  })

  test('Renders only title and author', () => {
    const titleAndAuthor = screen.getByText(`${blog.title} ${blog.author}`)
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText('Likes: ')
    const user = screen.queryByText(blog.user.name)

    expect(url && likes && user).not.toBeInTheDocument()
  })
})



