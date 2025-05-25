"use server";

import getDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";

import { signupUserType } from "@/types";

const COLLECTION_NAME: string = "user";

export const signupUserAction = async ({
  name,
  email,
  password,
}: signupUserType) => {
  const db = await getDatabase();

  const existingUser = await db.collection("users").findOne({ email: email });
  if (existingUser) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.collection(COLLECTION_NAME).insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });
  return { message: "User created successfully.", status: 201 };
};
