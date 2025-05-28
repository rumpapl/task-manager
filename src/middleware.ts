import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { JWT_SECRET } from "@/config";

const PUBLIC_PATHS = ["/login", "/signup"];

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS?.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token (will throw if invalid or expired)
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secretKey);

    //optionally attach user to headers for downstream usage
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.id as string);
    requestHeaders.set("x-user-email", payload.email as string);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(`JWT verification failed: ${err}`);
      console.log(err);
    }
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - static files
     * - API routes
     * - public routes (like login/register handled in the middleware logic)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
