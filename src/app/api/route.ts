import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const data = await req.json();

  const { email, password, firstname, lastname, nationality } = data;

  console.log(
    `${email}, ${password}, ${firstname}, ${lastname}, ${nationality}`
  );

  if (!email || !password) {
    return NextResponse.json({ Error: "Email and password are required" });
  }

  try {
    const newUser = prisma.user.create({
      data: {
        email,
        password,
        firstname,
        lastname,
        nationality,
      },
    });

    return NextResponse.json({
      message: "user created!",
      userId: (await newUser).id,
    });
  } catch (error) {
    console.log("error");
    return NextResponse.json({
      error: "unexpected error",
    });
  }
}

export async function GET() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();

  return NextResponse.json(posts);
}

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   console.log("yesss");
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const { email, password, firstname, lastname, nationality } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   if (!nationality) {
//     return res.status(400).json({ message: "Please select a Nationality" });
//   }

//   const existingUser = await prisma.user.findUnique({ where: { email } });
//   if (existingUser) {
//     return res.status(409).json({ message: "Email already registered" });
//   }

//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password,
//         firstname,
//         lastname,
//         nationality,
//       },
//     });

//     return res
//       .status(201)
//       .json({ message: "User created", userId: newUser.id });
//   } catch (error) {
//     return res.status(500).json({ message: "Error creating user" });
//   }
// }
