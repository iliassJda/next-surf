import { kaushan } from "@/components/fonts";
import styles from "./letssurf.module.css";

export default function Button(probs: any) {
  return (
    <button className={`${styles.loginButton} ${kaushan}`} type="submit">
      {probs.title}
    </button>
  );
}
