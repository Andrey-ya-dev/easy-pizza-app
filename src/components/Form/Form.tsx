import type { HTMLAttributes } from "react";
import clsx from "clsx";
import { Link } from "react-router";

import cls from "./Form.module.css";
import { Text, Title } from "@/components/Typography";
import { Button } from "@/components/Button/Button";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
  formTitle: string;
  formBtnName: string;
  formLinkDesc?: string;
  formLinkText: string;
  formLinkPath: string;
}

export function Form({
  children,
  formTitle,
  className,
  formBtnName,
  formLinkDesc,
  formLinkPath,
  formLinkText,
  ...props
}: FormProps) {
  return (
    <form className={clsx(cls["form"], [className])} {...props}>
      <div className={cls["formHeader"]}>
        <Title Tag="h1">{formTitle}</Title>
      </div>
      <div className={cls["formFields"]}>{children}</div>
      <div className={cls["formActions"]}>
        <Button type="submit" variant="large">
          {formBtnName}
        </Button>
        <div className={cls["formLinks"]}>
          {formLinkDesc && (
            <Text className={cls["formLinkDescription"]}>{formLinkDesc}</Text>
          )}
          <Link to={`${formLinkPath}`}>{formLinkText}</Link>
        </div>
      </div>
    </form>
  );
}
