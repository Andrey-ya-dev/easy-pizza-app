import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

import cls from "./Input.module.css";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  withIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, withIcon = false, ...props }, ref) => {
    return (
      <div className={cls.wrapper}>
        {withIcon && (
          <img
            src="/search-icon.svg"
            alt="Поиск иконка лупы"
            className={cls.icon}
          />
        )}
        <input
          className={clsx(cls.input, className, {
            [cls.withIcon]: withIcon,
          })}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
