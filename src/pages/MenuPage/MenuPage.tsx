import { useEffect, useState, type ChangeEvent } from "react";

import cls from "./MenuPage.module.css";
import { Input } from "@/components/Input/Input";
import { Title } from "@/components/Typography";
import { ProductList } from "@/components/ProductList/ProductList";
import { getProducts } from "@/api/api";
import type { ProductResponse } from "@/api/interfaces";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Message } from "@/components/Message/Message";

export function MenuPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const loadProducts = async () => {
      const data = await getProducts("products", searchStr);
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
    };

    const id = setTimeout(() => {
      loadProducts();
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [searchStr]);

  const searchUpdate = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchStr(e.target.value);

  return (
    <>
      <div className={cls["head"]}>
        <Title Tag="h1">Наше меню</Title>
        <Input
          placeholder="Введите блюдо или состав"
          withIcon
          value={searchStr}
          onChange={searchUpdate}
        />
      </div>

      <div className={cls["main"]}>
        {!isLoading && products.length > 0 && (
          <ProductList products={products} />
        )}
        {!isLoading && products.length === 0 && (
          <Message>Таких блюд не найдено</Message>
        )}
        {isLoading && <Title>Загрузка...</Title>}
        {errMsg && <ErrorMessage errMsg={errMsg} />}
      </div>
    </>
  );
}

export default MenuPage;
