// transactionSlice.js

import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",

  initialState: [
    {
      Amount: 5000,
      isExpense: true,
      Date: "05-03-2026",

      Category: {
        name: "Food at Restaurant",
        icon: "FaUtensils",
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
        name: "Salary",
        icon: "FaMoneyBill",
      },

      Wallet: {
        name: "HDFC Salary Account",
        balance: 45000,
      },

      Id: "a82jd92jd",
    },
  ],

  reducers: {
    addTransaction: (state, action) => {
      return [action.payload, ...state];
    },
    deleteTransaction: (state, action) => {
      return state.filter((transaction) => transaction.Id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
