import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logoimg from "../assets/tmdb_logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <img src={logoimg} alt="로고" onClick={() => navigate(`/`)} />
          <ul>
            <li onClick={() => navigate(`/movie_list`)}>영화</li>
            <li onClick={() => navigate(`/tv_list`)}>TV 프로그램</li>
            <li>인물</li>
            <li>More</li>
          </ul>
        </div>
        <div className={styles.gnb}></div>
      </div>
    </header>
  );
}
