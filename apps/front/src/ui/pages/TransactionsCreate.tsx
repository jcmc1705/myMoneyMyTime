import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { createTransactionUsecase } from "../../application/transaction/createTransaction";
import { Transaction } from "../../domain/transaction";
import Title from "../../ui/components/Title";
import FormTransactions from "../../ui/components/FormTransactions";
import Loading from "../../ui/components/Loading";

const TransactionsCreate = () => {
  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveTransaction = async (transaction: Transaction) => {
    await createTransactionUsecase(
      transaction,
      setLoading,
      handleAlert,
      navigate,
    );
  };

  return (
    <div>
      <Title title="Adicionar" returnOption={true} redirectLink="/" />
      {loading ? (
        <Loading />
      ) : (
        <FormTransactions action={handleSaveTransaction} />
      )}
    </div>
  );
};

export default TransactionsCreate;
