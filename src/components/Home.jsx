import { useSelector } from "react-redux";
import styles from "./styles/Home.module.css";

import BasicPie from "./PieChart";
import BasicBars from "./Bargraph";

function Home() {
  const totals = useSelector((state) => state.totals);

  const balanceNumber = totals.balance || 0;
  const incomeNumber = totals.income || 0;
  const expenseNumber = totals.expense || 0;

  const balance = balanceNumber.toLocaleString("en-IN");
  const income = incomeNumber.toLocaleString("en-IN");
  const expense = expenseNumber.toLocaleString("en-IN");

  return (
    <div className={styles.container}>

      <div className={styles.cardWrapper}>
        {/* Income Card */}
        <div className={styles.card}>
          <div className={styles.cardGlow}></div>

          <div className={styles.label}>Total Income</div>

          <strong className={`${styles.value} ${styles.incomeValue}`}>
            ₹ {income}
          </strong>

          <span className={styles.cardFooter}>This Month</span>
        </div>

        {/* Expense Card */}
        <div className={styles.card}>
          <div className={styles.cardGlow}></div>

          <div className={styles.label}>Total Expense</div>

          <strong className={`${styles.value} ${styles.expenseValue}`}>
            ₹ {expense}
          </strong>

          <span className={styles.cardFooter}>This Month</span>
        </div>

        {/* Balance Card */}
        <div className={styles.card}>
          <div className={styles.cardGlow}></div>

          <div className={styles.label}>Current Balance</div>

          <strong className={`${styles.value} ${styles.balanceValue}`}>
            ₹ {balance}
          </strong>

          <span className={styles.cardFooter}>Across Wallets</span>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartCard}>
          <BasicPie />
        </div>

        <div className={styles.chartCard}>
          <BasicBars />
        </div>
      </div>
    </div>
  );
}

export default Home;
