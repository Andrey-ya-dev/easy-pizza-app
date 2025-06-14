import { BASE_URL } from "./baseURL";

export const getProducts = async (url: string, name?: string) => {
  const params = new URLSearchParams({ name: name ? name : "" }).toString();
  const finalUrl = name ? `${BASE_URL}/${url}?${params}` : `${BASE_URL}/${url}`;
  try {
    const res = await fetch(finalUrl);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
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

export const getUser = async (jwt: string) => {
  try {
    const res = await fetch(`${BASE_URL}/user/profile`, {
      headers: {
        Authorization: `${jwt}`,
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
