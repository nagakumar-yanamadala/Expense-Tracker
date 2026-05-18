import TransactionItem from "./TransactionItem";
import { useSelector } from "react-redux";
function History() {
  const transactions = useSelector((state)=>state.transactions);
  return (
    <>
      <center>
        <h1 className="text-center fw-bold m-4 text-dark">
          Transaction History
        </h1>
      </center>
      <ul className="list-group mt-3">
        {transactions.map((transaction) => (
          <TransactionItem transaction={transaction} key={transaction.Id} />
        ))}
      </ul>
    </>
  );
}

export default History;
