// import { NextAuthOptions } from "next-auth";

// import prisma from "@/lib/db";
// import bcrypt from "bcrypt";

// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials?.email,
//             },
//           });

//           if (!user) {
//             return null;
//           }

//           const valid = await bcrypt.compare(
//             credentials?.password as string,
//             user.password
//           );

//           if (!valid) {
//             console.log("Credentials are not valid!");
//             return null;
//           }

//           if (user) {
//             return {
//               id: user.id,
//               email: user.email,
//             };
//           }
//         } catch (error) {
//           return null;
//         }
//         // const user = await prisma.user.findUnique({
//         //   where: {
//         //     email: credentials?.email,
//         //   },
//         // });

//         // if (!user) {
//         //   return null;
//         // }

//         // const valid = await bcrypt.compare(
//         //   credentials?.password as string,
//         //   user.password
//         // );

//         // if (!valid) {
//         //   console.log("Credentials are not valid, try again!");
//         //   return null;
//         // }

//         // if (user) {
//         //   return { ...user, email: user.email };
//         // }
//       },
//     }),
//   ],
// };
