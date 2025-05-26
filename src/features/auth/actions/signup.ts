"use server";

import getDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";

import { signUpFormDataType } from "@/features/auth/types";
import { USER_COLLECTION_NAME } from "@/features/auth/config";

const COLLECTION_NAME: string = USER_COLLECTION_NAME;

export const signupUserAction = async ({
  name,
  email,
  password,
}: signUpFormDataType) => {
  const db = await getDatabase();

  const existingUser = await db
    .collection(COLLECTION_NAME)
    .findOne({ email: email });
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
