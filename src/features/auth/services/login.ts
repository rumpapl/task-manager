import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDatabase from "@/lib/mongodb";

import { loginFormDataType } from "@/features/auth/types";
import { USER_COLLECTION_NAME } from "@/features/auth/config";

const JWT_SECRET = process.env.JWT_SECRET || "";
const COLLECTION_NAME: string = USER_COLLECTION_NAME;

export const loginUserService = async ({
  email,
  password,
}: loginFormDataType) => {
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
