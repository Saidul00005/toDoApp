import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { deleteToDo } from '@/app/redux/slices/toDoSlice';
import { useState } from 'react';
import { useToast } from '@/components/toastMessage/toastContext';


export default function ToDoDelete({ id }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);


  const handleDelete = async () => {
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
      <Button onPress={onOpen} size="sm" color='warning'>Delete</Button >
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