import styles from "./Styles/CustomAlert.module.css";

const CustomAlert = ({ isOpen, onClose, type = "success", title, message }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  const statusClass = styles[type] || styles.success;

  return (
    <div className={styles.alertOverlay} onClick={onClose}>
      <div
        className={`${styles.alertBox} ${statusClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconWrapper}>{getIcon()}</div>
        <h3 className={styles.title}>
          {title || (type === "success" ? "Success!" : "Alert")}
        </h3>
        <p className={styles.message}>{message}</p>
        <button className={styles.actionButton} onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
