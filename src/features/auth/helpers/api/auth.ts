import { loginFormDataType } from "@/features/auth/types";
import { ENDPOINTS } from "@/features/auth/helpers/api/END-POINTS";

export const login = async (data: loginFormDataType) =>
  fetch(ENDPOINTS?.login, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
