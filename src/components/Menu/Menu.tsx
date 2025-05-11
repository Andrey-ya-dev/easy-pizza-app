import { NavLink } from "react-router";
import clsx from "clsx";

import cls from "./Menu.module.css";

export function Menu() {
  return (
    <nav>
      <ul className={cls.menu}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(cls.menuItem, { [cls.active]: isActive })
            }
          >
            <span>
              <img src="/menu-icon.svg" alt="Иконка меню" />
            </span>
            <span>Меню</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              clsx(cls.menuItem, { [cls.active]: isActive })
            }
          >
            <span>
              <img src="/cart-icon.svg" alt="Иконка корзины" />
            </span>
            <span>Корзина</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
