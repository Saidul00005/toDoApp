import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (

    <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-center">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li className='mr-2'>
              <Link href="/">Privacy Policy</Link>
            </li>

            <li className='mx-2'>
              <Link href="/">Licensing</Link>
            </li>
            <li className='ml-2'>
              <Link href="/">Contact</Link>
            </li>

          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © All Rights Reserved.</span>
      </div>
    </footer>


  )
}

export default Footer