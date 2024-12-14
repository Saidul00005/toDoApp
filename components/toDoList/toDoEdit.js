import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editToDo, selectToDos } from '@/app/redux/slices/toDoSlice';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, useDisclosure } from "@nextui-org/react";
import { useToast } from '@/components/toastMessage/toastContext';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"

const ToDoEdit = ({ id, status }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const toDos = useSelector(selectToDos);
  const { showToast } = useToast();

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ criteriaMode: "all" });

  const toDoItem = toDos.find((item) => item._id === id);

  useEffect(() => {
    if (toDoItem) {
      const toDoACT = new Date(toDoItem.toDoACT)
        .toLocaleString('sv-SE') // Use Swedish format YYYY-MM-DDTHH:mm:ss
        .replace(' ', 'T'); // Replace space with T for `datetime-local` input compatibility

      reset({
        toDoName: toDoItem.toDoName,
        toDoDescription: toDoItem.toDoDescription,
        toDoACT: toDoACT.slice(0, 16), // Only take YYYY-MM-DDTHH:mm
      });
    }
  }, [toDoItem, reset]);


  const onSubmit = async (data) => {
    const toDoACTUtc = new Date(data.toDoACT).toISOString();
    const updatedToDo = {
      toDoName: data.toDoName,
      toDoDescription: data.toDoDescription,
      toDoACT: toDoACTUtc,
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
    }
  };

  const handleModalOpen = () => {
    onOpen();
    if (toDoItem) {
      const toDoACT = new Date(toDoItem.toDoACT)
        .toLocaleString('sv-SE') // Defaults to local timezone without `timeZone` option
        .replace(' ', 'T');


      reset({
        toDoName: toDoItem.toDoName,
        toDoDescription: toDoItem.toDoDescription,
        toDoACT: toDoACT.slice(0, 16),
      });
    }
  };

  return (
    <>
      <Button onPress={handleModalOpen} size='sm' color='secondary' className={status === 'Completed' ? 'hidden' : ''}>Edit</Button>
      <Modal isDismissable={false} isKeyboardDismissDisabled={true} scrollBehavior='inside' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Update To-Do</ModalHeader>
          <ModalBody>
            <Controller
              name="toDoName"
              control={control}
              rules={{
                required: "To-Do Name is required",
                minLength: { value: 3, message: "To-do name must be at least 3 characters long" },
                maxLength: { value: 100, message: "To-do name must not exceed 100 characters" },
              }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    label="To-Do Name"
                    isRequired
                    variant="bordered"
                    autoFocus
                    id='toDoName'
                    labelPlacement='outside'
                    size='sm'
                  />
                  <ErrorMessage
                    errors={errors}
                    name="toDoName"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <div
                          key={type}
                          className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500 dark:text-red-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-sm">{message}</p>
                        </div>
                      ))
                    }
                  />
                </div>
              )}
            />

            <Controller
              name="toDoDescription"
              control={control}
              rules={{
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters long" },
                maxLength: { value: 500, message: "Description must not exceed 500 characters" }
              }}
              render={({ field }) => (
                <div>
                  <Textarea {...field} label="Description" isRequired variant="bordered" id='toDoDescription' disableAnimation
                    disableAutosize labelPlacement='outside' size='sm'
                    classNames={{
                      base: "col-span-12 md:col-span-6 mb-6 md:mb-0",
                      input: "resize-y min-h-[40px]",
                    }} />
                  <ErrorMessage
                    errors={errors}
                    name="toDoDescription"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <div
                          key={type}
                          className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500 dark:text-red-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-sm">{message}</p>
                        </div>
                      ))
                    }
                  />
                </div>
              )}
            />
            <Controller
              name="toDoACT"
              control={control}
              rules={{
                required: "Completion time is required",
                validate: {
                  futureDate: (value) => {
                    const inputDate = new Date(value);
                    const currentDate = new Date();
                    if (inputDate <= currentDate) {
                      return "Assumptive completion time must be a future date";
                    }
                    return true;
                  }
                }
              }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="toDoACT"
                    className="block text-xs font-medium mb-2 text-gray-800 dark:text-gray-200"
                  >
                    Assumptive Completion Time:<span className="text-red-500"> *</span>
                  </label>
                  <input {...field} id="toDoACT" type="datetime-local" required
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="toDoACT"
                    render={({ messages }) =>
                      messages &&
                      Object.entries(messages).map(([type, message]) => (
                        <div
                          key={type}
                          className="flex items-center gap-2 mt-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500 dark:text-red-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.401 1.676a3 3 0 015.198 0l7.447 12.924c1.237 2.147-.309 4.8-2.599 4.8H4.553c-2.29 0-3.836-2.653-2.6-4.8L9.4 1.676zM12 8.25a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3a.75.75 0 00-.75-.75zm.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-sm">{message}</p>
                        </div>
                      ))
                    }
                  />
                </div>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
};

export default ToDoEdit;
