import "./Alert.css";
import { StatusType } from "../app";

const Alert = ({ color, message }: { color: StatusType; message: string }) => {
  let backgroundColor;
  if (color === "success") backgroundColor = "#008000";
  else if (color === "error") backgroundColor = "#ff0000";
  else backgroundColor = "#cccccc";
  return (
    <div
      className="container-alert"
      style={{ backgroundColor: backgroundColor }}
    >
      <span>{message}</span>
    </div>
  );
};

export default Alert;
