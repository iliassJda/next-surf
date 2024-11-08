import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextResponse) {
  const data = await req.json();

  const {
    email,
    password,
    firstname,
    lastname,
    nationality,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    nationality: string;
  } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  const hashedpassword = await bcrypt.hash(password, 5);

  console.log(`test ${hashedpassword}`);

  if (existingUser) {
    console.log(`User ${existingUser.id} already exists`);
    return NextResponse.json(
      {
        error: `${existingUser.email} is already registered`,
      },
      {
        status: 409,
      }
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        firstname,
        lastname,
        nationality,
      },
    });

    console.log(
      `${email}, ${password}, ${firstname}, ${lastname}, ${nationality}`
    );
    return NextResponse.json(
      {
        message: `User created! Welcome ${firstname}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error");
    return NextResponse.json(
      {
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  return NextResponse.json(posts);
}
