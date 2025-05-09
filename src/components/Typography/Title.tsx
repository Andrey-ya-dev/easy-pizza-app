import clsx from "clsx";
import type { HTMLAttributes } from "react";

type HeaderTag = keyof Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  Tag?: HeaderTag;
}

export function Title({ children, className, Tag = "h3" }: TitleProps) {
  return <Tag className={clsx(className)}>{children}</Tag>;
}
