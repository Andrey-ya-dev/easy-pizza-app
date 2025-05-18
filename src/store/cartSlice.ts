import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  count: number;
}

interface InitialStateCart {
  items: CartItem[];
}

const initialState: InitialStateCart = {
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
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
