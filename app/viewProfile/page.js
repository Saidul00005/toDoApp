'use client'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile, selectUserProfileLoading, selectUserProfileError } from '@/app/redux/slices/userProfileSlice'
import { useSession } from "next-auth/react";
import { useEffect } from 'react'


const Loading = () => (
  <div className="flex flex-col items-center justify-center h-[50vh]">
    <p className="text-md md:text-lg font-normal text-gray-500 dark:text-gray-400">
      Loading your profile information...
    </p>
  </div>
)

const ErrorMessage = ({ error }) => (
  <div className="flex flex-col items-center justify-center h-[50vh]">
    <p className="text-md md:text-lg font-normal text-red-500">
      Error: {error}
    </p>
  </div>
)

const Page = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch()
  const profile = useSelector(selectUserProfile)
  const loading = useSelector(selectUserProfileLoading)
  const error = useSelector(selectUserProfileError)


  useEffect(() => {
    if (session) {
      dispatch(selectUserProfile());
    }
  }, [session, selectUserProfile, dispatch]);


  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }


  return (
    <>

    </>
  );
};

export default Page;
