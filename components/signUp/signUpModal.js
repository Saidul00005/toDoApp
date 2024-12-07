'use client'
import { useForm } from "react-hook-form";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";

const SignUpModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    reset();
    onClose();
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
