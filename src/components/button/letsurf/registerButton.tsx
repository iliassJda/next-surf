import { kaushan } from "@/components/fonts";
import styles from "./letssurf.module.css";

export default function Button({
  title,
}: // notification,
{
  title: string;
  // notification: any;
}) {
  return (
    <button
      className={`${styles.loginButton} ${kaushan}`}
      type="submit"
      // onClick={notification}
    >
      {title}
    </button>
  );
}
