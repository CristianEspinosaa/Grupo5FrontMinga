import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE, 
  SET_USER,
  VALIDATE_TOKEN,
  LOGOUT
} from '../actions/registerActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
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
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
      case LOGOUT:
        return {
          ...state,
          user: null,
          token: null,
          loading: false,
          error: null,
        };
    case VALIDATE_TOKEN:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case LOGIN_SUCCESS:
          localStorage.setItem('token', action.payload.token);
  return {
    ...state,
    user: action.payload.user,
    token: action.payload.token,
    loading: false,
    error: null,
    isAuthenticated: true
  };
        case LOGIN_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
    default:
      return state;
  }
};

export default registerReducer;