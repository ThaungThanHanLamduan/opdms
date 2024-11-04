import { signInDataType, signUpDataType } from "@/types/userTypes";
import { useMutation } from "react-query";
import { signInUser, signUpUser } from "../api/authApi";

export const useSignupUser = () => {
  return useMutation((user: signUpDataType) => signUpUser(user));
};

export const useSigninUser = () => {
  return useMutation((user: signInDataType) => signInUser({ user }));
};
