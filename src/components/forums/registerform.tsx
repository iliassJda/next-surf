"use client";

import Input from "../input/input";
import styles from "./forum.module.css";
import LoginButton from "../button/letsurf/letssurf";
import CountrySelection from "../selection/selection";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForum() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("@/app/api/register.ts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("User registered successfully!");
      router.push("/");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input type="email" placeholder="EMAIL" isRequired={true} />
      </div>

      <div className={styles.inputContainer}>
        <Input type="password" placeholder="PASSWORD" isRequired={true} />
        <Input
          type="password"
          placeholder="CONFIRM PASSWORD"
          isRequired={true}
        />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.names}>
          <div className={styles.nameDiv}>
            <Input type="text" placeholder="FIRST NAME" isRequired={true} />
          </div>

          <div className={styles.nameDiv}>
            <Input type="text" placeholder="LAST NAME" isRequired={true} />
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
