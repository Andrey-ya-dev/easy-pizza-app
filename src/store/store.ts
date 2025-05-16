import { configureStore } from "@reduxjs/toolkit";
import { JWT_PERSISTENT_STATE, userReducer } from "./userSlice";
import { saveInStorageData } from "./storage";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Подписка на изменения стора
store.subscribe(() => {
  saveInStorageData(JWT_PERSISTENT_STATE, { jwt: store.getState().user.jwt });
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
