import bcrypt from "bcryptjs";

export const isPasswordMatched = async (
  password: string = "",
  existingUserPassword: string = "",
) => await bcrypt.compare(password, existingUserPassword);

export const getHashedPassword = async (password: string | undefined) => {
  if (password) return await bcrypt.hash(password, 12);
  return;
};
