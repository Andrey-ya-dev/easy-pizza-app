import { BASE_URL } from "./baseURL";

export const getProducts = async (url: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const sendLogin = async (email: string, password: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
