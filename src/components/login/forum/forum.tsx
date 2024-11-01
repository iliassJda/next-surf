import Input from "../input/input";
import LoginButton from "@/components/button/letsurf/letssurf";
import styles from "@/components/login/forum/forum.module.css";

export default function Forum() {
  return (
    <form action="" className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input type="email" placeholder="EMAIL" />
        <Input type="password" placeholder="PASSWORD" />
      </div>
      <LoginButton title="Let's Surf" />
    </form>
  );
}
