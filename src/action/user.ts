"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";

import { showToast } from "@/components/toast/toast";

const register = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nationality = formData.get("nationality") as string;

  if (!firstname || !lastname || !email || !password) {
    showToast("error", "Please fill all fields");
    throw new Error("Please fill all fields");
  }

  const existinguser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existinguser) {
    showToast("error", `User ${existinguser.email} already exists`);
    throw new Error("User already exist!");
  }

  const hashedpassword = await bcrypt.hash(password, 5);

  console.log(
    `data: ${email}, ${hashedpassword}, ${firstname}, ${lastname}, ${nationality}`
  );

  await prisma.user.create({
    data: {
      email,
      password: hashedpassword,
      firstname,
      lastname,
      nationality,
    },
  });

  showToast("success", `User created, welcome ${firstname}`);
};

export { register };
