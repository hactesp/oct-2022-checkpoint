import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IToastify {
  type: "success" | "error";
  position?:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  content: string | React.ReactElement;
}

const listToast = (props: IToastify) => {
  return {
    success: () => toast.success(props.content, { ...props }),
    error: () => toast.error(props.content, { ...props }),
  };
};

export const toastify = (props: IToastify): React.ReactText => {
  const {
    type,
    content,
    position = "top-right",
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = false,
    pauseOnFocusLoss = false,
    draggable = true,
  } = props;

  return listToast({
    type,
    content,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    pauseOnFocusLoss,
  })[type]();
};
