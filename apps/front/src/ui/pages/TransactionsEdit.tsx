import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { getTransactionUsecase } from "../../application/transaction/getTransaction";
import { updateTransactionUsecase } from "../../application/transaction/updateTransaction";
import { Transaction } from "../../domain/transaction";
import Title from "../../ui/components/Title";
import FormTransactions from "../../ui/components/FormTransactions";
import Loading from "../../ui/components/Loading";

const TransactionsEdit = () => {
  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();
  const { transactionId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction>({
    description: "",
    value: 0,
    transactionType: "income",
  });

  useEffect(() => {
    getTransactionUsecase(Number(transactionId), setTransaction, setLoading);
  }, []);

  async function handleUpdateTransaction(transaction: Transaction) {
    await updateTransactionUsecase(
      Number(transactionId),
      transaction,
      setLoading,
      handleAlert,
      navigate,
    );
  }

  return (
    <div>
      <Title title="Editar" returnOption={true} redirectLink="/" />
      {loading ? (
        <Loading />
      ) : (
        <FormTransactions action={handleUpdateTransaction} data={transaction} />
      )}
    </div>
  );
};
export default TransactionsEdit;
