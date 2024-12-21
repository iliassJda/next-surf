"use client";

import { toast, ToastContent } from "react-toastify";

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

const doToast = (response: any) => {
  if (response.toast == "success") {
    showToast("success", response.message);
  } else {
    showToast("error", response.message);
  }
};

export { doToast, showToast };
