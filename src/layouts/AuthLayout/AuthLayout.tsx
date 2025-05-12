import { Outlet } from "react-router";

import cls from "./AuthLayout.module.css";

export function AuthLayout() {
  return (
    <div className={cls["wrapper"]}>
      <div className={cls["authPageLogo"]}>
        <img src="/label.svg" alt="Иконка лого" />
      </div>
      <div className={cls["authPageContent"]}>
        <Outlet />
      </div>
    </div>
  );
}
