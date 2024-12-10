'use client';
import { useForm } from "react-hook-form";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";

const SignUpModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onChange"
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
        const errorData = await response.json();
        console.error("SignUp failed:", errorData.error);
        alert("SignUp failed. Please try again.");
        return;
      }

      const responseData = await response.json();
      console.log("SignUp successful:", responseData);
      reset();
      onClose();
      alert("SignUp successful! You can now log in.");
    } catch (error) {
      console.error("Error during SignUp:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="lg" color="success">Sign Up</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Kindly share your information.</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                aria-label="Email Address"
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                errorMessage={errors.userEmail?.message}  // Display error message
                status={errors.userEmail ? 'error' : 'default'}  // Apply error status
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                aria-label="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Password must contain at least one letter and one number",
                  },
                })}
                errorMessage={errors.password?.message}  // Display error message
                status={errors.password ? 'error' : 'default'}  // Apply error status
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => { reset(); onClose(); }}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUpModal;
