'use client'
import { useForm } from "react-hook-form";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";

const LogInModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    // Simulate API login request
    try {
      // Replace this with your login API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login successful");
      reset();
      onClose();
    } catch (error) {
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => { reset(); onClose(); }}>
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
