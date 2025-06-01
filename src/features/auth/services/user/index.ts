import getDatabase from "@/lib/mongodb";
import { USER_COLLECTION_NAME } from "@/features/auth/services/config";
import { signUpFormDataType, userType } from "@/features/auth/types";
import { getHashedPassword } from "@/features/auth/services/user/helpers";

const COLLECTION_NAME: string = USER_COLLECTION_NAME;

export const getUserByEmail = async (email: string) => {
  const db = await getDatabase();
  return await db.collection(COLLECTION_NAME).findOne({ email });
};

export const createUser = async (user: userType | signUpFormDataType) => {
  const db = await getDatabase();
  const { name, email, password } = user;

  const hashedPassword = await getHashedPassword(password);

  return await db.collection(COLLECTION_NAME).insertOne({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};
