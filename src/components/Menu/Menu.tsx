import { NavLink } from "react-router";
import clsx from "clsx";

import cls from "./Menu.module.css";
import { useAppSelector } from "@/store/hooks";

interface MenuItemProps {
  className?: string;
  menuPath: string;
  menuName: string;
  icon?: { iconSrc: string; iconAlt: string };
  isCount?: boolean;
  count?: number;
}
export function MenuItem({
  menuPath,
  menuName,
  icon,
  className,
  isCount = false,
  count,
  ...props
}: MenuItemProps) {
  return (
    <li className={clsx(cls["item"])} {...props}>
      <NavLink
        to={`${menuPath}`}
        className={({ isActive }) =>
          clsx(cls["menuItem"], { [cls["active"]]: isActive }, className)
        }
      >
        {icon?.iconSrc && icon.iconSrc.length > 0 && (
          <span>
            <img src={icon.iconSrc} alt={icon.iconAlt} />
          </span>
        )}
        <span>{menuName}</span>
      </NavLink>
      {isCount && <span className={cls["menuCount"]}>{count}</span>}
    </li>
  );
}

export function Menu() {
  const items = useAppSelector((state) => state.cart.items);
  return (
    <nav>
      <ul className={cls.menu}>
        <MenuItem
          menuName="Меню"
          menuPath="/"
          icon={{ iconAlt: "Иконка меню", iconSrc: "/menu-icon.svg" }}
        />
        <MenuItem
          count={items.reduce((acc, item) => acc + item.count, 0)}
          isCount
          menuName="Корзина"
          menuPath="/cart"
          icon={{ iconAlt: "Иконка корзины", iconSrc: "/cart-icon.svg" }}
        />
      </ul>
    </nav>
  );
}
