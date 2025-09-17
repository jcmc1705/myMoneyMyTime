import "./Cards.css";
import Card from "./Card";
import { Dashboad } from "../../domain/dashboard";

const Cards = ({ incomes, expenses, balance }: Dashboad) => {
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
