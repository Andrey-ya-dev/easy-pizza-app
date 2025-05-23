import cls from "./ProductCardList.module.css";

interface ProductCardListProps {
  className?: string;
  ingredients: string[];
}

export function ProductCardList({ ingredients }: ProductCardListProps) {
  return (
    <ul className={cls["productCard__info-item__list"]}>
      {ingredients.map((ingredient) => {
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
  );
}
