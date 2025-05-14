import cls from "./MenuPage.module.css";
import { Input } from "@/components/Input/Input";
import { Title } from "@/components/Typography";
import { ProductList } from "@/components/ProductList/ProductList";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/api";
import type { ProductResponse } from "@/api/interfaces";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";

export function MenuPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const id = setTimeout(async () => {
      const data = await getProducts("products");
      if (Object.keys(data).includes("error")) {
        console.log("includes error");
        setErrMsg(data.message);
        setIsLoading(false);
        return;
      } else {
        setErrMsg("");
        setProducts(data);
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <>
      <div className={cls["head"]}>
        <Title Tag="h1">Наше меню</Title>
        <Input placeholder="Введите блюдо или состав" withIcon />
      </div>

      <div className={cls["main"]}>
        {!isLoading && <ProductList products={products} />}
        {isLoading && <Title>Загрузка...</Title>}
        {errMsg && <ErrorMessage errMsg={errMsg} />}
      </div>
    </>
  );
}

export default MenuPage;
