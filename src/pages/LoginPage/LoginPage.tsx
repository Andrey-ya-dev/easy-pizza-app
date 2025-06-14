import { useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Form } from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem/FormItem";
import { InputEmail, InputPassword } from "@/components/Input/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, userActions } from "@/store/userSlice";

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
  const dispatch = useAppDispatch();
  const { jwt, errorMsg: errMsg } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.clearError());
  }, [dispatch]);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & LoginFormType;
    const { email, password } = target;

    if (email.value && password.value) {
      dispatch(login({ email: email.value, password: password.value }));
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
      {errMsg.length > 0 && <ErrorMessage errMsg={errMsg} variant />}
      <FormItem htmForName="email" labelTitle="Ваш email">
        <InputEmail placeholder="Email" id="email" />
      </FormItem>
      <FormItem htmForName="password" labelTitle="Ваш пароль">
        <InputPassword placeholder="Пароль" />
      </FormItem>
    </Form>
  );
}
