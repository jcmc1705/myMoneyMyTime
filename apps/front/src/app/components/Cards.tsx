import "./Cards.css";
import { CardsProps } from "../types/dashboard";
import Card from "./Card";

const Cards = ({ incomes, expenses, balance }: CardsProps) => {
  const balanceColor = (balance: number) => {
    const [firstString] = [...balance.toString()];
    return firstString === "-" ? "negative" : "positive";
  };

  return (
    <div className="container-cards">
      <Card title="Entrada:" value={incomes} color="positive" />
      <Card title="Saída:" value={expenses} color="negative" />
      <Card title="Saldo:" value={balance} color={balanceColor(balance)} />
    </div>
  );
};
export default Cards;
