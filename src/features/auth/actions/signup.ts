"use server";

import { signUpFormDataType } from "@/features/auth/types";
import { createUser, getUserByEmail } from "@/features/auth/services";

export const signupUserAction = async ({
  name,
  email,
  password,
}: signUpFormDataType) => {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exist");
  }

  await createUser({
    name,
    email,
    password,
  });
  return { message: "User created successfully.", status: 201 };
};
