'use client';

import { useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editToDo, selectToDos, fetchToDos } from '@/app/redux/slices/toDoSlice'
import { redirect } from 'next/navigation'

// Initial state for the reducer
const initialFormState = {
  toDoName: '',
  toDoDescription: '',
  toDoACT: '',
};

// Reducer function
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

const EditToDoForm = ({ id }) => {
  const toDos = useSelector(selectToDos);
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    if (toDos.length === 0) {
      dispatch(fetchToDos());
    }
  }, [dispatch, toDos.length]);

  const toDoItem = toDos.find((item) => item._id === id);

  useEffect(() => {
    if (toDoItem) {
      formDispatch({
        type: 'SET_FORM',
        payload: {
          toDoName: toDoItem.toDoName || '',
          toDoDescription: toDoItem.toDoDescription || '',
          toDoACT: new Date(toDoItem.toDoACT).toISOString().slice(0, 16) || '',
        },
      });
    }
  }, [toDoItem]);

  if (!toDoItem) {
    return <div>To-Do item not found</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedToDo = {
      toDoName: formState.toDoName,
      toDoDescription: formState.toDoDescription,
      toDoACT: formState.toDoACT,
      toDoStatus: "Pending",
      toDoCreationDate: toDoItem.toDoCreationDate,
      toDoEditionDate: new Date().toISOString(),
    };

    await dispatch(editToDo({ id, updatedToDo })).unwrap();
    alert('To-Do updated successfully!');
    redirect('/toDoList')
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
          value={formState.toDoName}
          onChange={(e) =>
            formDispatch({ type: 'SET_FIELD', field: 'toDoName', value: e.target.value })
          }
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
          value={formState.toDoDescription}
          onChange={(e) =>
            formDispatch({ type: 'SET_FIELD', field: 'toDoDescription', value: e.target.value })
          }
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
          value={formState.toDoACT}
          onChange={(e) =>
            formDispatch({ type: 'SET_FIELD', field: 'toDoACT', value: e.target.value })
          }
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        Edit
      </button>
    </form>
  );
};

export default EditToDoForm;
