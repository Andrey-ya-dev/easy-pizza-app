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
