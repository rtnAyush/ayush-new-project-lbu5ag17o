"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoaderCircleIcon } from "lucide-react";
import api from "@/lib/api";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", data);
      if (response.data.success) {
        toast.success("Login successful!");
        router.push("/dashboard/user/todos");
      }
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;