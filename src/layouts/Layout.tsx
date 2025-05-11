import { Outlet } from "react-router";
import cls from "./Layout.module.css";
import { Text } from "@/components/Typography";
import { Button } from "@/components/Button/Button";

export function Layout() {
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
        <Button className={cls.exit}>
          <img src="/exit-icon.svg" alt="Выход" />
          <Text>Выход</Text>
        </Button>
      </aside>

      <main className={cls["content"]}>
        <Outlet />
      </main>
    </div>
  );
}
