/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import loginBackground from "../../../public/images/authCover.png";
import Image from "next/image";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignupUser } from "@/app/hooks/useAuthApi";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import { signUpDataType } from "@/types/userTypes";

const Signup: React.FC = () => {
  const router = useRouter();

  const [signUpData, setSignUpData] = useState<signUpDataType>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const signUpMutation = useSignupUser();
  const { login } = useAuth();

  useEffect(() => {
    setSamePassword(signUpData.password === confirmPassword);
  }, [confirmPassword, signUpData.password]);

  useEffect(() => {
    if (signUpMutation.isSuccess) {
      toast.success("Sign up successful! Please log in.");
      router.push("/auth/login");
    }
  }, [signUpMutation.isSuccess, login, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!samePassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (signUpData.username && signUpData.email && signUpData.password) {
      signUpMutation.mutate(signUpData, {
          onSuccess: () => {

          },
        onError: (error: any) => {
          toast.error(error.message);
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left section with image */}
      <div className="flex w-full md:w-1/2 justify-center items-center h-screen bg-white">
        <form onSubmit={handleSignup} className="w-80 p-6">
          <h3 className="text-3xl text-black font-semibold text-center mb-8 font-noto">
            Sign Up
          </h3>

          <div className=" flex flex-col justify-center items-center gap-6">
            <input
              type="text"
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
              className="w-[300px] text-black px-4 py-2 border border-primary rounded-lg  focus:outline-none focus:ring-2 focus:ring-primaryactive"
              placeholder="Enter Username"
              required
              aria-label="Username"
            />
            <input
              type="text"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
              className="w-[300px] text-black px-4 py-2 border border-primary rounded-lg  focus:outline-none focus:ring-2 focus:ring-primaryactive"
              placeholder="Enter Email"
              required
              aria-label="Email"
            />

            <div className="relative w-[300px]">
              <input
                type={showPassword ? "text" : "password"}
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
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
            <div className="relative w-[300px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryactive"
                placeholder="Enter Confirm Password"
                required
                aria-label="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 text-primary focus:outline-none"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4 w-[300px]">
              <p className=" text-slate-500 text-sm">
                {" "}
                Already have an account?
              </p>
              <Link
                href="/auth/login"
                className="text-sm text-primary underline"
              >
                Login
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryhover active:bg-primartactive transition"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
      {/* Right section with form */}
      <Image
        src={loginBackground}
        alt="loginBackground"
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
      />
    </div>
  );
};

export default Signup;
