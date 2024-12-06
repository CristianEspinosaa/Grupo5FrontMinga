import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducer';
import authReducer from './reducers/authReducer';
import modalActions from './actions/modalActions';

const store = configureStore({
  reducer: {    
    register: registerReducer,
    auth: authReducer,
    modal: modalActions,
  },
});

export default store;