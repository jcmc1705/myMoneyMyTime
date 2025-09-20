import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { FetchAdapter } from "../../infra/http/HttpClient";
import { TransactionGatewayHttp } from "../../infra/gateway/TransactionGateway";
import { GetTransactionUsecase } from "../../application/usecase/Transaction/getTransaction";
import { UpdateTransactionUsecase } from "../../application/usecase/Transaction/updateTransaction";
import { Transaction } from "../../domain/Transaction";
import Title from "../../ui/components/Title";
import FormTransactions from "../../ui/components/FormTransactions";
import Loading from "../../ui/components/Loading";

const TransactionsEdit = () => {
  const httpClient = new FetchAdapter();
  const transactionGateway = new TransactionGatewayHttp(httpClient);
  const getTransactionUsecase = new GetTransactionUsecase(transactionGateway);
  const updateTransactionUsecase = new UpdateTransactionUsecase(
    transactionGateway,
  );

  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();
  const { transactionId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState<Transaction>({
    description: "",
    value: 0,
    transactionType: "income",
  });

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const transaction = await getTransactionUsecase.execute(
          Number(transactionId),
        );
        setTransaction(transaction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransaction();
  }, []);

  async function handleUpdateTransaction(transaction: Transaction) {
    setLoading(true);
    try {
      const { message } = await updateTransactionUsecase.execute(
        Number(transactionId),
        transaction,
      );
      handleAlert(message, "success");
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
