import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducer';
import authReducer from './reducers/authReducers';
import authorReduccer from './reducers/authorReducers';

const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    author: authorReduccer
  },
});

export default store;