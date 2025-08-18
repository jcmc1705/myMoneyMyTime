import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import Table from "../components/Table";
import Title from "../components/Title";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { TransactionProps } from "../types/transaction";
import { LayoutContextType } from "../app";

const TransactionsListing = () => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const { handleAlert } = useOutletContext<LayoutContextType>();

  async function getData() {
    try {
      setLoading(true);
      const url = `http://localhost:3000/api/transactions/?page=${page}&limit=${limit}`;
      const res = await fetch(url);
      const response = await res.json();
      setTransactions(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTransaction(transactionId: number | undefined) {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/transactions/${transactionId}`,
        {
          method: "DELETE",
        },
      );
      const responseJson = await response.json();
      getData();
      handleAlert(responseJson.message, "success");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="container-transactions">
      <Title
        title="Transações"
        returnOption={false}
        redirectLink="/transactions/create"
      />
      <Table data={transactions} onDelete={deleteTransaction} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default TransactionsListing;
