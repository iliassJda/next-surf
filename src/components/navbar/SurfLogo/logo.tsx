import styles from "./surflogo.module.css";

export default function SurfLogo(){
    return (
        <div id={styles.logo_div}>
          <a className={styles.icon} href="./">
            Let's Surf
          </a>
        </div>
    )
}