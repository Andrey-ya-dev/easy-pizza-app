import type { InputHTMLAttributes, Ref } from "react";
import clsx from "clsx";

import cls from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  withIcon?: boolean;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  className,
  withIcon = false,
  ref,
  ...props
}: InputProps) => {
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
};

export const InputText = (props: InputProps) =>
  Input({ ...props, type: "text" });

export const InputEmail = (props: InputProps) => (
  <Input type="email" name="email" id="email" {...props} />
);

export const InputPassword = (props: InputProps) => (
  <Input type="password" name="password" id="password" {...props} />
);
