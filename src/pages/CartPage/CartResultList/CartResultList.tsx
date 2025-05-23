import cls from "../CartPage.module.css";
import { CartResultListItem } from "./CartResultListItem";

interface CartResultListProps {
  total: number;
  delivery?: number;
  count?: number;
}

export function CartResultList({
  total,
  delivery = 0,
  count = 0,
}: CartResultListProps) {
  return (
    <ul className={cls["resultList"]}>
      <CartResultListItem title="Общая цена" content={total} />
      <CartResultListItem title="Доставка" content={delivery} />
      <CartResultListItem
        title="Итог"
        content={total + delivery}
        count={count}
      />
    </ul>
  );
}
