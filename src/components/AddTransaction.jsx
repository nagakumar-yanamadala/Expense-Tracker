import styles from "./Styles/AddTransaction.module.css";
import { Form } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { useRef, useState } from "react";

import { addTransaction } from "../store/transactionSlice";

import { incomeUpdate, expenseUpdate } from "../store/totalSlice";

import { updateWalletBalance } from "../store/walletSlice";

import { iconMap } from "../store/iconMap";
import CustomAlert from "./CustomAlert";

const AddTransaction = () => {
  const wallets = useSelector((state) => state.wallets);

  const categories = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const [isExpense, setIsExpense] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const selectedWallet = useRef();

  const amount = useRef();

  const date = useRef();

  function showAlert(type, title, message) {
    setAlertData({
      isOpen: true,
      type,
      title,
      message,
    });
  }

  function postTransaction(e) {
    e.preventDefault();

    const WalletName = selectedWallet.current.value;

    const Wallet = wallets.find((wallet) => wallet.name === WalletName);

    const Category = categories.find(
      (category) => category.name === selectedCategory.name,
    );

    const Amount = Number(amount.current.value);

    if (!Amount || Amount <= 0) {
      showAlert(
        "error",
        "Invalid Amount",
        "Please enter a valid transaction amount.",
      );
      return;
    }

    if (!date.current.value) {
      showAlert("error", "Date Required", "Please select a transaction date.");
      return;
    }

    // check wallet balance BEFORE transaction
    if (isExpense && Amount > Wallet.balance) {
      showAlert(
        "error",
        "Transaction Failed",
        "This wallet doesn't have sufficient balance.",
      );
      return;
    }

    const str = date.current.value;

    const [year, month, day] = str.split("-");

    const Date = `${day}-${month}-${year}`;

    dispatch(
      addTransaction({
        Amount,
        isExpense,
        Date,
        Category,
        Wallet,
      }),
    );

    // totals
    if (isExpense) {
      dispatch(expenseUpdate(Amount));
    } else {
      dispatch(incomeUpdate(Amount));
    }

    // wallet balance
    dispatch(
      updateWalletBalance({
        name: Wallet.name,
        amount: isExpense ? -Amount : Amount,
      }),
    );

    // clear fields
    amount.current.value = "";
    date.current.value = "";

    showAlert(
      "success",
      "Transaction Added",
      `${isExpense ? "Expense" : "Income"} added successfully to ${Wallet.name}.`,
    );
  }

  const SelectedIcon = iconMap[selectedCategory.icon];

  return (
    <div className={styles.container}>
      <CustomAlert
        isOpen={alertData.isOpen}
        type={alertData.type}
        title={alertData.title}
        message={alertData.message}
        onClose={() =>
          setAlertData({
            ...alertData,
            isOpen: false,
          })
        }
      />

      <Form className="container" onSubmit={postTransaction}>
        <div className={`row ${styles.row1}`}>
          <div className="col">
            <label htmlFor="inputAmount" className="form-label">
              Amount in ₹
            </label>

            <input
              type="number"
              className="form-control"
              id="inputAmount"
              style={{ cursor: "pointer" }}
              ref={amount}
            />
          </div>

          <div className={`col ${styles.radio}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="transactionType"
                checked={isExpense}
                onChange={() => setIsExpense(true)}
                id="expense"
              />

              <label className="form-check-label" htmlFor="expense">
                Expense
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="transactionType"
                checked={!isExpense}
                onChange={() => setIsExpense(false)}
                id="income"
              />

              <label className="form-check-label" htmlFor="income">
                Income
              </label>
            </div>
          </div>

          <div className="col">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>

            <input
              type="date"
              className="form-control"
              id="date"
              ref={date}
              style={{ cursor: "pointer" }}
              required
            />
          </div>
        </div>

        <div className={`row ${styles.row1}`}>
          <div className="col">
            <label htmlFor="category" className="form-label">
              Select Category
            </label>

            <div className="dropdown-center" style={{ width: "100%" }}>
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <SelectedIcon
                  style={{
                    fontSize: "20px",
                  }}
                />

                <span
                  style={{
                    fontSize: "15px",
                    margin: "0 10px",
                  }}
                >
                  {selectedCategory.name}
                </span>
              </button>

              <ul className="dropdown-menu" style={{ width: "100%" }}>
                {categories.map((category) => {
                  const Icon = iconMap[category.icon];

                  return (
                    <li
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <Icon
                        style={{
                          fontSize: "20px",
                          marginRight: "20px",
                        }}
                      />

                      <span
                        style={{
                          fontSize: "15px",
                          cursor: "pointer",
                        }}
                      >
                        {category.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="col">
            <label htmlFor="wallet" className="form-label">
              Select Wallet
            </label>

            <select
              id="wallet"
              className="form-select"
              ref={selectedWallet}
              style={{ cursor: "pointer" }}
            >
              {wallets.map((wallet) => (
                <option key={wallet.name} value={wallet.name}>
                  {wallet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">
            Add Transaction
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddTransaction;