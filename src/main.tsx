import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import App from "./App.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage.tsx";
import { CartPage } from "@/pages/CartPage/CartPage.tsx";
import { MenuPage } from "@/pages/MenuPage/MenuPage.tsx";
import { OneProductPage } from "@/pages/OneProductPage/OneProductPage.tsx";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "@/pages/LoginPage/LoginPage.tsx";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute.tsx";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
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
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
