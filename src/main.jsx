import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home.jsx";
import AddTransaction from "./components/AddTransaction.jsx";
import App from "./App.jsx";
import Category from "./components/Category.jsx";
import Wallet from "./components/Wallet.jsx";
import History from "./components/History.jsx";

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
    <RouterProvider router={router} />
  </StrictMode>,
);
