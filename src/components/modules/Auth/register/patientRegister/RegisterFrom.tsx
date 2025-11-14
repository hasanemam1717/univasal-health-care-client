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
import { patientRegisterService } from "@/components/services/Auth";
import { toast } from "sonner";
import { patientRegisterSchema } from "./registerValidation";
import Link from "next/link";

export default function RegisterForm() {
  const form = useForm({ resolver: zodResolver(patientRegisterSchema) });
  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("confirmPassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await patientRegisterService(data);
      if (response?.success) {
        toast.success(response?.message);
      } else {
        toast.error(response?.error?.name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 p-6">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          Create Patient Account
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Patient Fields */}
            <FormField
              control={form.control}
              name="patient.email"
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
              name="patient.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
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
              name="patient.contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone number"
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
              name="patient.address"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-gray-700 font-medium">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Address"
                      className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Fields */}
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="rounded-xl border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                disabled={!(passwordConfirm && password === passwordConfirm)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-10 py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isSubmitting ? "Registering" : "Register"}
              </button>
            </div>
          </form>
          <h1 className="text-center">
            Have any account please{" "}
            <Link
              className="text-indigo-600 mt-2 font-semibold"
              href={"/login"}
            >
              Login
            </Link>{" "}
          </h1>
        </Form>
      </div>
    </div>
  );
}
