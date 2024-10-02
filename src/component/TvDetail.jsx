import { useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MovieDetail.module.css";

export default function TvDetail() {
  const { state: id } = useLocation();

  const initState = {
    // api를 호출했을 때 로딩 유무
    loading: false,
    // api를 호출했을 때 에러 확인
    error: null,
    // api를 호출했을 때 데이터 넣기
    movie: null,
    credits: null,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return { ...state, loading: true };
      case "GETMOVIE":
        return { ...state, loading: false, movie: action.movie, credits: action.credits };
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

      const response = await fetch(`https://api.themoviedb.org/3/tv/${id.id}?language=ko-KR`, {
        headers: {
          Authorization: key,
        },
      });
      const movie = await response.json();

      const c_response = await fetch(`https://api.themoviedb.org/3/tv/${id.id}/credits?language=ko-KR&api_key=${api_key}`, {
        headers: {
          Authorization: key,
        },
      });
      const credits = await c_response.json();

      dispatch({ type: "GETMOVIE", movie, credits });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.detail}>
      {/* 1. 로딩중일 때 */}
      {state.loading && <p>로딩중...</p>}
      {/* 2. 에러가 났을 때 */}
      {state.error && <p>에러발생</p>}
      {/* 3. 영화정보가 존재할 때 */}
      {!state.loading && state.movie && state.credits && (
        <>
          <div className={styles.dt_main}>
            <div className={styles.wrapper}>
              <div>
                <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${state.movie.poster_path}`} alt={state.movie.title} />
              </div>
              <div className={styles.dt_info}>
                <div className={styles.title}>
                  <b>{state.movie.name}</b> ({state.movie.first_air_date.slice(0, 4)})
                </div>
                <div>{state.movie.first_air_date}</div>
                {/* <div className={styles.summary}>장르</div>
                <div>{state.movie.genres.map((item) => item.name + " ")}</div> */}
                <div className={styles.summary}>개요</div>
                <div>{state.movie.overview}</div>
              </div>
            </div>
          </div>
          <div className={styles.dt_cast}>
            <div className={styles.credits}>주요 출연진</div>
            <div className={styles.card_container}>
              {state.credits.cast.map((cast) => (
                <div className={styles.card} key={cast.id}>
                  <img src={`https://media.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`} alt={cast.name} />
                  <div className={styles.card_content}>
                    <h2>{cast.name}</h2>
                    <p>{cast.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
