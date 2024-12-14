'use client'
import React, { useEffect } from 'react'
import AddNewItemForm from '@/components/addNewItem/addNewItemForm'
import { useSession } from "next-auth/react";
import { validateSession } from '@/utils/session';

const Page = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!validateSession(session, status)) {
      return; // Exit early if the session is invalid
    }
    console.log('Session is valid');
  }, [session, status]);

  return (
    <div className="flex flex-col items-center space-y-6 py-4 md:py-10">
      <h4 className="text-2xl font-bold dark:text-white text-center">
        Add New To Do Item
      </h4>
      {session &&
        <div className="w-full max-w-md">
          <AddNewItemForm />
        </div>
      }
    </div>

  )
}
export default Page