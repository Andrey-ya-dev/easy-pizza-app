import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { sendLogin } from "@/api/api";
import { loadStorageData } from "./storage";

export const JWT_PERSISTENT_STATE = "userData";

export interface ErrorField {
  statusCode: number;
  message: string[];
  error: string;
}

export interface UserState {
  jwt: string | null;
  isLoadingUser?: boolean;
  isError?: boolean;
  errorMsg: string;
}

const initialState: UserState = {
  jwt: loadStorageData(JWT_PERSISTENT_STATE).jwt ?? null,
  isError: false,
  isLoadingUser: false,
  errorMsg: "",
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }, { rejectWithValue }) => {
    const data = await sendLogin(params.email, params.password);

    if (Object.keys(data).includes("error")) {
      return rejectWithValue(data);
    }

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeJwt(state) {
      state.jwt = null;
      localStorage.removeItem(JWT_PERSISTENT_STATE);
    },
    clearError(state) {
      state.errorMsg = "";
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
        state.isError = false;
        state.isLoadingUser = false;
        state.errorMsg = "";
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      const data = action.payload as ErrorField;
      state.isLoadingUser = false;
      if (Array.isArray(data.message)) {
        state.errorMsg = data.message.join(" ");
      } else {
        state.errorMsg = data.message;
      }
      state.isError = true;
    });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
