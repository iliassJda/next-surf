"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/lib/auth";

const register = async (formData: FormData) => {
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nationality = formData.get("nationality") as string;

  // Checking if the fields are filled
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

  const existingusername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  // Checking if there is already a user in the database with that email since that is a unique trait of user.
  if (existinguser) {
    return {
      toast: "error",
      message: `User with email: "${email}" already exists!`,
    };
  }

  // Checking if there is already a user in the database with that username.
  if (existingusername) {
    return {
      toast: "error",
      message: `User with username: "${username}" already exists!`,
    };
  }

  // Hash the password for security
  const hashedpassword = await bcrypt.hash(password, 5);

  // Finally, adding the user in the database.
  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedpassword,
      firstname,
      lastname,
      nationality,
    },
  });

  redirect("/login");
};

// Login with Google Third Party
const loginGoogle = async () => {
  const res = await signIn("google", { redirectTo: "/" });

  return {
    toast: "success",
    message: "Successfully logged in!",
  };
};

// Login with credentials
const loginManual = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Checking if email and password are filled
  if (!email || !password) {
    return {
      toast: "error",
      message: "Please fill in your email and password",
    };
  }

  // Look for a user with the corresponding email.
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // If that user doesn't exist, return an error.
  if (!user) {
    return {
      toast: "error",
      message: "User does not exist. Please register first!",
    };
  }

  // If the user exists, compare the given passwords with the decrypted password in the found user.
  const valid = await bcrypt.compare(password, user.password);

  // Check if the passwords are the same.
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
//used in the account update when submit the updation form
const updateProfile = async (formData: FormData) => {
  const session = await auth();
  const user = session?.user;
  const email = user?.email as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const nationality = formData.get("nationality") as string;
  let password = formData.get("password") as string;
  const verpassword = formData.get("verpassword") as string;

  // search for the user that wants to update it's info.
  const existinguser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // We check if it's a user that is logged in with google since they don't have a password. Otherwise, check if the verification password is the same as password.
  if (password == "" && existinguser) password = existinguser.password;
  else if (password !== verpassword) {
    return {
      toast: "error",
      message: `Passwords doesn't match!`,
    };
  }
  // Hash the password
  const hashedpassword = await bcrypt.hash(password, 5);

  // Update everything
  await prisma.user.update({
    where: { email: email },
    data: {
      password: hashedpassword,
      firstname: firstname,
      lastname: lastname,
      nationality: nationality,
    },
  });

  redirect(`/account/${existinguser.username}`);
};

// Is used in placePage and is for having the user database part for the user that is logged in. That way, the data is always accessible.
const getUser = async (userEmail: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  return user;
};
//function used to connect a place to a user with the save connection
const SavePlace = async (
  userId: number,
  latitude: string,
  longitude: string
) => {
  //we update the saved field in users adding the place with a specific lat, long that are unique in the SurfSpot relation
  await prisma.user.update({
    where: { id: userId },
    data: {
      saved: {
        connect: {
          latitude_longitude: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        },
      },
    },
    include: {
      saved: true,
    },
  });
};
//function used to disconnect a place and a user that have a save connection
const UnsavePlace = async (
  userId: number,
  latitude: string,
  longitude: string
) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      saved: {
        disconnect: {
          latitude_longitude: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        },
      },
    },
    include: {
      saved: true,
    },
  });
};
//check if the place with a specifc lat, long is already a saved place for a user
const isPlaceSaved = async (
  userId: number,
  latitude: string,
  longitude: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      saved: {
        some: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      },
    },
    include: {
      saved: true,
    },
  });
  return !!user;
};

export {
  register,
  loginManual,
  loginGoogle,
  updateProfile,
  getUser,
  SavePlace,
  UnsavePlace,
  isPlaceSaved,
};
