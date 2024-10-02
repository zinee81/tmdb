import { useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import Trending from "./Trending";

export default function Main() {
  const searchRef = useRef();
  const navigate = useNavigate();

  function getSearch(keyword) {
    navigate(`/search`, { state: { keyword: keyword } });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <h1>환영합니다</h1>
        <h3>수백만 개의 영화, TV 프로그램 및 인물을 발견하세요. 지금 살펴보세요.</h3>
        <input type="text" ref={searchRef} placeholder="영화를 검색해보세요" />

        <button onClick={() => getSearch(searchRef.current.value)}>Search</button>
      </div>
      <div className={styles.list}>
        <Trending />
      </div>
    </div>
  );
}
