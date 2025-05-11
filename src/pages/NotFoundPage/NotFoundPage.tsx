import { Link } from "react-router";

import cls from "./NotFoundPage.module.css";
import { Title } from "@/components/Typography";

export function NotFoundPage() {
  return (
    <div className={cls["wrapper"]}>
      <Title>Page not found | 404</Title>
      <Link to={"/"}>← go to main page</Link>
    </div>
  );
}
