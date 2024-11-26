"use client";

import Input from "../input/input";
import LoginButton from "@/components/button/letsurf/loginButton";
import GoogleButton from "../button/google/google";
import styles from "./forum.module.css";
import { login } from "@/action/user";

import { showToast } from "../toast/toast";

export default function LoginForum() {
  const handleSubmit = async (formData: FormData) => {
    const res = await login(formData);

    if (res.status == "success") {
      showToast("success", res.message);
    } else {
      showToast("error", res.message);
    }
  };

  return (
    <div className={styles.myForm}>
      <form action={handleSubmit}>
        <div className={styles.inputContainer}>
          <Input type="email" placeholder="EMAIL" isRequired={true} />
          <Input type="password" placeholder="PASSWORD" isRequired={true} />
        </div>
        <LoginButton title="Let's Surf" />
      </form>
      <GoogleButton/>
    </div>
  );
}
