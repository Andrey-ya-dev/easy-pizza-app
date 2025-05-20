import { useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { Form } from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem/FormItem";
import { InputEmail, InputPassword, InputText } from "@/components/Input/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, userActions } from "@/store/userSlice";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";

type RegisterFormType = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorMsgRegister, isErrorRegister, jwt } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(userActions.clearRegisterError());
  }, [dispatch]);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & RegisterFormType;
    const { email, password, name } = target;

    if (email.value && password.value && name.value) {
      dispatch(
        registerUser({
          email: email.value,
          password: password.value,
          name: name.value,
        })
      );
    }
  };

  return (
    <Form
      formTitle="Регистрация"
      formBtnName="Зарегистрироваться"
      formLinkPath="/auth/login"
      formLinkText="Вход"
      formLinkDesc="Уже есть аккаунта?"
      onSubmit={onSubmitForm}
    >
      {isErrorRegister && <ErrorMessage errMsg={errorMsgRegister} variant />}
      <FormItem htmForName="firstName" labelTitle="Ваше имя">
        <InputText placeholder="Введите имя" id="name" name="name" />
      </FormItem>
      <FormItem htmForName="email" labelTitle="Ваш email">
        <InputEmail placeholder="Email" id="email" />
      </FormItem>
      <FormItem htmForName="password" labelTitle="Ваш пароль">
        <InputPassword placeholder="Пароль" id="password" />
      </FormItem>
    </Form>
  );
}
