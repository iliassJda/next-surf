"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/lib/auth";

const register = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nationality = formData.get("nationality") as string;

  if (!firstname || !lastname || !email || !password) {
    return {
      toast: "error",
      message: "Please fill all the fields.",
    };
  }

  const existinguser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existinguser) {
    return {
      toast: "error",
      message: `User ${firstname} with ${email} already exists!`,
    };
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

  redirect("/login");
};

const loginGoogle = async () => {
  // await signIn("google", { redirect: false })
  const res = await signIn("google", { redirectTo: "/" });

  return {
    toast: "success",
    message: "Successfully logged in!",
  };
};

const loginManual = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      toast: "error",
      message: "Please fill in your email and password",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      toast: "error",
      message: "User does not exist. Please register first!",
    };
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return {
      toast: "error",
      message: "Password is not valid",
    };
  }

  await signIn("credentials", {
    redirectTo: "/",
    email,
    password,
  });

  return {
    toast: "success",
    message: "Successfully logged in!",
  };
};

const updateProfile = async (formData: FormData) => {
  const session = await auth();
  const user = session?.user;
  const email = user?.email as string;

  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const nationality = formData.get("nationality") as string;
  let password = formData.get("password") as string;
  const verpassword = formData.get("verpassword") as string;
  console.log(password);

  const existinguser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (password == "" && existinguser) password = existinguser.password;
  else if (password !== verpassword) {
    return {
      toast: "error",
      message: `Passwords doesn't match!`,
    };
  }
  const hashedpassword = await bcrypt.hash(password, 5);

  await prisma.user.update({
    where: { email: email },
    data: {
      password: hashedpassword,
      firstname: firstname,
      lastname: lastname,
      nationality: nationality,
    },
  });

  redirect("/account");
};

const getUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  console.log("From server: ", user);
  return user;
};

const SavePlace = async (userId: number, latitude: string, longitude: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      saved: {
        connect: {
          latitude_longitude: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
          }
        },
      }
    },
    include: {
      saved: true,
    }
  });

}

export { register, loginManual, loginGoogle, updateProfile, getUser, SavePlace };
