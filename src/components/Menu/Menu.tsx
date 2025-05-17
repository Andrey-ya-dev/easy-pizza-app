import { NavLink } from "react-router";
import clsx from "clsx";

import cls from "./Menu.module.css";

interface MenuItemProps {
  className?: string;
  menuPath: string;
  menuName: string;
  icon?: { iconSrc: string; iconAlt: string };
  count?: boolean;
}
export function MenuItem({
  menuPath,
  menuName,
  icon,
  className,
  count = false,
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
      {count && <span className={cls["menuCount"]}>0</span>}
    </li>
  );
}

export function Menu() {
  return (
    <nav>
      <ul className={cls.menu}>
        <MenuItem
          menuName="Меню"
          menuPath="/"
          icon={{ iconAlt: "Иконка меню", iconSrc: "/menu-icon.svg" }}
        />
        <MenuItem
          count
          menuName="Корзина"
          menuPath="/cart"
          icon={{ iconAlt: "Иконка корзины", iconSrc: "/cart-icon.svg" }}
        />
      </ul>
    </nav>
  );
}
