import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:px-20 py-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Developer™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="/" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/" className="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
          <Link href="/" className="hover:underline">Contact</Link>
        </li>
      </ul>
    </footer>

  );
};

export default Footer;