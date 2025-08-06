import "./Cards.css";
import { CardsProps } from "../types/dashboard";
import Card from "./Card";

const Cards = ({ incomes, expenses, balance }: CardsProps) => {
  const balanceColor = (balance: number) => {
    const [firstString] = [...balance.toString()]
    return firstString === "-" ? "red" : "green";
  };

  return (
    <div className="container-cards">
      <Card title="Entrada:" value={incomes} color="green" />
      <Card title="Saída:" value={expenses} color="red" />
      <Card title="Saldo:" value={balance} color={balanceColor(balance)} />
    </div>
  );
};
export default Cards;
