import "./TableTransactions.css";
import { Link } from "react-router-dom";
import { Transaction } from "../../domain/transaction";

type TableTransactionsProps = {
  transactions: Transaction[];
  onDelete: (transactionId: number) => void;
};

const TableTransactions = ({
  transactions,
  onDelete,
}: TableTransactionsProps) => {
  return (
    <table>
      <tr>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
      {transactions.map(({ id, description, transactionType, value }) => (
        <tr key={id} className="transaction-control">
          <td>{description}</td>
          <td className={transactionType}>R$ {value.toFixed(2)}</td>
          <td className="btn">
            <Link to={`/transactions/edit/${id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => onDelete(Number(id))}>Excluir</button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableTransactions;
