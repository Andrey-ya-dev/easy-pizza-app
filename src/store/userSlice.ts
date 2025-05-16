import { sendLogin } from "@/api/api";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) =>
    sendLogin(params.email, params.password)
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeJwt(state) {
      state.jwt = null;
      localStorage.removeItem(JWT_PERSISTENT_STATE);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{
          access_token: string;
        }>
      ) => {
        state.jwt = action.payload.access_token;
      }
    );
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
