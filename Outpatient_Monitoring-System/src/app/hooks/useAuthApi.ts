import { signInDataType, signUpDataType } from "@/types/userTypes";
import { useMutation } from "react-query";
import { logoutUser, signInUser, signUpUser } from "../api/authApi";

export const useSignupUser = () => {
  return useMutation((newUser: signUpDataType) => signUpUser(newUser));
};

export const useSigninUser = () => {
  return useMutation((user: signInDataType) => signInUser(user));
};

export const useLogoutUser = () => {
  return useMutation(() => logoutUser());
};
