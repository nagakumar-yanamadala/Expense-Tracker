import { createSlice } from "@reduxjs/toolkit";


const walletSlice = createSlice({
  name:"wallets",
  initialState: [
  {
    name: "HDFC Salary Account",
    balance: 45000,
  },
  {
    name: "Axis Bank Savings",
    balance: 32000,
  },
  {
    name: "PhonePe Wallet",
    balance: 1800,
  },
  {
    name: "ICICI Current Account",
    balance: 67000,
  }
],
  reducers:{
    addWallet:(state,action)=>{
      const walletExists = state.find((walletItem)=>walletItem.name===action.payload.name);
      if(!walletExists){
      return([action.payload,...state])
      }
      else{
        alert("wallet already exists!!!")
      }
    },
    deleteWallet:(state,action)=>{
      return(state.filter((wallet)=>wallet.name!==action.payload.name))
    }
  }
})

export const {addWallet,deleteWallet} = walletSlice.actions;
export default walletSlice.reducer;