import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./ui/app";

import Home from "./ui/pages/Home";
import TransactionsListing from "./ui/pages/TransactionsListing";
import TransactionsCreate from "./ui/pages/TransactionsCreate";
import TransactionsEdit from "./ui/pages/TransactionsEdit";
import ErrorPage from "./ui/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <TransactionsListing />,
      },
      {
        path: "/transactions/create",
        element: <TransactionsCreate />,
      },
      {
        path: "/transactions/edit/:transactionId",
        element: <TransactionsEdit />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
