import { addWallet, deleteWallet } from "../store/walletSlice";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { useRef } from "react";
import styles from "./Styles/Wallet.module.css"; 

function Wallet() {
  const wallets = useSelector((state) => state.wallets);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const inputWalletName = useRef();
  const inputWalletBalance = useRef();

  function handleAddWallet() {
    const name = inputWalletName.current.value.trim();
    const balance = inputWalletBalance.current.value.trim();

    if (!name || !balance) {
      alert("Please enter both a wallet name and initial balance.");
      return;
    }

    dispatch(addWallet({ name, balance: balance }));

    // Clear inputs after adding
    inputWalletName.current.value = "";
    inputWalletBalance.current.value = "";
  }

  function handleDelete(wallet) {
    const walletInUse = transactions.find(
      (transaction) => transaction.Wallet?.name === wallet.name,
    );

    if (!walletInUse) {
      dispatch(deleteWallet(wallet));
    } else {
      alert(
        "This wallet is in use. Delete its associated transactions before removing it.",
      );
    }
  }

  return (
    <div className={styles.walletContainer}>
      <header className={styles.header}>
        <h1>Wallets</h1>
      </header>

      <div className={styles.inputGroup}>
        <input
          type="text"
          className="form-control"
          placeholder="Add new wallet"
          style={{ cursor: "pointer" }}
          ref={inputWalletName}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Initial balance"
          style={{ cursor: "pointer" }}
          ref={inputWalletBalance}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={handleAddWallet}
        >
          Add Wallet
        </button>
      </div>

      <div className={styles.walletList}>
        <div className={`${styles.listHeader} row mx-0`}>
          <div className="col-5">Wallet Name</div>
          <div className="col-5">Balance</div>
          <div className="col-2 text-end">Actions</div>
        </div>

        {wallets.length === 0 ? (
          <p className={styles.emptyMessage}>No wallets added yet.</p>
        ) : (
          wallets.map((wallet) => (
            <div
              className={`${styles.listItem} row mx-0 align-items-center`}
              key={wallet.name}
            >
              <div className="col-5 className={styles.walletName}">
                {wallet.name}
              </div>
              <div className="col-5 className={styles.walletBalance}">
                ₹ {wallet.balance}
              </div>
              <div className="col-2 text-end">
                <MdDelete
                  className={styles.deleteButton}
                  size={22}
                  onClick={() => handleDelete(wallet)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wallet;
