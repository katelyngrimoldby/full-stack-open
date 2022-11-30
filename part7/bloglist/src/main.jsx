import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import App from './App';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    auth: authReducer,
    users: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
