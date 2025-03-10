import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../store/slices/toastSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((store) => store.toast.toast); // Get the current toast

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(clearToast()); // Clear the toast after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [toast, dispatch]);

  if (!toast) return null; // Don't render if there's no toast

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${getToastStyles()} animate-slide-in`}
    >
      {toast.message}
    </div>
  );
};

export default Toast;
