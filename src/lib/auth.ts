import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import prisma from "./db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = (credentials.email as string) || undefined;
        const password = (credentials.password as string) || undefined;

        console.log(`email: ${email}, password: ${password}`)

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error("Password is incorrect");
        }

        const userData = {
          email: user.email,
          // password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          nationality: user.nationality,
          id: user.id,
        };

        // console.log(`data: ${userData.}`);

        return userData;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
});
