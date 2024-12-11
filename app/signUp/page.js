'use client';
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";

const SignUpPage = () => {

  const router = useRouter();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    mode: "onChange",
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    if (!data.userEmail || !data.password) {
      alert("Please fill all fields before submitting.");
      return;
    }
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        alert("SignUp failed. Please try again.");
        return;
      }

      reset();
      alert("SignUp successful! You can now log in.");
      router.push("/logIn"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error during SignUp:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Sign Up
        </h1>
        <div className="mb-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            aria-label="Email Address"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("userEmail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address (e.g., user@example.com).",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="userEmail"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="mt-1 px-2 py-1 text-sm text-red-700  rounded-md dark:bg-gray-800 dark:text-red-500"
                >
                  {message}
                </div>
              ))
            }
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters long" },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\d\s]).{8,}$/,
                message: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character (e.g., !, @, #, $, etc.).",
              },
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
                  className="mt-1 px-2 py-1 text-sm text-red-700 rounded-md dark:bg-graydasdjk-800 dark:text-red-500"
                >
                  {message}
                </div>
              ))
            }
          />
        </div>
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
