import { Toast, configureToasts, deleteAllToasts } from "toaster-js";
import "toaster-js/default.scss";

const getNotification = (msg, type, time) => {
  configureToasts({
    topOrigin: -600,
    deleteDelay: 300,
  });
  deleteAllToasts();
  const notification = new Toast(msg, type, time);
  return notification;
};

export { getNotification };
