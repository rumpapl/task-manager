"use client";

import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupUserAction } from "@/actions/auth/signup";
import { useRouter } from "next/navigation";
import FormController from "@/components/hoc/form-controller";
import OutlineLabelInput from "@/components/elements/inputs/outline-label";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export const Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await signupUserAction(data);
      if (response?.status === 201) {
        router.push("/login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setError(`An unexpected error occurred.`);
      console.log({ err });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold">Sign Up</h2>

      <FormController name="name" control={control}>
        <OutlineLabelInput label="Name" />
      </FormController>

      <FormController name="email" control={control}>
        <OutlineLabelInput label="Email" />
      </FormController>

      <FormController name="password" control={control}>
        <OutlineLabelInput label="Password" type="password" />
      </FormController>

      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Form;
