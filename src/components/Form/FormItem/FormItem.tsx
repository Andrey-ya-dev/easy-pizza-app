import type { PropsWithChildren } from "react";
import clsx from "clsx";

import cls from "./FromItem.module.css";

interface FormItemProps extends PropsWithChildren {
  htmForName: string;
  labelTitle: string;
}

export function FormItem({ children, htmForName, labelTitle }: FormItemProps) {
  return (
    <div className={clsx(cls.formItem)}>
      <label htmlFor={htmForName}>{labelTitle}</label>
      {children}
    </div>
  );
}
