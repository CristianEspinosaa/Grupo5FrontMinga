import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';

const handleApiRequest = async (formData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signin', formData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
    if (Array.isArray(errorMessage)) {
      return errorMessage.join(', ');
    } else {
      return errorMessage;
    }
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const result = await handleApiRequest(formData);

  if (result.token) {
    dispatch({ type: LOGIN_SUCCESS, payload: result });
    setAuthToken(result.token);
  } else {
    dispatch({ type: LOGIN_FAILURE, payload: result });
  }
};

export const setUser = (userData) => {
  if (userData?.token) {
    setAuthToken(userData.token);
  }
  return { type: SET_USER, payload: userData };
};

export const validateToken = (token) => ({
  type: 'VALIDATE_TOKEN',
  payload: token
});

export const logout = () => (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(
        'http://localhost:8080/api/auth/signout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    removeAuthToken();
    removeUserData();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Error durante el logout:', error);
  }
};

const setAuthToken = (token) => localStorage.setItem('token', token);
const removeAuthToken = () => localStorage.removeItem('token');
<<<<<<< HEAD

=======
const removeUserData = () => localStorage.removeItem('userId');
>>>>>>> main
