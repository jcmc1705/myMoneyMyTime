import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { TransactionProps } from "../types/transaction";
import Title from "../components/Title";
import FormTransactions from "../components/FormTransactions";
import Loading from "../components/Loading";

const TransactionsEdit = () => {
  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();

  const { id } = useParams();
  const [transaction, setTransaction] = useState<TransactionProps>({
    description: "",
    value: 0,
    transactionType: "income",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const updateTransaction = async ({
    description,
    value,
    transactionType,
  }: TransactionProps) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/transactions/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, value, transactionType }),
        },
      );
      setLoading(false);
      const res = await response.json();
      handleAlert(res.message, "success");
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      const url = `http://localhost:3000/api/transactions/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      setTransaction(data);
      setLoading(false);
    };
    fetchTransaction();
  }, []);

  return (
    <div>
      <Title title="Editar" returnOption={true} redirectLink="/" />
      {loading ? (
        <Loading />
      ) : (
        <FormTransactions action={updateTransaction} dataForm={transaction} />
      )}
    </div>
  );
};
export default TransactionsEdit;
