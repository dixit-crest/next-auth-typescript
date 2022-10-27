import { hashedPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

async function handler(req, res) {
  if (!req.method === "POST") return;
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input - Please try again." });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    res.status(422).json({ message: "Email already exist- Please try again." });
    client.close();
    return;
  }
  const hashPassword = await hashedPassword(password);
  const result = await db.collection("users").insertOne({
    email: email,
    password: hashPassword,
  });

  res.status(201).json({ message: "User created successfully!", data: result });
  client.close();
}
export default handler;
