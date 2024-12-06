import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_USER,
} from '../actions/registerActions';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: false,
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,  // Limpiamos el error cuando comienza el proceso de registro
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,  // Si es exitoso, no hay error
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,  // Aquí estamos guardando el error que viene de la acción
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,  // Limpiamos el error cuando el usuario se ha seteado correctamente
      };
    default:
      return state;
  }
};

export default authReducer;