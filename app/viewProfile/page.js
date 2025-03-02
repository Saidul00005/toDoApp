'use client'

import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile, selectUserProfileLoading, selectUserProfileError, fetchUserProfile } from '@/app/redux/slices/userProfileSlice'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react"
import UpdateProfileForm from '@/components/viewProfile/UpdateProfileForm'
import { useRouter } from "next/navigation"


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
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/")
    },
  })
  const dispatch = useDispatch()
  const profile = useSelector(selectUserProfile)
  const loading = useSelector(selectUserProfileLoading)
  const error = useSelector(selectUserProfileError)

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [status, dispatch, profile])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md" isBlurred>
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-xl font-bold">User Profile</h1>
          {!isEditing && (
            <div className='flex gap-2'>
              <Button color="primary" variant='flat' size='sm' onPress={() => setIsEditing(true)}>
                Update Profile
              </Button>
            </div>
          )}
        </CardHeader>
        <CardBody>
          {!isEditing ? (
            <div className="text-md space-y-4">
              <p className='text-sm'><strong>Name: </strong>{profile.name}</p>
              <p className='text-sm'><strong>Email: </strong>{profile.userEmail}</p>
              <p className='text-sm'><strong>City: </strong>{profile.city}</p>
              <p className='text-sm'><strong>Country: </strong>{profile.country}</p>
            </div>
          ) : (
            <UpdateProfileForm profile={profile} setIsEditing={setIsEditing} />
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default Page

