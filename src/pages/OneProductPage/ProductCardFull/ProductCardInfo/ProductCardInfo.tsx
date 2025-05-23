import cls from "./ProductCardInfo.module.css";
import type { ProductResponse } from "@/api/interfaces";
import { Rating } from "@/components/Rating/Rating";
import { Text } from "@/components/Typography";
import { ProductCardList } from "./ProductCardList/ProductCardList";
import { ProductCardInfoItem } from "./ProductCardInfoItem/ProductCardInfoItem";

interface ProductCardInfoProps {
  className?: string;
  product: ProductResponse;
}

export function ProductCardInfo({ product }: ProductCardInfoProps) {
  return (
    <div className={cls["productCard__info"]}>
      <ProductCardInfoItem infoTitle="Цента">
        <Text className={cls["productCard__info-item__price"]}>
          {product?.price} &nbsp;
          <small className={cls["productCard__info-item__currency-symbol"]}>
            ₱
          </small>
        </Text>
      </ProductCardInfoItem>
      <ProductCardInfoItem infoTitle="Рейтинг">
        <Rating rating={product ? product?.rating : 0} />
      </ProductCardInfoItem>
      <ProductCardInfoItem infoTitle="Состав">
        <ProductCardList ingredients={product?.ingredients} />
      </ProductCardInfoItem>
    </div>
  );
}
