// reducers/chapterReducer.js

import {
  GET_CHAPTER_BY_ID_SUCCESS,
  GET_CHAPTER_BY_ID_ERROR,
  READ_CHAPTERS_SUCCESS,
  READ_CHAPTERS_ERROR,
} from "../actions/chaptersActions";

const initialState = {
  chapters: [],
  chapter: {},
  error: null,
  loading: false,
};

// Reducer para manejar los capítulos y los errores
const chapterReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_CHAPTERS_SUCCESS:
      return {
        ...state,
        chapters: action.payload,
        loading: false,
        error: null,
      };

    case READ_CHAPTERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_CHAPTER_BY_ID_SUCCESS:
      return {
        ...state,
        chapter: action.payload,
        loading: false,
        error: null,
      };

    case GET_CHAPTER_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default chapterReducer;