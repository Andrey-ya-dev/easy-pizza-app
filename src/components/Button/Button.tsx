import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import cls from "./Button.module.css";

type ButtonVariant = "main" | "round" | "large" | "round-outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
}
export function Button({
  children,
  className,
  variant = "main",
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(cls["button"], cls[variant], className)} {...props}>
      {children}
    </button>
  );
}
