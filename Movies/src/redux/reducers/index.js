import initialState from "./initialState";
import * as constants from "../constants";

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case constants.MOVIE_ADD:
      return {
        ...state,
        movieInfo: [...state.movieInfo, ...action.newMovie],
      };
    case constants.MOVIE_DELETE:
      return {
        ...state,
        movieInfo: [...action.newMovies],
      };
    case constants.MOVIE_UPLOAD:
      return {
        ...state,
        movieInfo: [...state.movieInfo, ...action.payload],
      };
    case constants.FETCH_TODO_SUCCESS:
      return {
        ...state,
        movieInfo: action.payload.moviesInfo,
      };
    case constants.MOVIE_SEARCH:
      return {
        ...state,
        movieInfo: [...action.payload.moviesInfo],
      };
    case constants.MOVIE_SORT_NAME:
      return {
        ...state,
        movieInfo: [...action.payload.movies]
      }

    default:
      return state;
  }
}
