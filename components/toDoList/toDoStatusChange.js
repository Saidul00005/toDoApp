import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { editToDoStatus } from '@/app/redux/slices/toDoSlice';

export default function ToDoStatusChange({ id, toDoStatus }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const handleMarkAsCompleted = async () => {
    const updatedToDo = {
      toDoStatus: toDoStatus === 'Completed' ? 'Pending' : 'Completed',
      toDoEditionDate: new Date().toISOString()
    }
    await dispatch(editToDoStatus({ id, updatedToDo })).unwrap();
    onClose()

  }

  return (
    <>
      <Button onPress={onOpen} size='sm' color={toDoStatus === 'Completed' ? "primary" : "success"} >{toDoStatus === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}</Button>
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
            <Button color="primary" onPress={handleMarkAsCompleted}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}