'use client';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToDo } from '@/app/redux/slices/toDoSlice';
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

const AddNewItemForm = () => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const ACTRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toDoItemData = {
      toDoName: nameRef.current.value,
      toDoDescription: descriptionRef.current.value,
      toDoACT: ACTRef.current.value,
      toDoStatus: 'Pending',
      toDoCreationDate: new Date().toISOString(),
    };

    dispatch(addToDo(toDoItemData));
    window.alert('To-Do item submitted successfully!');

    nameRef.current.value = '';
    descriptionRef.current.value = '';
    ACTRef.current.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 px-4 py-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow-md"
    >
      {/* To-Do Name */}
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input label="To Do Name" placeholder="Enter to-do name" isRequired ref={nameRef} id="toDoName" />
      </div>

      {/* To-Do Description */}
      <div>
        <Textarea
          id="toDoDescription"
          label="Description"
          placeholder="Enter to-do description"
          isRequired
          ref={descriptionRef}
          disableAnimation
          disableAutosize
          classNames={{
            base: "col-span-12 md:col-span-6 mb-6 md:mb-0",
            input: "resize-y min-h-[40px]",
          }}
        />
      </div>

      {/* Deadline Date and Time */}
      <div className="flex flex-col">
        <label
          htmlFor="toDoACT"
          className="block text-xs font-medium mb-2 text-gray-800 dark:text-gray-200"
        >
          Assumptive Completion Time:<span className="text-red-500"> *</span>
        </label>
        <input
          id="toDoACT"
          type="datetime-local"
          ref={ACTRef}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required
        />
      </div>

      {/* Submit Button */}
      <Button color="success" variant="solid" type="submit" size="sm" radius="full">
        Submit
      </Button>
    </form>
  );
};

export default AddNewItemForm;
