'use client';
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useToast } from '@/components/toastMessage/toastContext';
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SignUpPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/toDoList')
    }
  }, [status, router])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, getValues } = useForm({
    mode: "onChange",
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        showToast(errorData.message || "SignUp failed. Please try again.", 'error');
        return;
      }
      showToast("SignUp successful! Please verify your email.", 'success');
      reset();
    } catch (error) {
      showToast("Error during SignUp. Please try again.", 'error');
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
            label="Name"
            placeholder="Enter your name"
            aria-label="Name"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("name", {
              required: "Name is required.",
              minLength: { value: 2, message: "Name must be at least 2 characters long." },
              maxLength: { value: 50, message: "Name can be at most 100 characters long." },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Name can only contain letters and spaces." }
            })}
          />

          <ErrorMessage
            errors={errors}
            name="name"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
                </div>
              ))
            }
          />
        </div>

        <div className="mb-4">
          <Input
            label="City"
            placeholder="Enter your city"
            aria-label="City"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("city", {
              required: "City is required.",
              minLength: { value: 2, message: "City must be at least 2 characters long." },
              maxLength: { value: 100, message: "City can be at most 100 characters long." },
              pattern: { value: /^[A-Za-z\s]+$/, message: "City can only contain letters and spaces." }
            })}
          />

          <ErrorMessage
            errors={errors}
            name="city"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
                </div>
              ))
            }
          />
        </div>

        <div className="mb-4">
          <Input
            label="Country"
            placeholder="Enter your country"
            aria-label="Country"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("country", {
              required: "Country is required.",
              minLength: { value: 2, message: "Country must be at least 2 characters long." },
              maxLength: { value: 100, message: "Country can be at most 100 characters long." },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Country can only contain letters and spaces." }
            })}
          />

          <ErrorMessage
            errors={errors}
            name="country"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
                </div>
              ))
            }
          />
        </div>


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
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
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
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
                </div>
              ))
            }
          />
        </div>

        <div className="mb-4">
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            isRequired
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: value =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <div
                  key={type}
                  className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-red-500 dark:text-red-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm">{message}</p>
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
            Sign-Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
