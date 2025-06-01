import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { NEXTAUTH_SECRET } from "@/config";
import { setCookies } from "@/app/api/auth/helpers";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: NEXTAUTH_SECRET });

  if (!token || !token.jwtToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    const { jwtToken } = token;
    const response = NextResponse.redirect(new URL("/", req.url));
    setCookies(response, jwtToken.toString());
    return response;
  }
}
