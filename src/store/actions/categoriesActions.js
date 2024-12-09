import axios from 'axios';

export const READ_CATEGORIES_SUCCESS = "READ_CATEGORIES_SUCCESS";
export const READ_CATEGORIES_ERROR = "READ_CATEGORIES_ERROR";

const apiUrlCategories = "http://localhost:8080/api/categories/all";

// Acción asincrónica para obtener categorías
export const readCategories = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    // Realiza la solicitud HTTP usando axios
    const response = await axios.get(apiUrlCategories, headers);

    // Despacha la acción de éxito con las categorías obtenidas
    dispatch({
      type: READ_CATEGORIES_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    // En caso de error, despacha la acción de error con el mensaje
    console.error("Error fetching categories:", error);
    dispatch({
      type: READ_CATEGORIES_ERROR,
      payload: error.message,
    });
  }
};