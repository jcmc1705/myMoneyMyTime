import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { TransactionProps } from "../types/transaction";
import Title from "../components/Title";
import FormTransactions from "../components/FormTransactions";
import Loading from "../components/Loading";

const TransactionsCreate = () => {
  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();

  const [loading, setLoading] = useState<boolean>(false);

  const saveTransaction = async ({
    description,
    value,
    transactionType,
  }: TransactionProps) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, value, transactionType }),
      });
      const res = await response.json();
      handleAlert(res.message, "success");
      setLoading(false);
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Title title="Adicionar" returnOption={true} redirectLink="/" />
      {loading ? <Loading /> : <FormTransactions action={saveTransaction} />}
    </div>
  );
};

export default TransactionsCreate;
