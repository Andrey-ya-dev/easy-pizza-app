import type { HTMLAttributes } from "react";
import clsx from "clsx";

type TextTag = keyof Pick<
  React.JSX.IntrinsicElements,
  "span" | "p" | "blockquote"
>;

interface TextProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  Tag?: TextTag;
}

export function Text({
  children,
  className,
  Tag = "span",
  ...props
}: TextProps) {
  return (
    <Tag className={clsx(className)} {...props}>
      {children}
    </Tag>
  );
}
