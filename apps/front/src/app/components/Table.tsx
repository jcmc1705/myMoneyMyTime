import "./Table.css";
import { Link } from "react-router-dom";
import { TransactionProps } from "../types/transaction";

type TableProps = {
  data: TransactionProps[];
  onDelete: (id: number) => void;
};

const Table = ({ data, onDelete }: TableProps) => {
  return (
    <table>
      <tr>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
      {data.map(({ id, description, transactionType, value }) => (
        <tr key={id} className="transaction-control">
          <td>{description}</td>
          <td className={transactionType}>R$ {value.toFixed(2)}</td>
          <td className="btn">
            <Link to={`/transactions/edit/${id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => onDelete(id)}>Excluir</button>
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Table;
