import styles from "./Styles/AddTransaction.module.css";

import { useSelector, useDispatch } from "react-redux";

import { useRef, useState } from "react";

import { addTransaction } from "../store/transactionSlice";

import {incomeUpdate,expenseUpdate} from '../store/totalSlice';

import { iconMap } from "../store/iconMap";

const AddTransaction = () => {
  const wallets = useSelector((state) => state.wallets);

  const totals = useSelector((state) => state.totals);

  const categories = useSelector((state) => state.categories);

  const [isExpense, setIsExpense] = useState(true);

  const selectedWallet = useRef();

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const amount = useRef();

  const date = useRef();

  const dispatch = useDispatch();

  function postTransaction(e) {
    e.preventDefault();

    const Wallet = selectedWallet.current.value;

    const str = date.current.value;

    const [year, month, day] = str.split("-");

    const Date = `${day}-${month}-${year}`;

    const Amount = amount.current.value;

    dispatch(
      addTransaction({
        Amount,
        isExpense,
        Date,

        // store plain object only
        Category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
          icon: selectedCategory.icon,
        },

        Wallet,
      }),
    );
    
    if(isExpense){
      dispatch(expenseUpdate(Amount))
    }else{
      dispatch(incomeUpdate(Amount))
    }

  }

  // convert icon string to component
  const SelectedIcon = iconMap[selectedCategory.icon];

  return (
    <div className={styles.container}>
      <form className="container" onSubmit={postTransaction}>
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
            />
          </div>
        </div>

        <div className={`row ${styles.row1}`}>
          {/* CATEGORY */}
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

          {/* WALLET */}
          <div className="col">
            <label htmlFor="wallet" className="form-label">
              Select Wallet
            </label>

            <select
              id="wallet"
              className="form-select"
              ref={selectedWallet}
              defaultValue={wallets[0]}
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
      </form>
    </div>
  );
};

export default AddTransaction;