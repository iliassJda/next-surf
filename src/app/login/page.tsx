import styles from "@/app/login/login.module.css";
import Forum from "@/components/forums/loginform";

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
