import type { PropsWithChildren } from "react";
import { Link, useParams } from "react-router";
import clsx from "clsx";

import cls from "./ProductCard.module.css";
import { Title } from "@/components/Typography";
import { Button } from "@/components/Button/Button";
import type { ProductResponse } from "@/api/interfaces";
import { useAppDispatch } from "@/store/hooks";
import { cartActions } from "@/store/cartSlice";
import { Badge } from "@/components/Badge/Badge";

export type ProductCardProps = {
  className?: string;
} & PropsWithChildren &
  ProductResponse;

export function ProductCard({
  id,
  price,
  ingredients,
  name,
  rating,
  className,
  image,
  ...props
}: ProductCardProps) {
  const { id: paramId } = useParams();
  const dispatch = useAppDispatch();

  const addProductToCart = () => {
    dispatch(cartActions.addProduct(Number(id)));
  };

  return (
    <div data-i={id} className={clsx(cls["productCard"], className)} {...props}>
      <div className={cls["head"]}>
        <Badge badgeText={price.toString()} className={cls["price"]} />
        <Button
          title="Добавить продукт в корзину"
          variant="round"
          className={cls["icon"]}
          onClick={addProductToCart}
        >
          <img src="/cart-button-icon.svg" alt="Иконка корзины" />
        </Button>
        <img src={`${image}`} alt="Картинка продукта" className={cls["img"]} />
        <Badge
          badgeText={rating.toString()}
          className={cls["rating"]}
          badgeSymbol={<img src="/star-icon.svg" alt="Иконка звезды" />}
          isSmall
        />
      </div>
      <div className={cls["footer"]}>
        <Title>{name}</Title>
        <span className={cls["components"]}>{ingredients.join(", ")}</span>
        <Link
          title="Посмотреть подробнее"
          to={paramId ? "/" : `/product/${id}`}
          className={clsx(cls["link"], "btn")}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}
