import cls from "../OneProductPage.module.css";
import type { ProductResponse } from "@/api/interfaces";
import { ProductCardInfo } from "./ProductCardInfo";

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
      {/* <div className={cls["productCard__info"]}>
        <div className={cls["productCard__info-item"]}>
          <Text className={cls["productCard__info-item__title"]}>Цена</Text>
          <Text className={cls["productCard__info-item__price"]}>
            {product?.price} &nbsp;
            <small className={cls["productCard__info-item__currency-symbol"]}>
              ₱
            </small>
          </Text>
        </div>
        <div className={cls["productCard__info-item"]}>
          <Text className={cls["productCard__info-item__title"]}>Рейтинг</Text>
          <Rating rating={product ? product?.rating : 0} />
        </div>
        <div className={cls["productCard__info-item"]}>
          <Text className={cls["productCard__info-item__title"]}>Состав</Text>
          <ul className={cls["productCard__info-item__list"]}>
            {product?.ingredients.map((ingredient) => {
              return (
                <li
                  key={ingredient}
                  className={cls["productCard__info-item__list-item"]}
                >
                  {ingredient}
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
