import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { FetchAdapter } from "../../infra/http/HttpClient";
import { TransactionGatewayHttp } from "../../infra/gateway/TransactionGateway";
import { CreateTransactionUsecase } from "../../application/usecase/Transaction/createTransaction";
import { Transaction } from "../../domain/Transaction";
import Title from "../../ui/components/Title";
import FormTransactions from "../../ui/components/FormTransactions";
import Loading from "../../ui/components/Loading";

const TransactionsCreate = () => {
  const httpClient = new FetchAdapter();
  const dashboardGateway = new TransactionGatewayHttp(httpClient);
  const createTransactionUsecase = new CreateTransactionUsecase(
    dashboardGateway,
  );

  const navigate = useNavigate();
  const { handleAlert } = useOutletContext<LayoutContextType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSaveTransaction = async (input: Transaction) => {
    setLoading(true);
    const { message } = await createTransactionUsecase.execute(input);
    handleAlert(message, "success");
    setLoading(false);
    navigate("/transactions");
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
