'use client'

import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile, selectUserProfileLoading, selectUserProfileError, fetchUserProfile, updateUserProfile } from '@/app/redux/slices/userProfileSlice'
import { useSession, signOut } from "next-auth/react"
import { useEffect } from 'react'
import { Card, CardBody, CardHeader, Button, Input } from "@nextui-org/react"
import { useForm, Controller } from "react-hook-form"
import { useToast } from '@/components/toastMessage/toastContext';

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
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const profile = useSelector(selectUserProfile)
  const loading = useSelector(selectUserProfileLoading)
  const error = useSelector(selectUserProfileError)
  const { showToast } = useToast();

  const { control, handleSubmit, setValue, watch, isSubmitting } = useForm({
    defaultValues: {
      name: '',
      city: '',
      country: '',
      password: ''
    }
  })

  const isEditing = watch('isEditing')

  useEffect(() => {
    if (session && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [session, dispatch, profile])

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('city', profile.city || '')
      setValue('country', profile.country || '')
    }
  }, [profile, setValue])

  const onSubmit = (data) => {
    const { isEditing, ...updatedData } = data;
    const updatedUserProfile = { ...updatedData };
    dispatch(updateUserProfile(updatedUserProfile))
    setValue('isEditing', false)
    setValue('password', '')
    showToast("Profile Updated", 'success')
  }

  const handleCancel = () => {
    setValue('isEditing', false)
    setValue('password', '') // Reset password field
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };


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
          <h1 className="text-2xl font-bold">User Profile</h1>
          {!isEditing && (
            <div className='flex gap-2'>
              <Button color="primary" variant='flat' size='md' onPress={() => setValue('isEditing', true)}>
                Update Profile
              </Button>
              <Button color="danger" variant='flat' size='md' onPress={handleSignOut}>
                Sign Out
              </Button>
            </div>
          )}
        </CardHeader>
        <CardBody>
          {!isEditing ? (
            <div className="text-md space-y-4">
              <p><strong>Name: </strong>{profile.name}</p>
              <p><strong>Email: </strong>{profile.userEmail}</p>
              <p><strong>City: </strong>{profile.city}</p>
              <p><strong>Country: </strong>{profile.country}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="Name"
                    errorMessage={error?.message}
                    isInvalid={!!error}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="City"
                    errorMessage={error?.message}
                    isInvalid={!!error}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    label="Country"
                    errorMessage={error?.message}
                    isInvalid={!!error}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    errorMessage={error?.message}
                    isInvalid={!!error}
                  />
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button color="danger" onPress={handleCancel}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

export default Page

