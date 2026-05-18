import { createSlice } from "@reduxjs/toolkit";

const initialState = {income:12000,expense:5000,balance:227100};

const totalSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    incomeUpdate: (state, action) => {
        return {income:state.income+action.payload.amount,expense:state.expense,balance:state.balance+action.payload}
    },
    expenseUpdate: (state, action) => {
        return {income:state.income,expense:state.expense+action.payload.amount,balance:state.balance-action.payload}
    }
  },
});
export const {incomeUpdate,expenseUpdate} = totalSlice.actions;
export default totalSlice.reducer;