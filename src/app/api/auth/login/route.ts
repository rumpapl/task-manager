import { loginUserAction } from "@/actions/auth/login";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = await req.json();
  const token = await loginUserAction({ email, password });
  console.log({ token });
  const res = NextResponse.json({ message: "Login successful" });

  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
};
