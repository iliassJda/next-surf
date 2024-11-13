"use client";

import Input from "../input/input";
import styles from "./forum.module.css";
import RegisterButton from "../button/letsurf/registerButton";
import inputStyles from "../input/input.module.css";
import CountrySelection from "../selection/selection";

import { register } from "@/action/user";

import { showToast } from "../toast/toast";

// import {
//   Id,
//   toast,
//   ToastContainer,
//   ToastContent,
//   ToastOptions,
// } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

// type ToastType = "success" | "error" | "info" | "warning" | "default";

// const showToast = (type: ToastType, content: ToastContent) => {
//   switch (type) {
//     case "success":
//       return toast.success(content, {
//         position: "bottom-right",
//       });
//     case "error":
//       return toast.error(content, {
//         position: "bottom-right",
//       });
//   }
// };

export default function RegisterForum() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [nationality, setNationality] = useState("");

  const router = useRouter();

  // const [tst, setToast] = useState("");

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
    // console.log("test response");
    // console.log(response);
    const data = await response.json();

    if (response.ok) {
      // setToast(toast.success());
      console.log(data.message);
      showToast("success", `${data.message}`);

      // console.log("respone is OK");
      router.push("/login");
    } else {
      console.log(data.error);
      showToast("error", `${data.error}`);
    }
  };

  return (
    // <form onSubmit={handleRegister} className={styles.myForm}>
    <form action={register} className={styles.myForm}>
      <div className={styles.inputContainer}>
        <Input
          type="email"
          placeholder="EMAIL"
          isRequired={true}
          handler={setEmail}
        />
      </div>

      <div className={styles.inputContainer}>
        <Input
          type="password"
          placeholder="PASSWORD"
          isRequired={true}
          handler={setPassword}
        />
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
          </div>

          <div className={styles.nameDiv}>
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

      <RegisterButton title="Let's Surf" />
    </form>
  );
}
