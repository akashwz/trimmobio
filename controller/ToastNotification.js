// ToastNotification.js
import { toast } from 'react-hot-toast';

const ToastNotification = {
  success: (message = 'Success!', options = {}) =>
    toast.success(message, { ...options }),
    
  error: (message = 'Something went wrong!', options = {}) =>
    toast.error(message, { ...options }),
    
  info: (message = 'Heads up!', options = {}) =>
    toast(message, { ...options }),

  custom: (content, options = {}) =>
    toast.custom(content, { ...options }),
  
  promise: (promise, messages = {}, options = {}) => {
    const { loading = 'Loading...', success = 'Success!', error = 'An error occurred!' } = messages;
    return toast.promise(promise, { 
      loading, 
      success, 
      error 
    }, options);
  },
};

export default ToastNotification;