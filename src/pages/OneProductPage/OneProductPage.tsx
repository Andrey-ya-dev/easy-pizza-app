import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import cls from "./OneProductPage.module.css";
import { Text, Title } from "@/components/Typography";
import type { ProductResponse } from "@/api/interfaces";
import { getProducts } from "@/api/api";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Button } from "@/components/Button/Button";
import { Rating } from "@/components/Rating/Rating";
import { useAppDispatch } from "@/store/hooks";
import { cartActions } from "@/store/cartSlice";

export function OneProductPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const timerId = setTimeout(async () => {
      const data = await getProducts(`products/${id}`);

      if (Object.keys(data).includes("error")) {
        console.log("includes error");
        setIsLoading(false);
        setErrMsg(data.message);
      } else {
        setProduct(data);
        setIsLoading(false);
      }
    }, 0);

    return () => {
      clearTimeout(timerId);
    };
  }, [id]);

  const goToBack = () => navigate(-1);

  const addToCart = () => {
    dispatch(cartActions.addProduct(Number(id)));
  };

  return (
    <div className={cls["wrapper"]}>
      <div className={cls["pageHead"]}>
        <Button variant="chevron" onClick={goToBack}>
          ←
        </Button>
        <Title Tag="h1">
          <Text className={cls["productName"]}>{product?.name}</Text>
        </Title>
        <Button className={cls["productActionBtn"]} onClick={addToCart}>
          <Text>
            <img src="/cart-button-icon.svg" alt="Иконка корзины" />
          </Text>
          В корзину
        </Button>
      </div>
      <div className={cls["pageContent"]}>
        {isLoading && <Title>Загрузка ...</Title>}
        {errMsg.length > 0 && <ErrorMessage errMsg={errMsg} />}
        {!isLoading && product && (
          <div className={cls["productCard"]}>
            <img
              src={`${product?.image}`}
              alt="Картинка товара"
              className={cls["productCard__img"]}
            />
            <div className={cls["productCard__info"]}>
              <div className={cls["productCard__info-item"]}>
                <Text className={cls["productCard__info-item__title"]}>
                  Цена
                </Text>
                <Text className={cls["productCard__info-item__price"]}>
                  {product?.price} &nbsp;
                  <small
                    className={cls["productCard__info-item__currency-symbol"]}
                  >
                    ₱
                  </small>
                </Text>
              </div>
              <div className={cls["productCard__info-item"]}>
                <Text className={cls["productCard__info-item__title"]}>
                  Рейтинг
                </Text>
                <Rating rating={product ? product?.rating : 0} />
              </div>
              <div className={cls["productCard__info-item"]}>
                <Text className={cls["productCard__info-item__title"]}>
                  Состав
                </Text>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
