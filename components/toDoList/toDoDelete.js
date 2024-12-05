import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { deleteToDo } from '@/app/redux/slices/toDoSlice';

export default function ToDoDelete({ id, toDoStatus }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteToDo(id)).unwrap();
    onClose()
  }

  return (
    <>
      <Button onPress={onOpen} size="sm" color='warning' className={toDoStatus === 'Completed' ? 'hidden' : ''}>Delete</Button >
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
            <Button color="primary" variant="light" onPress={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}