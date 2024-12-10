import axios from 'axios';

export const READ_CHAPTERS_SUCCESS = "READ_CHAPTERS_SUCCESS";
export const READ_CHAPTERS_ERROR = "READ_CHAPTERS_ERROR";
export const GET_CHAPTER_BY_ID_SUCCESS = "GET_CHAPTER_BY_ID_SUCCESS";
export const GET_CHAPTER_BY_ID_ERROR = "GET_CHAPTER_BY_ID_ERROR";

const apiUrlChapters = "http://localhost:8080/api/chapters/byManga/";

export const getChapterById = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
  
    try {
      const response = await axios.get(`http://localhost:8080/api/chapters/id/${id}`, headers);
  
      dispatch({
        type: "GET_CHAPTER_BY_ID_SUCCESS",
        payload: response.data.response || {},
      });
    } catch (error) {
      console.error("Error fetching chapter by ID:", error);
      dispatch({
        type: "GET_CHAPTER_BY_ID_ERROR",
        payload: error.message,
      });
    }
  };


export const readChaptersByMangaId = (mangaId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await axios.get(`${apiUrlChapters}${mangaId}`, headers);

    dispatch({
      type: READ_CHAPTERS_SUCCESS,
      payload: response.data.response || [],
    });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    dispatch({
      type: READ_CHAPTERS_ERROR,
      payload: error.message,
    });
  }
};