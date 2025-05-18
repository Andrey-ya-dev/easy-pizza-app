import { configureStore } from "@reduxjs/toolkit";
import { JWT_PERSISTENT_STATE, userReducer } from "./userSlice";
import { saveInStorageData } from "./storage";
import { CART_PERSISTENT_STATE, cartReducer } from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

// Подписка на изменения стора
store.subscribe(() => {
  saveInStorageData(JWT_PERSISTENT_STATE, { jwt: store.getState().user.jwt });
  saveInStorageData(CART_PERSISTENT_STATE, store.getState().cart);
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
