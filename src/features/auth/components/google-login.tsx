"use client";

import { signIn } from "next-auth/react";

const GoogleLoginButton = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Sign in with Google
    </button>
  );
};
export default GoogleLoginButton;
