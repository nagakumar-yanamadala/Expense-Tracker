import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home.jsx";
import AddTransaction from "./components/AddTransaction.jsx";
import App from "./App.jsx";
import Category from "./components/Category.jsx";
import Wallet from "./components/Wallet.jsx";
import History from "./components/History.jsx";
import store from "./store/store";
let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "history",
        Component: History,
      },
      {
        path: "add-transaction",
        Component: AddTransaction,
      },
      {
        path: "category",
        Component: Category,
      },
      {
        path: "wallet",
        Component: Wallet,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
   <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
