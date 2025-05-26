"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { FormController } from "@/components/hoc";
import { OutlineLabelInput } from "@/components/elements/inputs";

import { loginSchema } from "@/features/auth/validators";
import { loginFormDataType } from "@/features/auth/types";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginFormDataType>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data: loginFormDataType) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (!res.ok) {
        const error = await res.json();
        setError(error.message || "Login Failed!");
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
        console.log({ err });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold">Login</h2>
      <FormController name="email" control={control}>
        <OutlineLabelInput placeholder="Email" />
      </FormController>

      <FormController name="password" control={control}>
        <OutlineLabelInput placeholder="Password" type="password" />
      </FormController>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
