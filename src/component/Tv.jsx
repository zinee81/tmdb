import { useNavigate } from "react-router-dom";
import styles from "./Tv.module.css";

export default function Tv({ movie }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.card_info} onClick={() => navigate(`/tv_detail`, { state: { id: movie.id } })}>
        <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} alt={movie.title} />

        <div className={styles.title}>{movie.name}</div>
        <div className={styles.date}>{movie.first_air_date}</div>
      </div>
    </div>
  );
}
