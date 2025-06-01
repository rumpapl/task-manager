import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/config";

import { generateJWTToken } from "@/features/auth/services/auth/helpers";
import { createUser, getUserByEmail } from "@/features/auth/services";

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async redirect({ baseUrl }) {
      // Redirect to custom API route after login
      return `${baseUrl}/api/auth/set-token`;
    },
    async jwt({ token, user: googleUser, account }) {
      // When using Google, persist user info
      if (account && googleUser) {
        const { name, email } = googleUser as { email: string; name: string };

        const existingUser = await getUserByEmail(email);

        let _id = "";
        if (!existingUser) {
          const { insertedId } = await createUser({ email, name });
          _id = insertedId.toString();
        }
        const user = {
          _id: existingUser?._id.toString() || _id,
          email: email || "",
        };

        // generate own JWT
        const jwtToken = await generateJWTToken(user);
        token.user = user;
        token.jwtToken = jwtToken;
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
});
