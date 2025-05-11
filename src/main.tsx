import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage.tsx";
import { CartPage } from "@/pages/CartPage/CartPage.tsx";
import { MenuPage } from "@/pages/MenuPage/MenuPage.tsx";
import { OneProductPage } from "@/pages/OneProductPage/OneProductPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MenuPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/product/:id",
        element: <OneProductPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
