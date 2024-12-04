import RegisterForum from "@/components/forums/registerform";
import styles from "../login/login.module.css";

export default function Register() {
  return (
    <div className={styles.page}>
      <div className={styles.greyContainer}>
        <RegisterForum />
      </div>
    </div>
  );
}
