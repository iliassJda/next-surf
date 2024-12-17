import styles from "./surflogo.module.css";
import { kaushan } from "@/components/fonts";

export default function SurfLogo() {
  return (
    <div id={styles.logo_div}>
      <a className={`${styles.icon} ${kaushan}`} href="/">
        Let's Surf
      </a>
    </div>
  );
}
