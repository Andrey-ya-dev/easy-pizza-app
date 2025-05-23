import cls from "./ProductCardFull.module.css";
import type { ProductResponse } from "@/api/interfaces";
import { ProductCardInfo } from "./ProductCardInfo/ProductCardInfo";

interface ProductCardFullProps {
  className?: string;
  product: ProductResponse;
}

export function ProductCardFull({ product }: ProductCardFullProps) {
  return (
    <div className={cls["productCard"]}>
      <img
        src={`${product?.image}`}
        alt="Картинка товара"
        className={cls["productCard__img"]}
      />
      <ProductCardInfo product={product} />
    </div>
  );
}
