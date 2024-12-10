<<<<<<< HEAD
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  VALIDATE_TOKEN
} from '../actions/registerActions';
=======
// registerReducer.js

import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  SET_USER 
} from '../actions/registerActions'; // Asegúrate de que la ruta sea correcta
>>>>>>> goyes

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: false,
  status: 'idle'
};

<<<<<<< HEAD
const authReducer = (state = initialState, action) => {
=======
const registerReducer = (state = initialState, action) => {
>>>>>>> goyes
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
        isAuthenticated: true,
        status: 'succeeded'
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true,
        status: 'succeeded'
      };

    case VALIDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
        status: action.payload ? 'succeeded' : 'failed',
        isAuthenticated: !!action.payload
      };

    case LOGOUT:
      return {
        ...initialState,
        token: null
      };

    default:
      return state;
  }
};

export default registerReducer;