import clsx from "clsx";
import cls from "./Badge.module.css";
import type { ReactNode } from "react";

interface BadgeProps {
  className?: string;
  badgeText: string;
  badgeSymbol?: ReactNode;
  isSmall?: boolean;
}

export function Badge({
  badgeText,
  badgeSymbol = "₱",
  className,
  isSmall,
}: BadgeProps) {
  return (
    <div
      className={clsx(cls["badge"], className, {
        [cls["badgeSmall"]]: isSmall,
      })}
    >
      {badgeText}
      <span className={cls["badgeSymbol"]}>{badgeSymbol}</span>
    </div>
  );
}
