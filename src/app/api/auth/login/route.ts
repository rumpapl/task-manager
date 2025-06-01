import { NextRequest, NextResponse } from "next/server";
import { loginUserService } from "@/features/auth/services";
import { setCookies } from "@/app/api/auth/helpers";

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    const token: string = await loginUserService({
      email,
      password,
    });

    const res = NextResponse.json({ message: "Login successful" });
    if (token) {
      setCookies(res, token);
    }
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
