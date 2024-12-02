'use client'
import React, { useEffect, useState } from 'react'
import ToDoItem from '@/components/toDoList/toDoItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToDos, selectToDos } from '@/app/redux/slices/toDoSlice'

const page = () => {
  const dispatch = useDispatch()
  const toDos = useSelector(selectToDos)

  useEffect(() => {
    if (toDos.length === 0) {
      dispatch(fetchToDos())
    }
  }, [dispatch, toDos.length])

  //console.log("Fetched ToDos: ", toDos);

  return (
    <>
      <h4 className="text-2xl font-bold dark:text-white text-center py-6">
        To Do List
      </h4>

      <div className="grid grid-cols-1 items-center justify-items-center p-6 ali md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {toDos && toDos.length > 0 ? (
          toDos.map((toDo, index) => (
            <ToDoItem
              key={index}
              id={toDo._id}
              name={toDo.toDoName}
              description={toDo.toDoDescription}
              status={toDo.toDoStatus}
              act={toDo.toDoACT}
              creationDate={toDo.toDoCreationDate}
            />
          )
          )) : (
          <p>No todo available.</p>

        )
        }
      </div >
    </>
  )
}

export default page