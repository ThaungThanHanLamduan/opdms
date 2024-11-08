import { signInDataType, signUpDataType } from "@/types/userTypes";
import { useMutation, useQuery } from "react-query";
import { getUser, logoutUser, signInUser, signUpUser } from "../api/authApi";

export const useSignupUser = () => {
  return useMutation((newUser: signUpDataType) => signUpUser(newUser));
};

export const useSigninUser = () => {
  return useMutation((user: signInDataType) => signInUser(user));
};

export const useLogoutUser = () => {
  return useMutation(() => logoutUser());
};

export const useGetUser = () => {
  return useQuery(["user"], () => getUser())
}
