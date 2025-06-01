import { NextResponse } from "next/server";

export const setCookies = (res: NextResponse, token: string) => {
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};
