import { createSlice } from "@reduxjs/toolkit";
import { triggerMessage } from './messageReducer';
import blogService from '../services/blogs';

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((bloga, blogb) => blogb.likes - bloga.likes)
    },

    addBlog(state, action) {
      state.push(action.payload)
    },

    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },

    updateBlogs(state, action) {
      const newBlogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload.updatedBlog : blog
      );

      return newBlogs.sort((bloga, blogb) => blogb.likes - bloga.likes)
    }
  }
})

export const {setBlogs, addBlog, updateBlogs, deleteBlog} = blogSlice.actions

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (payload, token) => {
  return async dispatch => {
    try {
      const blog = await blogService.addNew(payload, token)
      dispatch(addBlog(blog))

      dispatch(
        triggerMessage(
          {
            type: 'success',
            message: `Added ${payload.title} by ${payload.author}`,
          },
          5
        )
      );
    } catch (error) {
      dispatch(triggerMessage({ type: 'error', message: error.response.data.error }, 5))
    }
  }
}

export const likeBlog = (id, payload) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(id, payload)
      dispatch(updateBlogs({id, updatedBlog}))

      dispatch(
        triggerMessage(
          {
            type: 'success',
            message: `Liked ${payload.title} by ${payload.author}`,
          },
          5
        )
      );
    } catch(error) {
      dispatch(triggerMessage({ type: 'error', message: error.response.data.error }, 5))
    }
  }
}

export const removeBlog = (id, token) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const blog = state.blogs.find((blog) => blog.id === id);
      await blogService.deleteBlog(id, token);

      dispatch(deleteBlog(id))

      dispatch(
        triggerMessage(
          {
            type: 'success',
            message: `Removed ${blog.title} by ${blog.author}`,
          },
          5
        )
      );
    } catch(error) {
      dispatch(triggerMessage({ type: 'error', message: error.response.data.error }, 5))
    }
  }
}

export const addComment = (id, payload) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(id, payload)
      dispatch(updateBlogs({id, updatedBlog}))

      dispatch(
        triggerMessage(
          {
            type: 'success',
            message: `Commented on ${payload.title} by ${payload.author}`,
          },
          5
        )
      );
    } catch(error) {
      dispatch(triggerMessage({ type: 'error', message: error.response.data.error }, 5))
    }
  }
}

export default blogSlice.reducer