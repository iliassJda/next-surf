"use client";

import Input from "../input/input";
import styles from "./forum.module.css";
import selectionstyles from "../selection/selection.module.css";
import RegisterButton from "../button/letsurf/registerButton";
import CountrySelection from "../selection/selection";

import { register } from "@/action/user";

import { doToast } from "../toast/toast";

export default function RegisterForum() {
  // Register with credentials
  const handleSubmit = async (formData: FormData) => {
    const res = await register(formData);
    // Shows a pop-up when an error is being made.
    doToast(res);
  };

  return (
    <form action={handleSubmit} className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input type="email" placeholder="EMAIL" isRequired={true} />
      </div>

      <div className={styles.inputContainer}>
        <Input type="username" placeholder="USERNAME" isRequired={true} />
      </div>

      <div className={styles.inputContainer}>
        <Input type="password" placeholder="PASSWORD" isRequired={true} />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.names}>
          <div className={styles.nameDiv}>
            <Input
              type="firstname"
              placeholder="FIRST NAME"
              isRequired={true}
            />
          </div>

          <div className={styles.nameDiv}>
            <Input type="lastname" placeholder="LAST NAME" isRequired={true} />
          </div>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <CountrySelection className={selectionstyles.rounded} />
      </div>

      <RegisterButton title="Let's Surf" />
    </form>
  );
}
