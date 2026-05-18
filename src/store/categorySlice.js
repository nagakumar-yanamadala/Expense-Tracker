import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Food at Restaurant",
    icon: "FaUtensils",
  },
  {
    id: 2,
    name: "Salary",
    icon: "FaMoneyBill",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    icon: "FaFilm",
  },
  {
    id: 4,
    name: "Electricity Bill",
    icon: "FaBolt",
  },
  {
    id: 5,
    name: "Petrol",
    icon: "FaCar",
  },
  {
    id: 6,
    name: "Freelance Project",
    icon: "FaLaptop",
  },
  {
    id: 7,
    name: "Coffee & Snacks",
    icon: "FaCoffee",
  },
  {
    id: 8,
    name: "Bonus",
    icon: "FaPiggyBank",
  },
  {
    id: 9,
    name: "Shopping",
    icon: "FaShoppingBag",
  },
  {
    id: 10,
    name: "Mobile Purchase",
    icon: "FaMobileAlt",
  },
];

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    addCategory: (state, action) => {
      state.unshift({
        id: Date.now(),
        name: action.payload.name,
        icon: action.payload.icon,
      });
    },

    deleteCategory: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});
export const {addCategory,deleteCategory} = categorySlice.actions;
export default categorySlice.reducer;