import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_USER = 'SET_USER';

const handleApiRequest = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/users/register', formData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al registrar el usuario';
    return { error: errorMessage };  // Devolvemos el error
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const result = await handleApiRequest(formData);

  if (result && result.token) {
    const { token, user } = result;
    setAuthToken(token);
    dispatch(setUser({ user, token }));
    return true;
  }

  if (result && result.error) {  // Si hay un error, lo pasamos al reducer
    dispatch({
      type: REGISTER_FAILURE,
      payload: result.error,  // Usamos el error que retornamos de la API
    });
  }

  return false;
};

export const setUser = ({ user, token }) => {
  setAuthToken(token);
  return { type: SET_USER, payload: { user, token } };
};

const setAuthToken = (token) => localStorage.setItem('token', token);