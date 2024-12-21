"use client";

import Input from "../input/input";
import LoginButton from "@/components/button/letsurf/loginButton";
import GoogleButton from "../button/google/google";
import styles from "./forum.module.css";
import { loginManual, loginGoogle } from "@/action/user";

import { doToast } from "../toast/toast";

export default function LoginForum() {
  // Login with credentials
  const handleManualSubmit = async (formData: FormData) => {
    const response = await loginManual(formData);

    // Shows a pop-up when an error is being made.
    doToast(response);
  };

  // Login with Google
  const handleGoogleSubmit = async () => {
    await loginGoogle();
    // Here is no DoToast since Google has it's own error handling.
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
