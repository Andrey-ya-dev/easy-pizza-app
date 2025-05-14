import { Outlet, useNavigate } from "react-router";

import cls from "./Layout.module.css";
import { Text } from "@/components/Typography";
import { Button } from "@/components/Button/Button";
import { Menu } from "@/components/Menu/Menu";

export function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    const key = localStorage.getItem("jwt");

    if (key) {
      localStorage.removeItem("jwt");
      navigate("/auth/login");
    }
  };
  return (
    <div className={cls["layout"]}>
      <aside className={cls["aside"]}>
        <div className={cls["userData"]}>
          <img src="/avatar.png" alt="Аватар" className={cls.userAvatar} />
          <div className={cls["userFields"]}>
            <Text className={cls["userName"]}>Джон До Матерхорнович</Text>
            <Text className={cls["userEmail"]}>jhondo@example.com</Text>
          </div>
        </div>

        <Menu />

        <Button className={cls.exit} onClick={logout}>
          <img src="/exit-icon.svg" alt="Иконка выход" />
          <Text>Выход</Text>
        </Button>
      </aside>

      <main className={cls["content"]}>
        <Outlet />
      </main>
    </div>
  );
}
