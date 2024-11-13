"use client";

import Input from "../input/input";
import LoginButton from "@/components/button/letsurf/loginButton";
import styles from "./forum.module.css";
import inputStyles from "../input/input.module.css";
import { login } from "@/action/user";

export default function LoginForum() {

  return (
    <form action={login} className={styles.myForm}>
      <div className={styles.inputContainer}>
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          className={inputStyles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="PASSWORD"
          className={inputStyles.input}
        />
        {/* <Input type="email" placeholder="EMAIL" /> */}
        {/* <Input type="password" placeholder="PASSWORD" /> */}
      </div>
      <LoginButton title="Let's Surf" />
    </form>
  );
}
