import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { useRegisterMutation } from "@/redux/auth/authApi";
import Link from "next/link";
import { set } from "lodash";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const [message, setMessage] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerMutation(data).unwrap();
      const responseMessage = response.message;
      setMessage(responseMessage);
      setErrorMessage("");
      setTimeout(() => {
        reset();
        setMessage("");
        onClose();
      }, 2000);
    } catch (err) {
      setErrorMessage(err?.data?.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Register</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create an account to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="bg-black border-gray-700 text-white"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
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
            Register
          </Button>

          {message && <p className="text-green-500 text-sm">{message}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          
          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="#"
              className="text-white hover:underline"
              onClick={() => {
                onClose();
              }}
            >
              Login
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
