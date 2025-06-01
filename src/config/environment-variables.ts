// environments
export const JWT_SECRET: string =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET is not defined in environment variables");
  })();

export const GOOGLE_CLIENT_ID: string =
  process.env.GOOGLE_CLIENT_ID ??
  (() => {
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables");
  })();

export const GOOGLE_CLIENT_SECRET: string =
  process.env.GOOGLE_CLIENT_SECRET ??
  (() => {
    throw new Error(
      "GOOGLE_CLIENT_SECRET is not defined in environment variables",
    );
  })();

export const NEXTAUTH_SECRET: string =
  process.env.NEXTAUTH_SECRET ??
  (() => {
    throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
  })();

export const NEXTAUTH_URL: string =
  process.env.NEXTAUTH_URL ??
  (() => {
    throw new Error("NEXTAUTH_URL is not defined in environment variables");
  })();
