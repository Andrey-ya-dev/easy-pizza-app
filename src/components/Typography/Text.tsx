import type { HTMLAttributes } from "react";
import clsx from "clsx";

type TextTag = keyof React.JSX.IntrinsicElements;

interface TextProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  Tag?: TextTag;
}

export function Text({ children, className, Tag = "span" }: TextProps) {
  return <Tag className={clsx(className)}>{children}</Tag>;
}
