import { Link, useLocation } from "react-router";
import styles from "./Styles/Header.module.css";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={logo}
            alt="Expense Tracker Logo"
            className={styles.logoImage}
          />
        </Link>

        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link
                to="/"
                className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}
              >
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/add-transaction"
                className={`${styles.navLink} ${isActive("/add-transaction") ? styles.active : ""}`}
              >
                Add Transaction
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/history"
                className={`${styles.navLink} ${isActive("/history") ? styles.active : ""}`}
              >
                History
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/category"
                className={`${styles.navLink} ${isActive("/category") ? styles.active : ""}`}
              >
                Category
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/wallet"
                className={`${styles.navLink} ${isActive("/wallet") ? styles.active : ""}`}
              >
                Wallet
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;