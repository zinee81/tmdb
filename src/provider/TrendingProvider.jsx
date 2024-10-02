import { createContext, useReducer } from "react";

export const TrendingContext = createContext();

export function TrendingProvider({ children }) {
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

  const getMovie = async () => {
    dispatch({ type: "LOADING" });
    try {
      const key = import.meta.env.VITE_TMDB_TOKEN;
      const api_key = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=ko-KR&api_key=${api_key}`, {
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

  return <TrendingContext.Provider value={{ state, getMovie }}>{children}</TrendingContext.Provider>;
}
