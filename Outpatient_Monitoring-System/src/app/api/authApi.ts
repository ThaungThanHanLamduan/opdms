import axios, { AxiosError } from "axios";
import { getToken, login } from "@/service/authService";
import { signInDataType, signUpDataType } from "@/types/userTypes";
import { BaseURL } from "@/service/ApiEndpoint";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

interface ApiResponseError {
  message?: string;
}

export const signUpUser = async (newUser: signUpDataType) => {
  try {
    const response = await axios.post(
      `${BaseURL}/api/auth/signup`,
      newUser,
      config
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponseError>;
    const errorMessage =
      axiosError.response?.data?.message || "An error occurred during sign up";
    console.error("Sign-up error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const signInUser = async (user: signInDataType) => {
  try {
    const response = await axios.post(
      `${BaseURL}/api/auth/login`,
      user,
      config
    );
    console.log(response);
    const token = response?.data;

    if (response.status === 200 && response.data) {
      login(token);
    } else {
      throw new Error("Unexpected response during sign in");
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponseError>;
    const errorMessage =
      axiosError.response?.data?.message || "An error occurred during sign in";
    console.error("Sign-in error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const logoutUser = async () => {
  try {
    const token = getToken();
    const response = await axios.post(`${BaseURL}/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponseError>;
    const errorMessage =
      axiosError.response?.data?.message || "An error occurred during sign out";
    console.error("Sign-out error:", errorMessage);
    throw new Error(errorMessage);
  }
};
