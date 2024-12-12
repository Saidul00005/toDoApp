'use client';
import { createContext, useContext, useState } from 'react';
import ToastNotification from '@/components/toastMessage/toastNotification'; // Adjust the path if needed

// Toast Context
const ToastContext = createContext();

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: '' });
    }, 5000); // Automatically close after 5 seconds
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Render ToastNotification only when there's a message */}
      {toast.message && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook to use toast context
export const useToast = () => useContext(ToastContext);
