import type { PropsWithChildren } from "react";

import cls from "./ProductCardInfoItem.module.css";
import { Text } from "@/components/Typography";

interface ProductCardInfoItemProps extends PropsWithChildren {
  className?: string;
  infoTitle: string;
}

export function ProductCardInfoItem({
  infoTitle,
  children,
}: ProductCardInfoItemProps) {
  return (
    <div className={cls["productCard__info-item"]}>
      <Text className={cls["productCard__info-item__title"]}>{infoTitle}</Text>
      {children}
    </div>
  );
}
