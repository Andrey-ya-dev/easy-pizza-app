import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getUser, sendLogin, register } from "@/api/api";
import { loadStorageData } from "./storage";
import type { RootState } from "./store";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserProfile {
  id: number;
  email: string;
  address: string;
  name: string;
  phone: number;
}

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
  errorMsgRegister: string;
  isErrorRegister?: boolean;
  userProfile?: UserProfile;
}

const initialState: UserState = {
  jwt: loadStorageData(JWT_PERSISTENT_STATE)?.jwt ?? null,
  isError: false,
  isLoadingUser: false,
  errorMsg: "",
  errorMsgRegister: "",
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

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    params: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    const data = await register(params.email, params.password, params.name);

    if (Object.keys(data).includes("error")) {
      return rejectWithValue(data);
    }

    return data;
  }
);

export const getUserData = createAsyncThunk<
  UserProfile,
  void,
  { state: RootState }
>("user/getUserData", async (_, thunkApi) => {
  const jwt = thunkApi.getState().user.jwt;
  if (jwt) {
    const data = await getUser(`Bearer ${jwt}`);
    return data;
  }
});

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
    // login cases
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
    // get user data cases
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    // register cases
    builder.addCase(
      registerUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          access_token: string;
        }>
      ) => {
        state.jwt = action.payload.access_token;
        state.isErrorRegister = false;
        state.errorMsgRegister = "";
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      const data = action.payload as ErrorField;
      if (Array.isArray(data.message)) {
        state.errorMsgRegister = data.message.join(" ");
      } else {
        state.errorMsgRegister = data.message;
      }
      state.isErrorRegister = true;
    });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
