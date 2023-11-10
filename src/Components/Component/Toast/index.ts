import { toast } from "react-toastify";
import {ToastVariant} from './interfaces'
import 'react-toastify/dist/ReactToastify.css';

 const showToast = (
  message: string,
  type:  ToastVariant ='info',
) => {
  const style: object = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  console.log(message,"message====")
  let toastElement;
  switch (type) {
    case "success":
      toastElement = toast.success(message, style);
      break;
    case "error":
      toastElement = toast.error(message, style);
      break;
    case "info":
      toastElement = toast.info(message, style);
      break;
    default:
      toastElement = toast(message, style);
      break;
  }
console.log(toastElement,"toastElement")
  return toastElement;
};

export {showToast}