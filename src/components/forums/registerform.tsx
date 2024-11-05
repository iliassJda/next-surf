import Input from "../input/input";
import styles from "./forum.module.css";
import LoginButton from "../button/letsurf/letssurf";
import CountrySelection from "../selection/selection";

export default function RegisterForum() {
  return (
    <form action="" className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input type="email" placeholder="EMAIL" />
      </div>

      <div className={styles.inputContainer}>
        <Input type="password" placeholder="PASSWORD" />
        <Input type="password" placeholder="CONFIRM PASSWORD" />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.names}>
          <div className={styles.nameDiv}>
            <Input type="text" placeholder="FIRST NAME" />
          </div>

          <div className={styles.nameDiv}>
            <Input type="text" placeholder="LAST NAME" />
          </div>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <CountrySelection />
      </div>

      <LoginButton title="Let's Surf" />
    </form>
  );
}
