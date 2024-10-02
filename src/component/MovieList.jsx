import { useEffect, useReducer } from "react";
import styles from "./MovieList.module.css";
import Movie from "./Movie";

export default function MovieList() {
  const initState = {
    // api를 호출했을 때 로딩 유무
    loading: false,
    // api를 호출했을 때 에러 확인
    error: null,
    // api를 호출했을 때 데이터 넣기
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
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=ko-KR&page=1&api_key=${api_key}`, {
        headers: {
          Authorization: key,
        },
      });
      const movie = (await response.json()).results;

      dispatch({ type: "GETMOVIE", movie });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.movielist}>
      <h2>영화</h2>
      {/* 1. 로딩중일 때 */}
      {state.loading && <p>로딩중...</p>}
      {/* 2. 에러가 났을 때 */}
      {state.error && <p>에러발생</p>}
      {/* 3. 영화리스트가 존재할 때 */}
      {!state.loading && state.movie && (
        <div className={styles.movie_list}>
          {state.movie.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
