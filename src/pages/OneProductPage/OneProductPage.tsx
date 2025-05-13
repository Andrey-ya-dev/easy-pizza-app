import { Text, Title } from "@/components/Typography";
import cls from "./OneProductPage.module.css";
import type { ProductResponse } from "@/api/interfaces";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/api";
import { useParams } from "react-router";

export function OneProductPage() {
  const { id } = useParams();
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
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [id]);

  return (
    <div className={cls["wrapper"]}>
      <div className={cls["pageHead"]}>
        <Title Tag="h1">
          Название: <Text className={cls["productName"]}>{product?.name}</Text>
        </Title>
      </div>
      <div className={cls["pageContent"]}>
        {!isLoading && product && <ProductCard {...product} />}
        {isLoading && <Title>Загрузка ...</Title>}
        {errMsg.length > 0 && (
          <Title
            style={{
              color: "red",
              height: "fit-content",
              padding: "20px",
              backgroundColor: "lightgray",
            }}
          >
            {errMsg}
          </Title>
        )}
      </div>
    </div>
  );
}
