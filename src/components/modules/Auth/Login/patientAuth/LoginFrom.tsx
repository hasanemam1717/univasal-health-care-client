"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { loginService } from "@/components/services/Auth"; // Define this service separately
import { loginSchema } from "./loginValidation";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const {
    formState: { isSubmitting },
    reset,
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await loginService(data);
      if (response?.success) {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
        toast.success(response?.message);
        reset(); // Clear form fields
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-3">
          Wellcome Back
        </h2>
        <h1 className="text-sm text-center mb-5">
          Enter your email and password to access your account.
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-4">
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-10 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                type="submit"
              >
                {isSubmitting ? "Loging..." : "Login"}
              </button>
            </div>
            <h1 className="text-center">
              Don&apos;t have any account please{" "}
              <Link
                className="text-indigo-600 font-semibold"
                href={"/register"}
              >
                Register
              </Link>{" "}
            </h1>
          </form>
        </Form>
      </div>
    </div>
  );
}
