/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import loginBackground from "../../../public/images/loginCover.png";
import Image from "next/image";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSigninUser } from "@/app/hooks/useAuthApi";
import { signInDataType } from "@/types/userTypes";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { getToken } from "@/service/authService";

const Login: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<signInDataType>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const signInMutation = useSigninUser();
  const { login } = useAuth();

  useEffect(() => {
    if (signInMutation.isSuccess) {
      console.log("SUCCESSFUL LOGIN")
      const authToken = getToken();
      if (authToken) login(authToken);
    }
  }, [login, router, signInMutation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    signInMutation.mutate(user, {
      onError: (error: any) => {
        if (error.response) {
          toast.error(
            error.response.data.message || "Login failed. Please try again."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left section with image */}
      <Image
        src={loginBackground}
        alt="loginBackground"
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
      />

      {/* Right section with form */}
      <div className="flex w-full md:w-1/2 justify-center items-center h-screen bg-white">
        <form onSubmit={handleLogin} className="w-80 p-6">
          <h3 className="text-3xl text-black font-semibold text-center mb-8 font-noto">
            Login
          </h3>

          <div className=" flex flex-col justify-center items-center gap-6">
            <input
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-[300px] text-black px-4 py-2 border border-primary rounded-lg  focus:outline-none focus:ring-2 focus:ring-primaryactive"
              placeholder="Enter Email"
              required
              aria-label="Email"
            />

            <div className="relative w-[300px]">
              <input
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full text-black px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryactive"
                placeholder="Enter Password"
                required
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 text-primary focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
              </button>
            </div>

            <div className="flex items-center justify-between w-[300px]">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline text-sm">
                Forgot Password?
              </a>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-4 w-[300px]">
                <p className=" text-slate-500 text-sm">
                  {"Don't have an account?"}
                </p>
                <Link
                  href="/auth/signup"
                  className="text-sm text-primary underline"
                >
                  Signup
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryhover active:bg-primartactive transition"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Log in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
