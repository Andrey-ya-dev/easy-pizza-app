import cls from "../CartPage.module.css";
import { Title, Text } from "@/components/Typography";
import { Button } from "@/components/Button/Button";

interface CartItemProps {
  id: string;
  price: number;
  image: string;
  name: string;
  count: number;
  className?: string;
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
}

export function CartItem({
  price,
  image,
  count,
  name,
  addItem,
  removeItem,
  deleteItem,
  id,
}: CartItemProps) {
  return (
    <li className={cls["cartListItem"]}>
      <div className={cls["cartListItemImg"]}>
        <img
          src={image ? `${image}` : "/mock-image.webp"}
          alt="Картинка товара"
        />
      </div>
      <div className={cls["cartListItemInfo"]}>
        <Title className={cls["cartListItemInfoTitle"]}>{name}</Title>
        <Text className={cls["price"]}>
          {price}&nbsp;
          <small>₱</small>
        </Text>
      </div>
      <div className={cls["cartListItemActions"]}>
        <Button
          variant="round-outline"
          className={cls["cartBtn"]}
          onClick={() => removeItem(Number(id))}
        >
          -
        </Button>
        <Text>{count}</Text>
        <Button
          variant="round"
          className={cls["cartBtn"]}
          onClick={() => addItem(Number(id))}
        >
          +
        </Button>
        <Button
          variant="ghost"
          className={cls["cartBtn"]}
          onClick={() => deleteItem(Number(id))}
        >
          &times;
        </Button>
      </div>
    </li>
  );
}
