import * as constants from "../constants/";

export function movieAdd(movieInfo) {
  return async (dispatch) => {
    const payload = await (
      await fetch("http://localhost:5000/api/movie/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ movieInfo: movieInfo }),
      })
    ).json();

    if (payload.error) {
      return dispatch({
        type: constants.MOVIE_ADD_ERROR,
        error: payload.error
      })

    }

    dispatch({
      type: constants.MOVIE_ADD,
      newMovie: payload,
    });
  };
}
export function movieDelete(_id) {
  return async (dispatch, getState) => {
    const state = getState();
    const idx = state.movieInfo.findIndex((el) => el._id === _id);
    const newMovies = [
      ...state.movieInfo.slice(0, idx),
      ...state.movieInfo.slice(idx + 1),
    ];
    await fetch(`http://localhost:5000/api/movie/${_id}`, {
      method: "DELETE",
    });
    dispatch({
      type: constants.MOVIE_DELETE,
      newMovies,
    });
  }
};

export function movieUpload(movieFile) {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("txtFile", movieFile);

    const payload = await (
      await fetch("http://localhost:5000/api/movie/upload/", {
        method: "POST",
        body: formData,
      })
    ).json();
    if (payload.error) {
      return dispatch({
        type: constants.MOVIE_ADD_ERROR,
        error: payload.error
      })

    }
    dispatch({
      type: constants.MOVIE_UPLOAD,
      payload,
    });
  };
}
export function movieSearch(stars, title, sort = "ASC", limit, skip) {
  return async (dispatch) => {
    const payload = await (
      await fetch(
        `http://localhost:5000/api/movie/?stars=${stars}&title=${title}&sort=${sort}&limit=${limit}&skip=${skip}`,
        {
          method: "GET",
        }
      )
    ).json();
    dispatch({
      type: constants.MOVIE_SEARCH,
      payload: {
        moviesInfo: payload.movies,
        moviesCount: payload.moviesCount
      },
    });
  };
}

// SEARCH FIX!!!
