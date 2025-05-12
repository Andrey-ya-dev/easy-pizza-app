import { Form } from "@/components/Form/Form";
import { FormItem } from "@/components/Form/FormItem/FormItem";
import { InputEmail, InputPassword, InputText } from "@/components/Input/Input";

export function RegisterPage() {
  return (
    <Form
      formTitle="Регистрация"
      formBtnName="Зарегистрироваться"
      formLinkPath="/auth/login"
      formLinkText="Вход"
      formLinkDesc="Уже есть аккаунта?"
      onSubmit={(e) => e.preventDefault()}
    >
      <FormItem htmForName="firstName" labelTitle="Ваш email">
        <InputText placeholder="Введите логин" id="firstName" />
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
