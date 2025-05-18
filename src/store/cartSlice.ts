import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadStorageData } from "./storage";

export const CART_PERSISTENT_STATE = "cartData";

interface CartItem {
  id: number;
  count: number;
}

interface InitialStateCart {
  items: CartItem[];
}

const initialState: InitialStateCart = loadStorageData(
  CART_PERSISTENT_STATE
) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<number>) {
      const isExists = state.items.find((item) => item.id === action.payload);

      if (isExists) {
        isExists.count += 1;
        return;
      }
      state.items.push({ id: action.payload, count: 1 });
    },
    removeProduct(state, action: PayloadAction<number>) {
      const isExists = state.items.find((item) => item.id === action.payload);

      if (isExists && isExists.count > 1) {
        isExists.count -= 1;
        return;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
