import cls from "./SuccessPage.module.css";
import { Title } from "@/components/Typography";
import { Button } from "@/components/Button/Button";
import { useNavigate } from "react-router";

export function SuccessPage() {
  const navigate = useNavigate();

  const goToMenu = () => navigate("/");

  return (
    <div className={cls["successPage"]}>
      <img src="/pizza.png" alt="Картинка пиццы" />
      <Title Tag="h1">
        Ваш заказ успешно <br />
        оформлен!
      </Title>
      <Button variant="large" onClick={goToMenu}>
        Заказать снова
      </Button>
    </div>
  );
}
