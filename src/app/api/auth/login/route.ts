import { NextResponse } from "next/server";
import { loginUserService } from "@/features/auth/services";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    const token = await loginUserService({ email, password });

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 401 }, // or 400/500 based on your logic
    );
  }
};
