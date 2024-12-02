"use client";

import Input from "./input";
import LoginButton from "./button";
import React, {useEffect, useRef, useState} from 'react';
import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";
import { showToast } from "../toast/toast";
import { updateProfile } from "@/action/user";
import {getUser} from "./getUser";
import {useSession} from "next-auth/react";

export default function Form(probs: any) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const { data: session, status } = useSession();
  const user = session?.user;
  const userMail = user?.email as string;

  useEffect(() => {
      console.log("ben hier");
      const fetchUserData = async () => {
          try {
              if (userMail) {
                  const getUserResponse = await fetch(`/api/user?userEmail=${encodeURIComponent(userMail)}`, {
                      method: "GET",
                  });

                  const user = await getUserResponse.json();
                  console.log("user", user);
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
    }, [userMail]);

  return (
    <form>
      <Input name="firstname" type="text" value={name} ></Input>
      <br></br>
      <Input name="lastname" type="text" value={surname} ></Input>
      <br></br>
      <CountrySelection className={`${styles.input} `} value={nationality}></CountrySelection>
      <br></br>
      <Input name="password" type="password"/>
      <br></br>
      <Input name="verpassword" type="password" />
      <br></br>
      <LoginButton title="Update" />
    </form>
  );
}
