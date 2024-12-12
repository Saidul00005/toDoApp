import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editToDo, selectToDos } from '@/app/redux/slices/toDoSlice';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, useDisclosure } from "@nextui-org/react";
import { useToast } from '@/components/toastMessage/toastContext';

const initialFormState = {
  toDoName: '',
  toDoDescription: '',
  toDoACT: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_FORM':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
};

const ToDoEdit = ({ id, name, description, status, act, creationDate, editionDate }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);
  const { showToast } = useToast();

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [isLoading, setIsLoading] = useState(false);


  const toDoItem = toDos.find((item) => item._id === id);


  useEffect(() => {
    if (toDoItem) {
      const localDate = new Date(toDoItem.toDoACT);
      const formattedDate = localDate.toLocaleString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).replace(',', '');

      const toDoACT = formattedDate.replace(' ', 'T');

      formDispatch({
        type: 'SET_FORM',
        payload: {
          toDoName: toDoItem.toDoName,
          toDoDescription: toDoItem.toDoDescription,
          toDoACT: toDoACT,
        }
      });
    }
  }, [toDoItem]);

  const handleSubmit = async () => {
    setIsLoading(true)
    const updatedToDo = {
      toDoName: formState.toDoName,
      toDoDescription: formState.toDoDescription,
      toDoACT: formState.toDoACT,
      toDoStatus: status,
      toDoCreationDate: toDoItem.toDoCreationDate,
      toDoEditionDate: new Date().toISOString(),
    };

    try {
      await dispatch(editToDo({ id, updatedToDo })).unwrap();
      onClose();
      showToast('Item edited successfully.', 'success');
    } catch (error) {
      showToast('Failed. Please try again.', 'error');
      //alert("Failed to update to-do");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      <Button onPress={onOpen} size='sm' color='secondary' className={status === 'Completed' ? 'hidden' : ''}>Edit</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Update To-Do</ModalHeader>
            <ModalBody>
              <Input
                label="To-Do Name"
                value={formState.toDoName}
                onChange={(e) => {
                  formDispatch({ type: 'SET_FIELD', field: 'toDoName', value: e.target.value })
                }
                }
                required
              />
              <Textarea
                label="Description"
                value={formState.toDoDescription}
                onChange={(e) => {
                  formDispatch({ type: 'SET_FIELD', field: 'toDoDescription', value: e.target.value })
                }
                }
                required
              />
              <Input
                label="Assumptive Completion Time"
                type="datetime-local"
                value={formState.toDoACT}
                onChange={(e) => {
                  formDispatch({ type: 'SET_FIELD', field: 'toDoACT', value: e.target.value })
                }
                }
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
                Update
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ToDoEdit