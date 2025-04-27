import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getCookie } from "cookies-next/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoginMutation,
  useRefreshTokenMutation,
} from "@/redux/auth/authApi";
import Link from "next/link";
import { set } from "lodash";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/movie/userSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationOpen: () => void;
}

const LoginModal = ({
  isOpen,
  onClose,
  onRegistrationOpen,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [login, { isLoading }] = useLoginMutation();
 

  const dispatch = useDispatch();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      const tokenExpiry = response.expiresIn;
      localStorage.setItem("authToken", response.accessToken);
      localStorage.setItem("expiry", tokenExpiry);
      dispatch(setUser({
        id: response.userId,
    
      }));
      setMessage("Login successful!");
      setErrorMessage("");
      setTimeout(() => {
        reset();
        setMessage("");
        onClose();

      }, 2000);
    } catch (err) {
      
      setErrorMessage( err?.data?.message);
    }
  };

 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your email below to login to your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              placeholder="m@example.com"
              className="bg-black border-gray-700 text-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
            </div>
            <Input
              id="password"
              type="password"
              className="bg-black border-gray-700 text-white"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Login
          </Button>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-white hover:underline"
              onClick={() => {
                onClose();
                onRegistrationOpen();
              }}
            >
              Sign up
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
