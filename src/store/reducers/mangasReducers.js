import { READ_MANGAS_SUCCESS, READ_MANGAS_ERROR } from '../actions/mangasActions';

const initialState = {
  mangas: [],
  error: null,
};

const mangasReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_MANGAS_SUCCESS:
      return { ...state, mangas: action.payload, error: null };
    case READ_MANGAS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default mangasReducer;