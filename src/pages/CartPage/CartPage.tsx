import { useEffect, useMemo, useState } from "react";

import cls from "./CartPage.module.css";
import { CartItem } from "./CartItem/CartItem";
import { Text, Title } from "@/components/Typography";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProducts } from "@/api/api";
import type { ProductResponse } from "@/api/interfaces";
import { cartActions } from "@/store/cartSlice";

export function CartPage() {
  const [cartProducts, setCartProducts] = useState<ProductResponse[]>([]);
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const toPrice = useMemo(
    () =>
      items.reduce((acc, item) => {
        const product = cartProducts.find(
          (p) => Number(item.id) === Number(p.id)
        );
        let price = 0;
        if (product) {
          price = product.price * item.count;
        }
        return acc + price;
      }, 0),
    [cartProducts, items]
  );

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const loadAllItems = async () => {
    const res = await Promise.all(
      items.map((item) => getProducts(`products/${item.id}`))
    );
    setCartProducts(res);
  };

  const addItem = (id: number) => {
    dispatch(cartActions.addProduct(id));
  };

  const removeItem = (id: number) => {
    dispatch(cartActions.removeProduct(id));
  };

  const deleteItem = (id: number) => {
    dispatch(cartActions.deleteProduct(id));
  };

  return (
    <div className={cls["wrapper"]}>
      <div className={cls["sectionHead"]}>
        <Title Tag="h1">Корзина</Title>
      </div>
      <div className={cls["sectionContent"]}>
        <ul className={cls["cartList"]}>
          {items.map((item) => {
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
          })}
        </ul>
        <div className={cls["cartActions"]}>
          <div className={cls["promocode"]}>
            <Input placeholder="Ввести промокод" id={cls["promoInput"]} />
            <Button className={cls["promoBtn"]}>Применить</Button>
          </div>
          <div className={cls["result"]}>
            <ul className={cls["resultList"]}>
              <li className={cls["resultListItem"]}>
                <Text className={cls["resultTitle"]}>Общая цена</Text>
                <Text className={cls["resultValue"]}>
                  {toPrice}&nbsp;
                  <small className={cls["resultValuePrice"]}>₱</small>
                </Text>
              </li>
              <li className={cls["resultListItem"]}>
                <Text className={cls["resultTitle"]}>Доставка</Text>
                <Text className={cls["resultValue"]}>
                  190 <small className={cls["resultValuePrice"]}>₱</small>
                </Text>
              </li>
              <li className={cls["resultListItem"]}>
                <Text className={cls["resultTitle"]}>Итог</Text>
                <Text className={cls["resultValue"]}>
                  {toPrice + 190}
                  <small className={cls["resultValuePrice"]}>₱</small>
                </Text>
              </li>
            </ul>
            <Button variant="large">Оформить</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
