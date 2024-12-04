"use client"

import {
  Id,
  toast,
  ToastContainer,
  ToastContent,
  ToastOptions,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning" | "default";

const showToast = (type: ToastType, content: ToastContent) => {
  switch (type) {
    case "success":
      return toast.success(content, {
        position: "bottom-right",
      });
    case "error":
      return toast.error(content, {
        position: "bottom-right",
      });
  }
};

export { showToast };
