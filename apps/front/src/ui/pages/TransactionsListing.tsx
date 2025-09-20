import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { FetchAdapter } from "../../infra/http/HttpClient";
import { TransactionGatewayHttp } from "../../infra/gateway/TransactionGateway";
import { GetAllTransactionsUsecase } from "../../application/usecase/Transaction/getAllTransactions";
import { DeleteTransactionUsecase } from "../../application/usecase/Transaction/deleteTransaction";
import { Transaction } from "../../domain/Transaction";
import Title from "../../ui/components/Title";
import TableTransactions from "../components/TableTransactions";
import Pagination from "../../ui/components/Pagination";
import Loading from "../../ui/components/Loading";

const TransactionsListing = () => {
  const httpClient = new FetchAdapter();
  const transactonGateway = new TransactionGatewayHttp(httpClient);
  const getAllTransactionsUsecase = new GetAllTransactionsUsecase(
    transactonGateway,
  );
  const deleteTransactionsUsecase = new DeleteTransactionUsecase(
    transactonGateway,
  );

  const { handleAlert } = useOutletContext<LayoutContextType>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  async function fetchTransactions() {
    try {
      const { data, totalPages } = await getAllTransactionsUsecase.execute(
        page,
        limit,
      );
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTransaction(transactionId: number) {
    try {
      setLoading(true);
      const { message } =
        await deleteTransactionsUsecase.execute(transactionId);
      handleAlert(message, "success");
      await fetchTransactions();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <div className="container-transactions">
      <Title
        title="Transações"
        returnOption={false}
        redirectLink="/transactions/create"
      />
      <TableTransactions
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default TransactionsListing;
