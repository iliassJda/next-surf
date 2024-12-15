import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import prisma from "./db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          username: user.username,
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username; // Add username to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username; // Include username in the session
      return session;
    },

    async signIn({account, profile}) {
      
      const email = profile?.email as string

      if (account?.provider === "google"){
        const newUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!newUser) {
          await prisma.user.create({
            data: {
              email,
              username:profile?.given_name as string || "",
              password: "",
              firstname: (profile?.given_name as string) || "",
              lastname: (profile?.family_name as string) || "",
              nationality: "",
              profilePictureCID: profile?.picture,
            },
          });
          console.log("Existing google user added to database");
        }
      }

      return true;
    },
  },
});
