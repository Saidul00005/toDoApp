import React from 'react'
import { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editToDo, selectToDos, fetchToDos } from '@/app/redux/slices/toDoSlice'
import Link from 'next/link'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

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


const ToDoItem = ({ id, name, description, status, act, creationDate, editionDate }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

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



  const formattedCreationDate = new Date(creationDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const formattedActDate = new Date(act).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedEditionDate = new Date(editionDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const handleSubmit = async (e) => {
    const updatedToDo = {
      toDoName: formState.toDoName,
      toDoDescription: formState.toDoDescription,
      toDoACT: formState.toDoACT,
      toDoStatus: "Pending",
      toDoCreationDate: toDoItem.toDoCreationDate,
      toDoEditionDate: new Date().toISOString(),
    };

    await dispatch(editToDo({ id, updatedToDo })).unwrap();
    onClose();
  }

  return (
    <>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md uppercase font-bold">{name}</p>
            <p className="text-small text-default-500">Created at: {formattedCreationDate}</p>
            {editionDate && (
              <p className="text-small text-default-500">Last edited at: {formattedEditionDate}</p>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Description</p>
            <p>{description}</p>
          </div>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Status</p>
            <p><Button size="sm" color={status === 'Pending' ? 'warning' : 'default'} variant="flat">{status}</Button></p>
          </div>
          <div className='py-1'>
            <p className="text-tiny uppercase font-bold">Assumptive completion time</p>
            <p>{formattedActDate}</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button size="sm" color='secondary' onPress={onOpen}>Edit</Button>
          <Link
            href=""
            className='px-1'
          >
            <Button size="sm" color='warning'>Delete</Button>
          </Link>

          <Link
            href=""
            className='px-1'
          >
            <Button size="sm" color='warning'>Mark as Completed</Button>
          </Link>
        </CardFooter>
      </Card>

      <>
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
                <Button color="primary" onPress={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>

    </>
  )
}

export default ToDoItem