import "./FormTransactions.css";
import { useState } from "react";
import { Transaction } from "../../domain/transaction";

type FormTransactionProps = {
  action: (transaction: Transaction) => void;
  data?: Transaction;
};

const FormTransactions = ({ action, data }: FormTransactionProps) => {
  const [description, setDescription] = useState<string>(
    data ? data.description : "",
  );
  const [value, setValue] = useState<string | number>(data ? data.value : "");
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    data ? data.transactionType : "income",
  );

  async function handleTransaction() {
    if (!description || !value || !transactionType)
      return alert("Preencha todos os campos!");
    action({
      description,
      value: +value,
      transactionType,
    });
  }

  async function handleTransactionType(value: string) {
    if (value === "income" || value === "expense") {
      setTransactionType(value);
    }
  }

  return (
    <div className="form-transaction">
      <form>
        <label>Descrição</label>
        <input
          type="text"
          id="description"
          placeholder="Digite a descrição"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Valor</label>
        <input
          type="number"
          id="value"
          placeholder="Digite o valor"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label>Tipo de transação</label>
        <select
          name="transactionType"
          id="transactionType"
          required
          value={transactionType}
          onChange={(e) => handleTransactionType(e.target.value)}
        >
          <option value="income">Entrada</option>
          <option value="expense">Saída</option>
        </select>
        <button onClick={handleTransaction}>Salvar</button>
      </form>
    </div>
  );
};
export default FormTransactions;
