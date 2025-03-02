import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '@/app/redux/slices/userProfileSlice'
import { Button, Input } from "@nextui-org/react"
import { useForm, Controller } from "react-hook-form"
import { useToast } from '@/components/toastMessage/toastContext';
import { ErrorMessage } from "@hookform/error-message"
import { useSession } from "next-auth/react"

const UpdateProfileForm = ({ profile, setIsEditing }) => {
  const { status } = useSession()
  const dispatch = useDispatch()
  const { showToast } = useToast();

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    criteriaMode: "all",
    defaultValues: {
      name: '',
      city: '',
      country: '',
      password: ''
    }
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('city', profile.city || '')
      setValue('country', profile.country || '')
    }
  }, [profile, setValue])

  const onSubmit = (data) => {
    if (status !== "authenticated") {
      showToast("Please log in to update profile.", "error");
      return;
    }

    const { isEditing, ...updatedData } = data;
    const updatedUserProfile = { ...updatedData };
    dispatch(updateUserProfile(updatedUserProfile))
    setIsEditing(false)
    setValue('password', '')
    showToast("Profile Updated", 'success')
  }

  const handleCancel = () => {
    setIsEditing(false)
    setValue('password', '') // Reset password field
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Name is required",
          minLength: { value: 2, message: "Name must be at least 2 characters" },
          maxLength: { value: 50, message: "Name cannot exceed 50 characters" }
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              label="Name"
            />
            <ErrorMessage
              errors={errors}
              name="name"
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
          </>
        )}

      />
      <Controller
        name="city"
        control={control}
        rules={{
          required: "City is required",
          minLength: { value: 2, message: "City must be at least 2 characters" },
          maxLength: { value: 100, message: "City name cannot exceed 100 characters" }
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              label="City"
            />
            <ErrorMessage
              errors={errors}
              name="city"
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
          </>
        )}
      />
      <Controller
        name="country"
        control={control}
        rules={{
          required: "Country is required",
          minLength: { value: 2, message: "Country must be at least 2 characters long" },
          maxLength: { value: 100, message: "Country name cannot exceed 100 characters" }
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              label="Country"
            />
            <ErrorMessage
              errors={errors}
              name="country"
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
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: { value: 8, message: "Password is 8 characters long" }
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              type="password"
              label="Password"
            />
            <ErrorMessage
              errors={errors}
              name="password"
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
          </>
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
  )
}

export default UpdateProfileForm