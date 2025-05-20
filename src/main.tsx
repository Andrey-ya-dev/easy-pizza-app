import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage.tsx";
import { CartPage } from "@/pages/CartPage/CartPage.tsx";
import { OneProductPage } from "@/pages/OneProductPage/OneProductPage.tsx";
import { AuthLayout } from "@/layouts/AuthLayout/AuthLayout.tsx";
import { LoginPage } from "@/pages/LoginPage/LoginPage.tsx";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute.tsx";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage.tsx";
import { store } from "@/store/store.ts";
import { SuccessPage } from "@/pages/SuccessPage/SuccessPage.tsx";

const MenuPageLazy = lazy(() => import("./pages/MenuPage/MenuPage.tsx"));

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
        element: <MenuPageLazy />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/product/:id",
        element: <OneProductPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
