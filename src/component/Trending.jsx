import { useEffect, useReducer } from "react";
import Movie from "./Movie";
import styles from "./Trending.module.css";

export default function Trending() {
  const initState = {
    // api를 호출했을 때 로딩 유무
    loading: false,
    // api를 호출했을 때 에러 확인
    error: null,
    // api를 호출했을 때 데이터 넣기
    trending: null,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "GETTRENDING":
        return { ...state, loading: false, trending: action.trending };
      case "ERROR":
        return { ...state, loading: false, error: action.error };
      default:
        throw new Error(`액션 오류 ${action.type}`);
    }
  }

  const getTrending = async () => {
    dispatch({ type: "LOADING" });
    try {
      const key = import.meta.env.VITE_TMDB_TOKEN;
      const api_key = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=ko-KR&api_key=${api_key}`, {
        headers: {
          Authorization: key,
        },
      });
      const trending = (await response.json()).results;

      dispatch({ type: "GETTRENDING", trending });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  return (
    <div className={styles.trending}>
      <h2>트렌드</h2>
      {/* 1. 로딩중일 때 */}
      {state.loading && <p>로딩중...</p>}
      {/* 2. 에러가 났을 때 */}
      {state.error && <p>에러발생</p>}
      {/* 3. 트렌딩이 존재할 때 */}
      {!state.loading && state.trending && (
        <div className={styles.movie_list}>
          {state.trending.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
