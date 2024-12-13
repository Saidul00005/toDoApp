'use client';

import { useDispatch } from 'react-redux';
import { addToDo } from '@/app/redux/slices/toDoSlice';
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useRouter } from "next/navigation";
import { useToast } from '@/components/toastMessage/toastContext';

const AddNewItemForm = () => {
  const { status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const { showToast } = useToast();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ criteriaMode: "all" });

  const onSubmit = async (data) => {
    const toDoItemData = {
      toDoName: data.toDoName,
      toDoDescription: data.toDoDescription,
      toDoACT: data.toDoACT,
      toDoStatus: 'Pending',
      toDoCreationDate: new Date().toISOString(),
    };


    try {
      dispatch(addToDo(toDoItemData));
      reset();
      router.push("/toDoList");
      showToast('Item added.', 'success');
    } catch (error) {
      showToast('Failed. Please try again.', 'error');
      // alert("Failed to add to-do");
    }
  };

  return (
    <>
      {status === 'authenticated' ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 px-4 py-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow-md"
        >
          {/* To-Do Name */}
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              label="To Do Name"
              placeholder="Enter to-do name"
              isRequired
              variant='bordered'
              autoFocus
              {...register("toDoName", {
                required: "To-Do Name is required",
                minLength: { value: 3, message: "To-do name must be at least 3 characters long" },
                maxLength: { value: 100, message: "To-do name must not exceed 100 characters" }
              })}
              id="toDoName"
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

          {/* To-Do Description */}
          <div>
            <Textarea
              id="toDoDescription"
              label="Description"
              placeholder="Enter to-do description"
              isRequired
              variant='bordered'
              {...register("toDoDescription", {
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters long" },
                maxLength: { value: 500, message: "Description must not exceed 500 characters" }
              })}
              disableAnimation
              disableAutosize
              classNames={{
                base: "col-span-12 md:col-span-6 mb-6 md:mb-0",
                input: "resize-y min-h-[40px]",
              }}
            />
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

          {/* Deadline Date and Time */}
          <div className="flex flex-col">
            {/* <label
              htmlFor="toDoACT"
              className="block text-xs font-medium mb-2 text-gray-800 dark:text-gray-200"
            >
              Assumptive Completion Time:<span className="text-red-500"> *</span>
            </label> */}
            <Input
              id="toDoACT"
              type="datetime-local"
              isRequired
              variant='bordered'
              label='Assumptive Completion Time:'
              labelPlacement='outside'
              placeholder='a'
              size='sm'
              {...register("toDoACT", {
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
              })}
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

          {/* Submit Button */}
          <Button color="success" variant="solid" type="submit" size="sm" radius="full" isLoading={isSubmitting}>
            Submit
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
            Kindly sign in.
          </p>
        </div>
      )}
    </>
  );

};

export default AddNewItemForm;
