"use client";

import Input from "./input";
import LoginButton from "./button";
import React, {useEffect, useRef, useState} from 'react';
import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";
import { showToast } from "../toast/toast";
import { updateProfile } from "@/action/user";
import {getUser} from "./getUser";

export default function Form(probs: any) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  //const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const res = await updateProfile(formData);
    console.log("im here!");
    if (res.status == "error") {
      showToast("error", res.message);
    } else {
      showToast("success", res.message);
    }
  };
  
  const fetchUserData = async () => {
    const existinguser = await getUser();  
    if(existinguser){
      setName(existinguser.firstname);
      setSurname(existinguser.lastname);
      setNationality(existinguser.nationality);
      }
    };

  void fetchUserData();
  /*const session = await auth();
  let name = "";
  let surname = "";
  let email = "";
  let nationality = "";
  if (session){
    const user = session?.user
    email = user?.email  as string;
    const existinguser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existinguser){
      name = existinguser.firstname;
      surname = existinguser.lastname;
      nationality = existinguser.nationality;
    }
  }*/

  return (
    <form action={handleSubmit}>
      
      <Input name="firstname" type="text" value={name} />
      <br></br>
      <Input name="lastname" type="text" value={surname} />
      <br></br>
      <CountrySelection className={`${styles.input} `} defaultValue={nationality}/>
      <br></br>
      <Input name="password" type="password"/>
      <br></br>
      <Input name="verpassword" type="password" />
      <br></br>
      <LoginButton title="Update" />
    </form>
  );
}
