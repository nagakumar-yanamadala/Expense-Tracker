import styles from "./Styles/Category.module.css";
import {
  addCategory,
  deleteCategory,
  pieChartColors,
} from "../store/categorySlice";

import { useSelector, useDispatch } from "react-redux";

import { MdDelete, MdHelpOutline } from "react-icons/md";

import IconSelector from "./IconSelector";
import ColorSelector from "./ColorSelector";

import { useRef, useState } from "react";

import { iconMap } from "../store/iconMap";

import CustomAlert from "./CustomAlert";

function Category() {
  const categories = useSelector((state) => state.categories);

  const transactions = useSelector((state) => state.transactions);

  const dispatch = useDispatch();

  const inputName = useRef();

  const [icon, setIcon] = useState("FaUtensils");

  const defaultAvailableColor =
    pieChartColors.find(
      (chartColor) =>
        !categories.some(
          (category) => category.color.primary === chartColor.primary,
        ),
    ) || pieChartColors[0];

  const [color, setColor] = useState(defaultAvailableColor);

  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  function showAlert(type, title, message) {
    setAlertData({
      isOpen: true,
      type,
      title,
      message,
    });
  }

  function handleSelectedIcon(selectedIcon) {
    setIcon(selectedIcon);
  }

  function handleDelete(category) {
    const arr = transactions.filter(
      (transaction) => transaction.Category?.name === category.name,
    );

    if (arr.length > 0) {
      showAlert(
        "error",
        "Cannot Delete",
        `This category is used by ${arr.length} transactions. Delete those transactions first.`,
      );

      return;
    }

    dispatch(deleteCategory(category.id));

    showAlert(
      "success",
      "Category Deleted",
      `${category.name} category deleted successfully.`,
    );
  }

  function handleAdd() {
    const categoryName = inputName.current.value.trim();

    if (!categoryName) {
      showAlert("error", "Invalid Input", "Please enter a category name.");

      return;
    }

    const alreadyExists = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (alreadyExists) {
      showAlert(
        "error",
        "Category Exists",
        "A category with this name already exists.",
      );

      return;
    }

    dispatch(
      addCategory({
        name: categoryName,
        icon: icon,
        color: color,
      }),
    );

    inputName.current.value = "";

    const nextAvailableColor =
      pieChartColors.find(
        (chartColor) =>
          !categories.some(
            (category) => category.color.primary === chartColor.primary,
          ) && chartColor.primary !== color.primary,
      ) || pieChartColors[0];

    setColor(nextAvailableColor);

    showAlert(
      "success",
      "Category Added",
      `${categoryName} category added successfully.`,
    );
  }

  return (
    <div className={`container ${styles.mainContainer}`}>
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

      <h1 className="text-center fw-bold m-4 text-dark">Category List</h1>

      <div
        className={`input-group mb-4 p-2 shadow-sm ${styles.inputGroupWrapper}`}
      >
        <div className="d-flex align-items-center px-2">
          <IconSelector handleSelectedIcon={handleSelectedIcon} />
        </div>

        <div className="d-flex align-items-center px-2">
          <ColorSelector
            selectedColor={color}
            handleSelectedColor={(selectedColor) => setColor(selectedColor)}
          />
        </div>

        <input
          type="text"
          className="form-control border-0 bg-transparent shadow-none"
          placeholder="Add new category..."
          ref={inputName}
        />

        <button
          className="btn btn-success rounded px-4 fw-medium"
          type="button"
          onClick={handleAdd}
        >
          Add Category
        </button>
      </div>

      <div className="d-flex flex-column gap-3">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || MdHelpOutline;

          return (
            <div
              key={category.id}
              className={`d-flex justify-content-between align-items-center p-3 list-item ${styles.categoryCard}`}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className={styles.iconContainer}
                  style={{
                    backgroundColor: category.color.background,

                    color: category.color.primary,
                  }}
                >
                  <IconComponent size={20} />
                </div>

                <span className={`fw-semibold ${styles.categoryText}`}>
                  {category.name}
                </span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(category)}
              >
                <MdDelete size={22} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;