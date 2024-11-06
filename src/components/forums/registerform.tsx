"use client";

import Input from "../input/input";
import styles from "./forum.module.css";
import LoginButton from "../button/letsurf/letssurf";
import inputStyles from "../input/input.module.css";
import CountrySelection from "../selection/selection";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForum() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [nationality, setNationality] = useState("");

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
        nationality,
      }),
    });

    // const data = await response.json();
    console.log(response.ok);
    if (response.ok) {
      console.log("respone is OK");
      // router.push("/");
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input
          type="email"
          placeholder="EMAIL"
          isRequired={true}
          handler={setEmail}
        />
        {/* <input
          type="email"
          placeholder="EMAIL"
          required
          onChange={(event) => setEmail(event.target.value)}
          className={inputStyles.input}
        /> */}
      </div>

      <div className={styles.inputContainer}>
        {/* <input
          type="password"
          placeholder="PASSWORD"
          required
          onChange={(event) => setPassword(event.target.value)}
          className={inputStyles.input}
        /> */}
        <Input
          type="password"
          placeholder="PASSWORD"
          isRequired={true}
          handler={setPassword}
        />
        {/* <Input
          type="password"
          placeholder="CONFIRM PASSWORD"
          isRequired={true}
        /> */}
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.names}>
          <div className={styles.nameDiv}>
            <Input
              type="text"
              placeholder="FIRST NAME"
              isRequired={true}
              handler={setFirstName}
            />
            {/* <input
              type="text"
              placeholder="FIRST NAME"
              required
              onChange={(event) => setFirstName(event.target.value)}
              className={inputStyles.input}
            /> */}
          </div>

          <div className={styles.nameDiv}>
            {/* <input
              type="text"
              placeholder="LAST NAME"
              required
              onChange={(event) => setLastName(event.target.value)}
              className={inputStyles.input}
            /> */}
            <Input
              type="text"
              placeholder="LAST NAME"
              isRequired={true}
              handler={setLastName}
            />
          </div>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <CountrySelection handler={setNationality} />
      </div>

      <LoginButton title="Let's Surf" />
    </form>
  );
}
