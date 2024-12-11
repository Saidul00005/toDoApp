'use client';

import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LogInPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    mode: "onChange",
    criteriaMode: 'all',
  });
  const onSubmit = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid email or password.");
      } else {
        reset();
        alert("Login successful!");
        router.push("/");
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Log In
        </h1>
        {/* Email Input */}
        <div className="mb-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            aria-label="Email Address"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="mt-1 px-2 py-1 text-sm text-red-700 rounded-md dark:bg-gray-800 dark:text-red-500"
                >
                  {message}
                </div>
              ))
            }
          />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters long." },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="mt-1 px-2 py-1 text-sm text-red-700 rounded-md dark:bg-gray-800 dark:text-red-500"
                >
                  {message}
                </div>
              ))
            }
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <Button
            color="danger"
            variant="light"
            onPress={() => reset()}
            className="w-full"
          >
            Reset
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={isSubmitting}
            className="w-full"
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
