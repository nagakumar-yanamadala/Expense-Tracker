import { useSelector } from "react-redux";
function Home() {
  const totals = useSelector((state) => state.totals);

  const balanceNumber = totals.balance ;
  const balance = balanceNumber.toLocaleString("en-IN");
  const incomeNumber = totals.income ;
  const income = incomeNumber.toLocaleString("en-IN");
  const expenseNumber = totals.expense ;
  const expense = expenseNumber.toLocaleString("en-IN");


  return (
    <div className="d-flex flex-wrap">
      <div className="card m-2 px-4 py-3">
        <div className="card-item">total income this month</div>
        <strong className="card-item fs-1 text-center">₹ {income}</strong>
      </div>
      <div className="card m-2 px-4 py-3">
        <div className="card-item">total expense this month</div>
        <strong className="card-item fs-1 text-center">₹ {expense}</strong>
      </div>
      <div className="card m-2 px-4 py-3">
        <div className="card-item">total balance of all wallets</div>
        <strong className="card-item fs-1 text-center">₹ {balance}</strong>
      </div>
    </div>
  );
}

export default Home;
