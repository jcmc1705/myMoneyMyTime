import "./Card.css";

type CardProps = {
  title: string;
  value: number;
  color: "positive" | "negative" | null;
};

const Card = ({ title, value, color }: CardProps) => {
  let cssColor;
  if (color === "positive") cssColor = "#008000";
  else if (color === "negative") cssColor = "#ff0000";
  else cssColor = "#ff0000";
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
