import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import cls from "./Layout.module.css";
import { Text } from "@/components/Typography";
import { Button } from "@/components/Button/Button";
import { Menu } from "@/components/Menu/Menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserData, userActions } from "@/store/userSlice";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userProfile);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.removeJwt());
    navigate("/auth/login");
  };
  return (
    <div className={cls["layout"]}>
      <aside className={cls["aside"]}>
        <div className={cls["userData"]}>
          <img src="/avatar.png" alt="Аватар" className={cls.userAvatar} />
          <div className={cls["userFields"]}>
            <Text className={cls["userName"]}>{user?.name}</Text>
            <Text className={cls["userEmail"]}>{user?.email}</Text>
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
