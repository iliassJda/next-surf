"use client";

import Input from "./input";
import LoginButton from "./button";
import React, {useState} from 'react';
import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";
import { showToast } from "../toast/toast";
import { updateProfile } from "@/action/user";
import {useSession} from "next-auth/react";

export default function Form(probs: any) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const { data: session, status } = useSession();
  const user = session?.user;
  const userName = user?.username as string;
  const userMail = user?.email as string;

      const fetchUserData = async () => {
          try {
              if (userMail) {
                  const getUserResponse = await fetch(`/api/user?userEmail=${encodeURIComponent(userMail)}`, {
                      method: "GET",
                  });

                  const user = await getUserResponse.json();
                  setName(user.firstName || "")
                  setSurname(user.lastName || "");
                  setNationality(user.nationality || "");

              }}
          catch
              (error)
              {
                  console.log("failed to get profile");
              }
          }
      void fetchUserData();

      const handleSubmit = async (formData: FormData) => {
        const res = await updateProfile(formData);
        if (res.status == "error") {
          showToast("error", res.message);
        } else {
          showToast("success", res.message);
        }
      };

  return (
    <form action={handleSubmit}>
      <Input name="firstname" type="text" defaultValue={name} ></Input>
      <br></br>
      <Input name="lastname" type="text" defaultValue={surname} ></Input>
      <br></br>
      <CountrySelection name="nationality" className={`${styles.input} `} defaultValue={nationality} />
      <br></br>
      <Input name="password" type="password"/>
      <br></br>
      <Input name="verpassword" type="password" />
      <br></br>
      <LoginButton title="Update" />
    </form>
  );
}
