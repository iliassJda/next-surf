"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password, firstname, lastname, nationality } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!nationality) {
    return res.status(400).json({ message: "Please select a Nationality" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already registered" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        firstname,
        lastname,
        nationality,
      },
    });

    return res
      .status(201)
      .json({ message: "User created", userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
}
