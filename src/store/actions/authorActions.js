import axios from "axios";

export const createAuthorRequest = () => ({ type: 'CREATE_AUTHOR_REQUEST' });
export const createAuthorSuccess = (author) => ({ type: 'CREATE_AUTHOR_SUCCESS', payload: author });
export const createAuthorFailure = (error) => ({ type: 'CREATE_AUTHOR_FAILURE', payload: error });
export const logoutAuthor = () => ({ type: 'LOGOUT_AUTHOR' });

export const createAuthor = (authorData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_AUTHOR_REQUEST });
    
    // Obtener el token del estado de Redux
    const token = getState().auth.token;

    // Configurar headers con el token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asegúrate que el formato coincida con lo que espera tu backend
      }
    };

    const response = await axios.post('/api/authors/create', authorData, config);
    console.log('Response:', response.data); // Para debugging
    
    dispatch({
      type: CREATE_AUTHOR_SUCCESS,
      payload: response.data
    });
    
    return response.data;
  } catch (error) {
    console.error('Error:', error.response?.data);
    dispatch({
      type: CREATE_AUTHOR_FAILURE,
      payload: error.response?.data?.message || 'Error creating author'
    });
    throw error;
  }
};