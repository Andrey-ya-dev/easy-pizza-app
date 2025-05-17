import cls from "./CartPage.module.css";
import { Text, Title } from "@/components/Typography";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";

export function CartPage() {
  return (
    <div className={cls["wrapper"]}>
      <div className={cls["sectionHead"]}>
        <Title Tag="h1">Корзина</Title>
      </div>
      <div className={cls["sectionContent"]}>
        <ul className={cls["cartList"]}>
          <li className={cls["cartListItem"]}>
            <div className={cls["cartListItemImg"]}>
              <img src="/mock-image.webp" alt="" />
            </div>
            <div className={cls["cartListItemInfo"]}>
              <Title className={cls["cartListItemInfoTitle"]}>Название</Title>
              <Text className={cls["price"]}>
                600 <small>₱</small>
              </Text>
            </div>
            <div className={cls["cartListItemActions"]}>
              <Button variant="round-outline" className={cls["cartBtn"]}>
                -
              </Button>
              <Text>01</Text>
              <Button variant="round" className={cls["cartBtn"]}>
                +
              </Button>
              <Button variant="ghost" className={cls["cartBtn"]}>
                &times;
              </Button>
            </div>
          </li>
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
                  640 <small className={cls["resultValuePrice"]}>₱</small>
                </Text>
              </li>
              <li className={cls["resultListItem"]}>
                <Text className={cls["resultTitle"]}>Доставка</Text>
                <Text className={cls["resultValue"]}>
                  0 <small className={cls["resultValuePrice"]}>₱</small>
                </Text>
              </li>
              <li className={cls["resultListItem"]}>
                <Text className={cls["resultTitle"]}>Итог</Text>
                <Text className={cls["resultValue"]}>
                  640 <small className={cls["resultValuePrice"]}>₱</small>
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
