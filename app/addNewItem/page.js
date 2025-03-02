'use client'
import AddNewItemForm from '@/components/addNewItem/addNewItemForm'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";


const Page = () => {
  const router = useRouter()
  const { } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/")
    },
  })

  return (
    <div className="flex flex-col items-center space-y-6 py-4 md:py-10">
      <h4 className="text-2xl font-bold dark:text-white text-center">
        Add New To Do Item
      </h4>
      <div className="w-full max-w-md">
        <AddNewItemForm />
      </div>
    </div>

  )
}
export default Page