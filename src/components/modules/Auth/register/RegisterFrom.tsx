"use client"; // needed for client-side interactivity in Next.js App Router

import { useForm } from "react-hook-form";

export default function RegisterFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This will be called when form is submitted successfully
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
