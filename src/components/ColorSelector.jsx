import { useState } from "react";

import styles from "./Styles/ColorSelector.module.css";

import { pieChartColors } from "../store/categorySlice";

import { useSelector } from "react-redux";

function ColorSelector({ handleSelectedColor, selectedColor }) {
  const categories = useSelector((state) => state.categories);

  // Used colors
  const usedColors = categories.map((category) => category.color.primary);

  // Popup state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* Preview */}
      <div className={styles.preview}>
        <div
          className={styles.colorPreview}
          style={{
            backgroundColor: selectedColor.primary,
          }}
        ></div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => setIsOpen(true)}
        >
          Pick Color
        </button>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.colorContainer}>
            {pieChartColors.map((color, index) => {
              const isUsed =
                usedColors.includes(color.primary) &&
                selectedColor.primary !== color.primary;

              return (
                <div
                  key={index}
                  className={`${styles.colorCard} ${
                    selectedColor.primary === color.primary ? styles.active : ""
                  } ${isUsed ? styles.disabled : ""}`}
                  style={{
                    backgroundColor: color.primary,
                  }}
                  onClick={() => {
                    if (!isUsed) {
                      handleSelectedColor(color);
                    }
                  }}
                >
                  {isUsed && <div className={styles.cross}>✕</div>}
                </div>
              );
            })}

            {/* Save Button */}
            <button
              type="button"
              className={`btn btn-success ${styles.saveBtn}`}
              onClick={() => setIsOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorSelector;
