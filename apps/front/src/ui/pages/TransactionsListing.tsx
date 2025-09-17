import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../app";
import { getAllTransactionsUsecase } from "../../application/transaction/getAllTransactions";
import { deleteTransactionUsecase } from "../../application/transaction/deleteTransaction";
import { Transaction } from "../../domain/transaction";
import Title from "../../ui/components/Title";
import TableTransactions from "../components/TableTransactions";
import Pagination from "../../ui/components/Pagination";
import Loading from "../../ui/components/Loading";

const TransactionsListing = () => {
  const { handleAlert } = useOutletContext<LayoutContextType>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllTransactionsUsecase(
      page,
      limit,
      setLoading,
      setTransactions,
      setTotalPages,
    );
  }, [page]);

  async function handleDeleteTransaction(transactionId: number) {
    await deleteTransactionUsecase(transactionId, setLoading, handleAlert);
    await getAllTransactionsUsecase(
      page,
      limit,
      setLoading,
      setTransactions,
      setTotalPages,
    );
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
