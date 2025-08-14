import "./FormTransactions.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormTransactionProps, TransactionProps } from "../types/transaction";
import Loading from "./Loading";
const FormTransactions = ({
  action,
  idParams,
  dataForm,
}: FormTransactionProps) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState(dataForm.description);
  const [value, setValue] = useState<string | number>(dataForm.value);
  const [transactionType, setTransactionType] = useState<any>(
    dataForm.transactionType,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleTransaction = () => {
    if (!description || !value || !transactionType)
      return alert("Preencha todos os campos!");
    const transaction: TransactionProps = {
      description,
      value: +value,
      transactionType,
    };
    switch (action) {
      case "create":
        saveTransaction(transaction);
        break;
      case "edit":
        editTransaction(transaction);
        break;
    }
  };
  const saveTransaction = async ({
    description,
    value,
    transactionType,
  }: TransactionProps) => {
    try {
      setIsLoading(true);
      await fetch("http://localhost:3000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, value, transactionType }),
      });
      setIsLoading(false);
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  };
  const editTransaction = async ({
    description,
    value,
    transactionType,
  }: TransactionProps) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/transactions/${idParams}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, value, transactionType }),
        },
      );
      setIsLoading(false);
      await response.json();
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoading) return <Loading />;
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
