import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import cls from "./OneProductPage.module.css";
import { Text, Title } from "@/components/Typography";
import type { ProductResponse } from "@/api/interfaces";
import { getProducts } from "@/api/api";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Button } from "@/components/Button/Button";
import { useAppDispatch } from "@/store/hooks";
import { cartActions } from "@/store/cartSlice";
import { ProductCardFull } from "./ProductCardFull/ProductCardFull";

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
          <img src="/chevron-left.svg" alt="Иконка галка влево" />
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
        {!isLoading && product && <ProductCardFull product={product} />}
      </div>
    </div>
  );
}
