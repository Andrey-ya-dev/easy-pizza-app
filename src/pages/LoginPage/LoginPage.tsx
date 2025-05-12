import { sendLogin } from "@/api/api";
import { Form } from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem/FormItem";
import { InputEmail, InputPassword } from "@/components/Input/Input";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

type LoginFormType = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function LoginPage() {
  const navigate = useNavigate();

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & LoginFormType;
    const { email, password } = target;

    const loginData = await sendLogin(email.value, String(password.value));

    if (Object.keys(loginData).includes("error")) {
      console.log(loginData, "include error");
      return;
    } else {
      localStorage.setItem("jwt", loginData["access_token"]);
      navigate("/");
    }
  };
  return (
    <Form
      formTitle="Вход"
      formBtnName="Войти"
      formLinkPath="/auth/register"
      formLinkText="Зарегистрироваться"
      formLinkDesc="Нет аккаунта?"
      onSubmit={onSubmitForm}
    >
      <FormItem htmForName="emial" labelTitle="Ваш email">
        <InputEmail placeholder="Email" id="email" />
      </FormItem>
      <FormItem htmForName="password" labelTitle="Ваш пароль">
        <InputPassword placeholder="Пароль" />
      </FormItem>
    </Form>
  );
}
