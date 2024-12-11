'use client';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message"

const LogInModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ criteriaMode: "all" });
  const [loginError, setLoginError] = useState("");  // We will keep this for displaying server-side errors

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
        setLoginError("Invalid email or password.");
      } else {
        console.log("Login successful");
        reset();
        setLoginError("");  // Clear the error on successful login
        onClose();
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} size='lg' color='success'>Log In</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Kindly give your information.</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/* Email Input */}
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                aria-label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  }
                })}
                id="email"
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

              {/* Password Input */}
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" },
                })}
                id="password"
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

              {/* Display loginError if it exists */}
              {loginError && (
                <div className="flex items-center gap-2 mt-3 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700">
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
                  <p className="text-sm">{loginError}</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => { reset(); setLoginError(""); onClose(); }}>
                Close
              </Button>
              <Button color="primary" type="submit" isLoading={isSubmitting}>
                Log in
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal >
    </>
  );
};

export default LogInModal;
