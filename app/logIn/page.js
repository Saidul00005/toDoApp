'use client';
import { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/navigation";
import { useToast } from '@/components/toastMessage/toastContext';
import { useSession, signIn } from "next-auth/react";


const LogInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    if (session) {
      router.push('/toDoList')
    }
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    mode: "onChange",
    criteriaMode: 'all',
  });
  const onSubmit = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      showToast("Please fill all fields before submitting.", 'error');
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        showToast("Invalid email or password.", 'error');
      } else {
        reset();
        router.push("/");
        showToast('Login Successful.', 'success');
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.", 'error');
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
