import cls from "../CartPage.module.css";
import { CartItem } from "../CartItem/CartItem";
import { Message } from "@/components/Message/Message";
import type { ProductResponse } from "@/api/interfaces";
import type { CartItem as CartItemType } from "@/store/cartSlice";

interface CartProductListProps {
  items: CartItemType[];
  cartProducts: ProductResponse[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
}

export function CartProductList({
  items,
  cartProducts,
  addItem,
  removeItem,
  deleteItem,
}: CartProductListProps) {
  return (
    <ul className={cls["cartList"]}>
      {items.length > 0 ? (
        items.map((item) => {
          const product = cartProducts.find(
            (p) => String(p.id) === String(item.id)
          );
          if (!product) {
            return;
          }
          return (
            <CartItem
              key={product.id}
              {...product}
              count={item.count}
              addItem={addItem}
              removeItem={removeItem}
              deleteItem={deleteItem}
            />
          );
        })
      ) : (
        <Message>Нет товаров в корзине</Message>
      )}
    </ul>
  );
}
