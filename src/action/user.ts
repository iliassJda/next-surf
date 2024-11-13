"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation'


import { showToast } from "@/components/toast/toast";
import { error } from "console";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";
// import {
//   Id,
//   toast,
//   ToastContainer,
//   ToastContent,
//   ToastOptions,
// } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

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


const register = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nationality = formData.get("nationality") as string;

  console.log(
    `data: ${email}, ${password}, ${firstname}, ${lastname}, ${nationality}`
  );

  if (!firstname || !lastname || !email || !password) {
    // showToast("error", "Please fill all fields");
    throw new Error("Please fill all fields");
  }

  const existinguser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existinguser) {
    // showToast("error", `User ${existinguser.email} already exists`);
    throw new Error("User already exist!");
  }

  const hashedpassword = await bcrypt.hash(password, 5);

  

  await prisma.user.create({
    data: {
      email,
      password: hashedpassword,
      firstname,
      lastname,
      nationality,
    },
  });

  console.log("SUCCESFULL")
  redirect("/login")
  // showToast("success", `User created, welcome ${firstname}`);
};


const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {

    console.log("im here first")

    await signIn("credentials", formData);

    

  } catch(error) {
    return new Error("Unexpected Error")
  }

  // redirect("/");

  // console.log(`email: ${email}, password: ${password}`)
}

export { register, login };
