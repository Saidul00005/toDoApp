'use client';

import { useRef } from 'react';

const AddNewItemForm = () => {

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
    }

    try {

      const response = await fetch('/api/addToDo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toDoItemData),
      });

      if (!response.ok) {
        throw new Error('Failed to add to-do item');
      }

      nameRef.current.value = '';
      descriptionRef.current.value = '';
      ACTRef.current.value = '';
    } catch (error) {
      console.error('Error adding to-do item:', error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 px-4 py-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow-md"
    >
      {/* To-Do Name */}
      <div>
        <label
          htmlFor="toDoName"
          className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
        >
          To Do Name:<span className="text-red-500">*</span>
        </label>
        <input
          id="toDoName"
          type="text"
          ref={nameRef}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Enter to-do name"
          required
        />
      </div>

      {/* To-Do Description */}
      <div>
        <label
          htmlFor="toDoDescription"
          className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
        >
          To Do Description:<span className="text-red-500">*</span>
        </label>
        <textarea
          id="toDoDescription"
          ref={descriptionRef}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Enter to-do description"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Deadline Date and Time */}
      <div>
        <label
          htmlFor="toDoACT"
          className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
        >
          Assumptive completion time:<span className="text-red-500">*</span>
        </label>
        <input
          id="toDoACT"
          type="datetime-local"
          ref={ACTRef}
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddNewItemForm;
