import { useState } from "react";
import styles from "./Styles/IconSelector.module.css";

import { iconMap } from "../store/iconMap";

function IconSelector({ handleSelectedIcon }) {
  // convert object into array
  const iconArray = Object.entries(iconMap);

  // default selected icon
  const [selectedIcon, setSelectedIcon] = useState(iconArray[0]);

  const [isOpen, setIsOpen] = useState(false);

  // preview component
  const PreviewIcon = selectedIcon[1];

  return (
    <div className={styles.wrapper} style={{ height: "38px" }}>
      {/* Preview Section */}
      <div
        className={styles.preview}
        style={{
          marginRight: "20px",
          height: "38px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#0b6efd",
            fontSize: "30px",
            marginRight: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PreviewIcon />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => setIsOpen(true)}
        >
          Pick Icon
        </button>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.iconContainer}>
            {iconArray.map(([name, Icon]) => (
              <div
                key={name}
                className={`${styles.iconCard} ${
                  selectedIcon[0] === name ? styles.active : ""
                }`}
                onClick={() => setSelectedIcon([name, Icon])}
              >
                <div className={styles.icon}>
                  <Icon />
                </div>
              </div>
            ))}

            {/* Save Button */}
            <button
              type="button"
              className={`btn btn-success ${styles.saveBtn}`}
              onClick={() => {
                setIsOpen(false);

                // send only icon name
                handleSelectedIcon(selectedIcon[0]);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IconSelector;
