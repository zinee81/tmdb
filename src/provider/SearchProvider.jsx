import { createContext, useReducer } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const initState = {
    loading: false,
    error: null,
    movie: null,
  };
  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "GETMOVIE":
        return { ...state, loading: false, movie: action.movie };
      case "ERROR":
        return { ...state, loading: false, error: action.error };
      default:
        throw new Error(`액션 오류 ${action.type}`);
    }
  }

  const getMovie = async (keyword) => {
    dispatch({ type: "LOADING" });
    try {
      const key = import.meta.env.VITE_TMDB_TOKEN;
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1&query=${keyword}`, {
        headers: {
          Authorization: key,
        },
      });
      const movie = await response.json();
      dispatch({ type: "GETMOVIE", movie });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  return <SearchContext.Provider value={{ state, getMovie }}>{children}</SearchContext.Provider>;
}
