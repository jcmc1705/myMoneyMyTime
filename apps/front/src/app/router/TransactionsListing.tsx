import { useState, useEffect } from "react";

import Table from "../components/Table";
import Title from "../components/Title";
import Loading from "../components/Loading";

interface DataItem {
  id: number;
  value: number;
  description: string;
  typeTransaction: string;
  dateTime: string;
}

const TransactionsListing = () => {
  const url = "http://127.0.0.1:3000/api/transactions";

  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(url);
        const response: DataItem[] = await res.json();
        setData(response);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  if (data.length === 0) return <Loading />;

  return (
    <div className="container-transactions">
      <Title
        title="Transações"
        returnOption={false}
        redirectLink="/transactions/create"
      />
      <Table data={data} />
    </div>
  );
};

export default TransactionsListing;
