import styles from "./Footer.module.css";
import footerlogoimg from "../assets/tmdb_footer_logo.png";

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <div className={styles.menu}>
          <img src={footerlogoimg} alt="" />
        </div>
        <div></div>
      </div>
    </footer>
  );
}
