"use server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDatabase from "@/lib/mongodb";
import { loginUserType } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "";
const COLLECTION_NAME: string = "user";

export const loginUserAction = async ({ email, password }: loginUserType) => {
  const db = await getDatabase();

  const user = await db.collection(COLLECTION_NAME).findOne({ email });
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Password doesn't match");
  }

  return jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};
