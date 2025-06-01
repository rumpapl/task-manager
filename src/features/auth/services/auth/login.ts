import { loginFormDataType } from "@/features/auth/types";
import { generateJWTToken } from "@/features/auth/services/auth/helpers";
import { getUserByEmail } from "@/features/auth/services/user";
import { isPasswordMatched } from "@/features/auth/services/user/helpers";

export const loginUserService = async ({
  email,
  password,
}: loginFormDataType) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isTrue = await isPasswordMatched(password, user.password || "");
  if (!isTrue) {
    throw new Error("Password doesn't match");
  }

  return await generateJWTToken({
    _id: user._id.toString(),
    email: user.email,
  });
};
