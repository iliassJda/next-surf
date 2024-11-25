import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import prisma from "./db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),


    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        // It says there is an error but everything works fine. Don't know what is wrong
        const email = (credentials.email as string) || undefined;
        const password = (credentials.password as string) || undefined;

        console.log(`email: ${email}, password: ${password}`);

        if (!email || !password) {
          return new CredentialsSignin(
            "Please provide both email and password"
          );
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return new CredentialsSignin("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return new CredentialsSignin("Password did not match");
        }

        const userData = {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          nationality: user.nationality,
          id: user.id,
        };

        return userData;
      },

    }),
  ],

  pages: {
    signIn: "/login",
  },
});
