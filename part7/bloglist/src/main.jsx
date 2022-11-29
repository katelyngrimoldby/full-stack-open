import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import App from './App';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    auth: authReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
