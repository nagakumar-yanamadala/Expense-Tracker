// transactionSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { pieChartColors } from "./categorySlice";
const transactionSlice = createSlice({
  name: "transactions",

  initialState: [
    {
      Amount: 5000,
      isExpense: true,
      Date: "05-03-2026",
      Category: {
        id: 1,
        name: "Food at Restaurant",
        icon: "FaUtensils",
        color: pieChartColors[19], 
      },
      Wallet: {
        name: "Axis Bank Savings",
        balance: 32000,
      },
      Id: "13n2jn2nj",
    },

    {
      Amount: 12000,
      isExpense: false,
      Date: "08-03-2026",
      Category: {
        id: 2,
        name: "Salary",
        icon: "FaMoneyBill",
        color: pieChartColors[12], 
      },
      Wallet: {
        name: "HDFC Salary Account",
        balance: 45000,
      },
      Id: "a82jd92jd",
    },

    {
      Amount: 799,
      isExpense: true,
      Date: "10-03-2026",
      Category: {
        id: 3,
        name: "Netflix Subscription",
        icon: "FaFilm",
        color: pieChartColors[22], 
      },
      Wallet: {
        name: "Axis Bank Savings",
        balance: 31201,
      },
      Id: "nf82jd1",
    },

    {
      Amount: 2400,
      isExpense: true,
      Date: "12-03-2026",
      Category: {
        id: 4,
        name: "Electricity Bill",
        icon: "FaBolt",
        color: pieChartColors[17], 
      },
      Wallet: {
        name: "HDFC Salary Account",
        balance: 42600,
      },
      Id: "eb92jd2",
    },

    {
      Amount: 3500,
      isExpense: true,
      Date: "14-03-2026",
      Category: {
        id: 5,
        name: "Petrol",
        icon: "FaCar",
        color: pieChartColors[3], 
      },
      Wallet: {
        name: "Axis Bank Savings",
        balance: 27701,
      },
      Id: "pt72jd3",
    },
  ],

  reducers: {
    addTransaction: (state, action) => {
      console.log(action.payload);
      return [action.payload, ...state];
    },
    deleteTransaction: (state, action) => {
      return state.filter((transaction) => transaction.Id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
