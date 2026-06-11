import toast from "react-hot-toast";

const AUTH_TOAST_ID = "auth-feedback";

export function showAuthToast(message, onAfterClose) {
  toast.dismiss(AUTH_TOAST_ID);
  toast.success(message, {
    id: AUTH_TOAST_ID,
    duration: 2500,
  });
  if (typeof onAfterClose === "function") {
    setTimeout(onAfterClose, 2600);
  }
}
