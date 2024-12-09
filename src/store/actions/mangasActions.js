import axios from 'axios';

export const READ_MANGAS_SUCCESS = "READ_MANGAS_SUCCESS";
export const READ_MANGAS_ERROR = "READ_MANGAS_ERROR";

const apiUrlMangas = "http://localhost:8080/api/mangas/all";

// Acción asincrónica para obtener mangas
export const readMangas = (searchTerm, pageNumber, selectedCategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const categoryParam =
      selectedCategory === 'all'
        ? '' // Enviar vacío si es "all"
        : selectedCategory;

    const response = await axios.get(
      `${apiUrlMangas}?page=${pageNumber}&search=${searchTerm}&category_id=${categoryParam}`,
      headers
    );

    dispatch({
      type: READ_MANGAS_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching mangas:", error);
    dispatch({
      type: READ_MANGAS_ERROR,
      payload: error.message,
    });
  }
};

// Acción asincrónica para obtener mangas por autor
export const readMangasByAuthor = (authorId, pageNumber, searchTerm, selectedCategory) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const categoryParam =
      selectedCategory === 'all'
        ? '' // Enviar vacío si es "all"
        : selectedCategory;

    const response = await axios.get(
      `${apiUrlMangas}?page=${pageNumber}&search=${searchTerm}&category_id=${categoryParam}&author_id=${authorId}`,
      headers
    );

    dispatch({
      type: READ_MANGAS_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching mangas by author:", error);
    dispatch({
      type: READ_MANGAS_ERROR,
      payload: error.message,
    });
  }
};