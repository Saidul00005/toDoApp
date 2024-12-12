'use client';

import { useEffect } from 'react';

const ToastNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Close toast after 4 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message, onClose]);

  return (
    message && (
      <div
        className={`fixed bottom-5 right-3 z-50 max-w-[90%] w-auto p-2 rounded-lg shadow-lg text-white flex items-center 
          ${type === 'error' ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600' :
            type === 'success' ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600' :
              'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'} 
          transform transition-all duration-300`}
        style={{
          wordBreak: "break-word",
          minHeight: "50px", // Ensures it remains compact
        }}
      >
        <div className="mr-2">
          {type === 'error' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 text-xs sm:text-sm font-medium">{message}</div>
        <button
          onClick={onClose}
          className="ml-2 text-lg text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default ToastNotification;
