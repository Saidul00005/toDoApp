'use client'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserProfile, selectUserProfileLoading, selectUserProfileError } from '@/app/redux/slices/userProfileSlice'
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, Spinner } from "@nextui-org/react";


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


  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    password: ''
  })

  useEffect(() => {
    if (session) {
      dispatch(selectUserProfile());
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData(prevState => ({
        ...prevState,
        name: profile.name || '',
        city: profile.city || '',
        country: profile.country || ''
      }))
    }
  }, [profile])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile({ ...formData, email: profile.email }))
    setIsEditing(false)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">User Profile</h1>
            {!isEditing && (
              <Button color="primary" onPress={() => setIsEditing(true)}>
                Update Profile
              </Button>
            )}
          </CardHeader>
          <CardBody>
            {!isEditing ? (
              <div className="space-y-4">
                <p><strong>Name:</strong> </p>
                <p><strong>Email:</strong> </p>
                <p><strong>City:</strong> </p>
                <p><strong>Country:</strong> </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button color="danger" onPress={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>

    </>
  );
};

export default Page;
