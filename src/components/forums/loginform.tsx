"use client";

import Input from "../input/input";
import LoginButton from "@/components/button/letsurf/loginButton";
import GoogleButton from "../button/google/google";
import styles from "./forum.module.css";
import { loginManual, loginGoogle } from "@/action/user";
import { signIn } from "@/lib/auth";
import router from "next/navigation";

import { doToast } from "../toast/toast";

export default function LoginForum() {
  const handleManualSubmit = async (formData: FormData) => {
    const response = await loginManual(formData);

    doToast(response);
  };

  const handleGoogleSubmit = async () => {
    const response = await loginGoogle();
  };

  return (
    <div className={styles.myForm}>
      <form action={handleManualSubmit}>
        <div className={styles.inputContainer}>
          <Input type="email" placeholder="EMAIL" isRequired={true} />
          <Input type="password" placeholder="PASSWORD" isRequired={true} />
        </div>
        <LoginButton title="Let's Surf" />
      </form>

      <form action={handleGoogleSubmit}>
        <GoogleButton />
      </form>
    </div>
  );
}
