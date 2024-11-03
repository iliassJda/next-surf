import styles from "@/app/login/login.module.css";
import Forum from "@/components/login/forum/forum";

export default function Login() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.greyContainer}>
          <Forum />
        </div>
      </div>
    </>
  );
}
