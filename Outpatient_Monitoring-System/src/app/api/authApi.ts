/* eslint-disable @typescript-eslint/no-explicit-any */
import { signInDataType, signUpDataType } from "@/types/userTypes";
import axios from "axios";


export const signUpUser = async (user: signUpDataType) => {
  const { email, password } = user;

  try {
    const response = await axios.post(
      "/auth/signup",
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Sign-up error:",
      error.response?.data.message || error.message
    );
    throw new Error(
      error.response?.data.message || "An error occurred during sign up"
    );
  }
};

export const signInUser = async ({ user }: { user: signInDataType }) => {
  try {
    const response = await axios.post("/auth/signin", user, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Sign-in error:",
      error.response?.data.message || error.message
    );
    throw new Error(
      error.response?.data.message || "An error occurred during sign in"
    );
  }
};
