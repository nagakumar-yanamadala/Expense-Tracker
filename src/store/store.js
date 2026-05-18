import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './transactionSlice';
import categoryReducer from './categorySlice';
import walletReducer from './walletSlice';
import totalReducer from './totalSlice';

const store = configureStore({
  reducer:{
    transactions:transactionReducer,
    categories:categoryReducer,
    wallets:walletReducer,
    totals:totalReducer
  }
})

export default store;