import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { editToDoStatus } from '@/app/redux/slices/toDoSlice';
import { useState } from "react";
import { useToast } from '@/components/toastMessage/toastContext';
import { useSession } from "next-auth/react"
import { CheckCircle, Clock } from 'lucide-react';

export default function ToDoStatusChange({ id, toDoStatus }) {
  const { status } = useSession()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // Loading state to track the status of the action
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsCompleted = async () => {
    if (status !== "authenticated") {
      showToast("Please log in to mark a to-do as completed.", "error");
      return;
    }

    setIsLoading(true);
    const updatedToDo = {
      toDoStatus: toDoStatus === 'Completed' ? 'Pending' : 'Completed',
      toDoEditionDate: new Date().toISOString()
    };
    try {
      await dispatch(editToDoStatus({ id, updatedToDo })).unwrap();
      onClose();
      showToast('Status updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update status. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="sm" color={toDoStatus === 'Completed' ? "primary" : "success"}>
        {toDoStatus === 'Completed' ? (
          <>
            <Clock size={16} className="mr-1" /> Mark as Pending
          </>
        ) : (
          <>
            <CheckCircle size={16} className="mr-1" /> Mark as Completed
          </>
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
          <ModalBody>
            <p className="text-center mt-4 text-gray-700 dark:text-gray-100">
              Do you want to change the status to{' '}
              <strong className="text-blue-500 dark:text-blue-400">
                {toDoStatus === 'Completed' ? 'Pending' : 'Completed'}
              </strong>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              No
            </Button>
            <Button color="primary" onPress={handleMarkAsCompleted} isLoading={isLoading}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
