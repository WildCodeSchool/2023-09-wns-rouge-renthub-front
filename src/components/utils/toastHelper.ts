import toast from "react-hot-toast";
import { toastStyles } from "@/styles/toastConfig";

export const showToast = (type: string, message: string) => {
  const config = toastStyles[type] || {};
  toast(message, config);
};
