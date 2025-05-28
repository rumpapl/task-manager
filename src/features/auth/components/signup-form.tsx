"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormController } from "@/components/hoc";
import { OutlineLabelInput } from "@/components/elements/inputs";

import { signupUserAction } from "@/features/auth/actions/signup";
import { signUpFormDataType } from "@/features/auth/types";
import { signupSchema } from "@/features/auth/validators";

export const SignupForm = () => {
  const router = useRouter();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<signUpFormDataType>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmit = async (data: signUpFormDataType) => {
    try {
      const response = await signupUserAction(data);
      if (response?.status === 201) {
        toast.success(response.message);
        router.push("/login");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(`An unexpected error occurred.`);
        console.log({ err });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-bold">Sign Up</h2>

      <FormController name="name" control={control}>
        <OutlineLabelInput placeholder="Name" />
      </FormController>

      <FormController name="email" control={control}>
        <OutlineLabelInput placeholder="Email" />
      </FormController>

      <FormController name="password" control={control}>
        <OutlineLabelInput placeholder="Password" type="password" />
      </FormController>

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

export default SignupForm;
