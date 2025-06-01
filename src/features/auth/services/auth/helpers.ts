import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";
import { userType } from "@/features/auth/types";

export const generateJWTToken = async (user: userType) => {
  return jwt.sign(
    { id: user?._id?.toString(), email: user.email },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
