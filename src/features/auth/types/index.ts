import { z } from "zod";

import { loginSchema, signupSchema } from "@/features/auth/validators";

export type signUpFormDataType = z.infer<typeof signupSchema>;

export type loginFormDataType = z.infer<typeof loginSchema>;
