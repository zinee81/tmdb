import { useEffect, useReducer } from "react";
import styles from "./TvList.module.css";
import Tv from "./Tv";

export default function MovieList() {
  const initState = {
    // api를 호출했을 때 로딩 유무
    loading: false,
    // api를 호출했을 때 에러 확인
    error: null,
    // api를 호출했을 때 데이터 넣기
    tv: null,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "GETTV":
        return { ...state, loading: false, tv: action.tv };
      case "ERROR":
        return { ...state, loading: false, error: action.error };
      default:
        throw new Error(`액션 오류 ${action.type}`);
    }
  }

  const getTv = async () => {
    dispatch({ type: "LOADING" });
    try {
      const key = import.meta.env.VITE_TMDB_TOKEN;
      const api_key = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=ko-KR&page=1&sort_by=popularity.desc&api_key=${api_key}`, {
        headers: {
          Authorization: key,
        },
      });
      const tv = (await response.json()).results;

      dispatch({ type: "GETTV", tv });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  useEffect(() => {
    getTv();
  }, []);

  return (
    <div className={styles.tvlist}>
      <h2>TV 프로그램</h2>
      {/* 1. 로딩중일 때 */}
      {state.loading && <p>로딩중...</p>}
      {/* 2. 에러가 났을 때 */}
      {state.error && <p>에러발생</p>}
      {/* 3. tv리스트가 존재할 때 */}
      {!state.loading && state.tv && (
        <div className={styles.tv_list}>
          {state.tv.map((tv) => (
            <Tv key={tv.id} movie={tv} />
          ))}
        </div>
      )}
    </div>
  );
}
