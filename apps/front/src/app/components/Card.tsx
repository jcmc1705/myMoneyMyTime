import "./Card.css";
import { CardProps } from "../types/dashboard";

const Card = ({ title, value, color }: CardProps) => {
  let cssColor;
  if (color === "positive") cssColor = "#008000";
  if (color === "negative") cssColor = "#ff0000";
  return (
    <div className="cards-control">
      <div className="card-title">{title}</div>
      <div className="card-value" style={{ color: cssColor }}>
        R$ {value}
      </div>
    </div>
  );
};

export default Card;
