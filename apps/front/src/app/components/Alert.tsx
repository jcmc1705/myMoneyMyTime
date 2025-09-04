import { statusType } from "../app";
import "./Alert.css";

const Alert = ({ color, message }: { color: statusType; message: string }) => {
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
