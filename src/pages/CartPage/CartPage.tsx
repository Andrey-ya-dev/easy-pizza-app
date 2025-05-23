import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import cls from "./CartPage.module.css";
import { Title } from "@/components/Typography";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProducts } from "@/api/api";
import type { ProductResponse } from "@/api/interfaces";
import { cartActions } from "@/store/cartSlice";
import { BASE_URL } from "@/api/baseURL";
import { CartResultList } from "./CartResultList/CartResultList";
import { CartProductList } from "./CartProductList/CartProductList";

const DELIVERY_FEE = 169;

export function CartPage() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState<ProductResponse[]>([]);
  const items = useAppSelector((state) => state.cart.items);
  const jwt = useAppSelector((state) => state.user.jwt);
  const dispatch = useAppDispatch();
  const total = useMemo(
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

  const checkout = async () => {
    const response = await fetch(`${BASE_URL}/order`, {
      method: "POST",
      body: JSON.stringify({
        products: items,
      }),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    dispatch(cartActions.clearCart());
    navigate("/success");
    return data;
  };

  return (
    <div className={cls["wrapper"]}>
      <div className={cls["sectionHead"]}>
        <Title Tag="h1">Корзина</Title>
      </div>
      <div className={cls["sectionContent"]}>
        <CartProductList
          addItem={addItem}
          removeItem={removeItem}
          deleteItem={deleteItem}
          cartProducts={cartProducts}
          items={items}
        />
        <div className={cls["cartActions"]}>
          <div className={cls["promocode"]}>
            <Input placeholder="Ввести промокод" id={cls["promoInput"]} />
            <Button className={cls["promoBtn"]}>Применить</Button>
          </div>
          <div className={cls["result"]}>
            <CartResultList
              total={total}
              delivery={DELIVERY_FEE}
              count={items.length}
            />
            <Button
              variant="large"
              onClick={checkout}
              disabled={!(items.length > 0)}
            >
              Оформить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
