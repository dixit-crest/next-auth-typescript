import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db();
        const userCollection = await db.collection("users");

        const existingUser = await userCollection.findOne({
          email: credentials.email,
        });

        if (!existingUser) {
          client.close();
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          existingUser.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Password doesn't match");
        }

        client.close();
        return { email: existingUser.email };
      },
    }),
  ],
});
