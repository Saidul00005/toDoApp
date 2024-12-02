import EditToDoForm from '@/components/editToDo/editToDoForm'
import React from 'react'

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center space-y-6 py-4 md:py-10">
      <h4 className="text-2xl font-bold dark:text-white text-center">
        Update To Do item
      </h4>

      <div className="w-full max-w-md">
        <EditToDoForm id={id} />
      </div>
    </div>
  )
}

export default page