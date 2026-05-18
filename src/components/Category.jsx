import "./Styles/ListItem.css";
import styles from "./Styles/Category.module.css";
import { addCategory, deleteCategory } from "../store/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete, MdHelpOutline } from "react-icons/md";
import IconSelector from "./IconSelector";
import { useRef, useState } from "react";
import { iconMap } from "../store/iconMap";

function Category() {
  const categories = useSelector((state) => state.categories);
  const transactions = useSelector((state) => state.transactions);
  const inputName = useRef();
  const [icon, setIcon] = useState("FaUtensils");
  const dispatch = useDispatch();

  function handleSelectedIcon(selectedIcon) {
    setIcon(selectedIcon);
  }

  function handleDelete(category) {
    // Optional chaining to prevent app crashing if Category object is undefined
    const arr = transactions.filter(
      (transaction) => transaction.Category?.name === category.name,
    );

    if (arr.length === 0) {
      dispatch(deleteCategory(category.id));
    } else {
      alert(
        `This category is used by ${arr.length} transactions. Delete those transactions first.`,
      );
    }
  }

  function handleAdd() {
    const categoryName = inputName.current.value.trim();

    if (!categoryName) {
      alert("Enter category name");
      return;
    }

    const alreadyExists = categories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (alreadyExists) {
      alert("Category already exists");
      return;
    }

    dispatch(
      addCategory({
        name: categoryName,
        icon: icon,
      }),
    );

    inputName.current.value = "";
  }

  return (
    <div className={`container ${styles.mainContainer}`}>
      <h1 className="text-center fw-bold m-4 text-dark">Category List</h1>

      {/* Input Group Bar */}
      <div
        className={`input-group mb-4 p-2 shadow-sm ${styles.inputGroupWrapper}`}
      >
        <div className="d-flex align-items-center px-2">
          <IconSelector handleSelectedIcon={handleSelectedIcon} />
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

      {/* Category List Stack */}
      <div className="d-flex flex-column gap-3">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon] || MdHelpOutline;

          return (
            <div
              key={category.id}
              className={`d-flex justify-content-between align-items-center p-3 list-item ${styles.categoryCard}`}
            >
              <div className="d-flex align-items-center gap-3">
                <div className={styles.iconContainer}>
                  <IconComponent size={20} />
                </div>
                <span className={`fw-semibold ${styles.categoryText}`}>
                  {category.name}
                </span>
              </div>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(category)}
                aria-label="Delete category"
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
