import { colorType } from "../app";
import "./Alert.css";

const Alert = ({ color, message }: { color: colorType; message: string }) => {
  let backgroundColor;
  if (color === "success") backgroundColor = "#008000";
  if (color === "error") backgroundColor = "#ff0000";
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
