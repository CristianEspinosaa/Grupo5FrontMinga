import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VALIDATE_TOKEN
} from '../actions/authActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: false,
  status: 'idle'
};

const authReducer = (state = initialState, action) => {
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

export default authReducer;