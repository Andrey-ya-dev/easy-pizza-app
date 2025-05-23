import cls from "../CartPage.module.css";
import { Text } from "@/components/Typography";

interface CartResultListItemProps {
  content: string | number;
  title: string;
  symbol?: string;
  count?: string | number;
}

export function CartResultListItem({
  content,
  title,
  symbol = "₱",
  count = undefined,
}: CartResultListItemProps) {
  return (
    <li className={cls["resultListItem"]}>
      <Text className={cls["resultTitle"]}>
        {title}
        {count !== undefined && (
          <small className={cls["resultValuePrice"]}>{`(${count})`}</small>
        )}
      </Text>
      <Text className={cls["resultValue"]}>
        {content}&nbsp;
        <small className={cls["resultValuePrice"]}>{symbol}</small>
      </Text>
    </li>
  );
}
