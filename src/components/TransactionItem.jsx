import "./Styles/TransactionItem.css";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionSlice";
import { useState } from "react";
import { iconMap } from "../store/iconMap";
import { incomeUpdate, expenseUpdate } from "../store/totalSlice";
import { updateWalletBalance } from "../store/walletSlice";

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const { Amount, isExpense, Date, Category, Wallet, Id } = transaction;

  const Icon = iconMap[Category?.icon] || null;

  function handleDelete(Id) {
    const amount = Number(Amount);

    if (isExpense) {
      dispatch(expenseUpdate(-amount));
      dispatch(
        updateWalletBalance({
          name: Wallet.name,
          amount: amount,
        }),
      );
    } else {
      dispatch(incomeUpdate(-amount));
      dispatch(
        updateWalletBalance({
          name: Wallet.name,
          amount: -amount,
        }),
      );
    }

    dispatch(deleteTransaction(Id));
  }

  return (
    <div className="card transaction-card">
      <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
        {/* Left Side: Icon & Meta Info */}
        <div className="d-flex align-items-center gap-3">
          <div
            className={`p-3 rounded-circle d-flex align-items-center justify-content-center bg-light ${
              isExpense ? "text-danger" : "text-success"
            }`}
            style={{ width: "50px", height: "50px" }}
          >
            {Icon ? <Icon size={22} /> : <span>💰</span>}
          </div>
          <div>
            <h6 className="mb-1 text-dark fw-semibold">
              {Category?.name || "Transaction"}
            </h6>
            <small className="text-muted d-block">{Date}</small>
          </div>
        </div>

        {/* Middle: Amount & Status Badge */}
        <div className="text-md-end">
          <div
            className={`fs-5 fw-bold mb-1 ${
              isExpense ? "text-danger" : "text-success"
            }`}
          >
            {isExpense ? "- " : "+ "}₹{Amount.toLocaleString("en-IN")}
          </div>
          <span
            className={`badge rounded-pill ${
              isExpense
                ? "bg-danger-subtle text-danger"
                : "bg-success-subtle text-success"
            }`}
          >
            {isExpense ? "Debited" : "Credited"}
          </span>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="d-flex gap-2 w-100 w-md-auto justify-content-end align-items-center">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
            onClick={() => {
              handleDelete(Id);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="card-footer card-details-footer px-4 py-3 animate-fade-in">
          <div className="row g-2">
            <div className="col-6 col-sm-4">
              <span className="text-muted d-block small">Category</span>
              <span className="fw-medium text-dark d-flex align-items-center gap-2">
                {Icon && <Icon size={16} className="text-muted" />}{" "}
                {Category?.name}
              </span>
            </div>
            <div className="col-6 col-sm-4">
              <span className="text-muted d-block small">Payment Method</span>
              <span className="fw-medium text-dark">💳 {Wallet?.name}</span>
            </div>
            <div className="col-12 col-sm-4">
              <span className="text-muted d-block small">Transaction ID</span>
              <span className="font-monospace small text-secondary">{Id}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
