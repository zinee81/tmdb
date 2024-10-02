import { useNavigate } from "react-router-dom";
import styles from "./Movie.module.css";

export default function Movie({ movie }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.card_info} onClick={() => navigate(`/movie_detail`, { state: { id: movie.id } })}>
        <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`} alt={movie.title} />

        <div className={styles.title}>{movie.title}</div>
        <div className={styles.date}>{movie.release_date}</div>
      </div>
    </div>
  );
}
