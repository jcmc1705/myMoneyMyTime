import "./FormTransactions.css";
import { useState } from "react";
import { FormTransactionProps } from "../types/transaction";
const FormTransactions = ({ action, dataForm }: FormTransactionProps) => {
  const [description, setDescription] = useState<string>(
    dataForm ? dataForm.description : "",
  );
  const [value, setValue] = useState<string | number>(
    dataForm ? dataForm.value : "",
  );
  const [transactionType, setTransactionType] = useState<string>(
    dataForm ? dataForm.transactionType : "income",
  );

  const handleTransaction = () => {
    if (!description || !value || !transactionType)
      return alert("Preencha todos os campos!");
    action({
      description,
      value: +value,
      transactionType,
    });
  };

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
          onChange={(e) => setTransactionType(e.target.value)}
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
