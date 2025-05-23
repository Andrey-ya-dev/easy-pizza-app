import type { PropsWithChildren } from "react";

import cls from "../OneProductPage.module.css";
import type { ProductResponse } from "@/api/interfaces";
import { Rating } from "@/components/Rating/Rating";
import { Text } from "@/components/Typography";
import { ProductCardList } from "./ProductCardList";

interface ProductCardInfoProps {
  className?: string;
  product: ProductResponse;
}

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

export function ProductCardInfo({ product }: ProductCardInfoProps) {
  return (
    <div className={cls["productCard__info"]}>
      <div className={cls["productCard__info-item"]}>
        <Text className={cls["productCard__info-item__title"]}>Цена</Text>
        <Text className={cls["productCard__info-item__price"]}>
          {product?.price} &nbsp;
          <small className={cls["productCard__info-item__currency-symbol"]}>
            ₱
          </small>
        </Text>
      </div>
      <ProductCardInfoItem infoTitle="Рейтинг">
        <Rating rating={product ? product?.rating : 0} />
      </ProductCardInfoItem>
      <ProductCardInfoItem infoTitle="Состав">
        <ProductCardList ingredients={product?.ingredients} />
      </ProductCardInfoItem>
    </div>
  );
}
