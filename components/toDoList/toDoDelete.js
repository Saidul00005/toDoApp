import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { deleteToDo } from '@/app/redux/slices/toDoSlice';
import { useState } from 'react';
import { useToast } from '@/components/toastMessage/toastContext';
import { useSession } from "next-auth/react"
import { Trash } from 'lucide-react';
import { Tooltip } from "@nextui-org/react";


export default function ToDoDelete({ id }) {
  const { status } = useSession()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);


  const handleDelete = async () => {
    if (status !== "authenticated") {
      showToast("Please log in to delete to-do.", "error");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(deleteToDo(id)).unwrap();
      onClose();
      showToast('Deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed. Please try again.', 'error');
      // alert("Failed to delete to-do");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Tooltip content="Delete" placement="top" color="warning">
        <Button onPress={onOpen} size="sm" color='warning'><Trash size={16} /> </Button >
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
        <ModalContent>
          <ModalBody>
            <p className="text-center mt-4 text-gray-700 dark:text-gray-100">
              Do you want to{' '}
              <strong className="text-red-500 dark:text-red-400">
                Delete
              </strong>?
            </p>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose}>
              No
            </Button>
            <Button color="primary" variant="light" onPress={handleDelete} isLoading={isLoading}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}