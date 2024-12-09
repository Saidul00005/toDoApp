'use client';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LogInModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [loginError, setLoginError] = useState("");

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
        setLoginError("");
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
                  },
                })}
                errorMessage={errors.email?.message}
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: "Password is required" })}
                errorMessage={errors.password?.message}
              />
              {loginError && <p className="text-danger text-sm">{loginError}</p>}
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
      </Modal>
    </>
  );
};

export default LogInModal;
