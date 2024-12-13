'use client'
import React, { useEffect } from 'react'
import ToDoItem from '@/components/toDoList/toDoItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToDos, selectToDos } from '@/app/redux/slices/toDoSlice'
import { Divider } from "@nextui-org/react";

const Page = () => {
  const dispatch = useDispatch()
  const toDos = useSelector(selectToDos)

  useEffect(() => {
    if (toDos.length === 0) {
      dispatch(fetchToDos())
    }
  }, [dispatch, toDos.length])

  const filteredToDos = toDos
    .filter((toDo) => toDo.toDoStatus === 'Pending')
    .sort((a, b) => new Date(a.toDoCreationDate) - new Date(b.toDoCreationDate))

  const groupedToDos = filteredToDos.reduce((groups, toDo) => {
    const date = new Date(toDo.toDoCreationDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(toDo);

    return groups;
  }, {});

  return (
    <>
      <div className='flex flex-col items-center justify-center mx-4 my-4'>
        <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-sky-400">To Do</span> Lists
        </h1>
        <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
          Venture through your tasks today, Dreams and goals to light the way.
        </p>
      </div>

      <div className="p-6">
        {Object.keys(groupedToDos).length > 0 ? (
          Object.keys(groupedToDos).map((date, index) => (
            <div key={index} className="pt-2">
              <Divider className="my-1" />
              <h5 className="text-xl font-semibold text-center">{date}</h5>
              <Divider className="my-1" />
              <div className="grid grid-cols-1 items-center justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {groupedToDos[date].map((toDo, index) => (
                  <ToDoItem
                    key={index}
                    id={toDo._id}
                    name={toDo.toDoName}
                    description={toDo.toDoDescription}
                    status={toDo.toDoStatus}
                    act={toDo.toDoACT}
                    creationDate={toDo.toDoCreationDate}
                    editionDate={toDo.toDoEditionDate}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
              No pending to-do available.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
