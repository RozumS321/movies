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
        moviesCount: action.payload.moviesCount,
      };
    case constants.MOVIE_SEARCH:
      return {
        ...state,
        movieInfo: action.payload.moviesInfo,
        moviesCount: action.payload.moviesCount,
      };
    case constants.MOVIE_SORT_NAME:
      return {
        ...state,
        movieInfo: [...action.payload.movies]
      }
    case constants.MOVIE_ADD_ERROR:
      return {
        ...state,
        movieAddError: action.error
      }
    case constants.NAME_SORT:
      return {
        ...state,
        filters: { ...state.filters, nameSort: action.nameSort }
      }
    case constants.SEARCH_TITLE:
      return {
        ...state,
        filters: { ...state.filters, searchTitle: action.searchTitle }
      }
    case constants.SEARCH_STAR:
      return {
        ...state,
        filters: { ...state.filters, searchStar: action.searchStar }
      }

    default:
      return state;
  }
}
