import type { AppDispatch } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProps {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface UserState {
  loading: boolean;
  user: UserProps | null;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
  isUpdate: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdate: false,
};

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // CREATE USER
    createUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createUserSuccess(state, action: PayloadAction<UserProps>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.message = "User created successfully!";
      state.error = null;
    },
    createUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    //LOAD USER
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    loadUserSuccess(state, action: PayloadAction<UserProps>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // LOGIN USER
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserProps>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // LOGOUT USER
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // UPDATE USER
    verifyTokenRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    verifyTokenSuccess(state, action: PayloadAction<UserProps>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    verifyTokenFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    //   CLEAR ERRORS
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const createUser =
  ({ name, email, password }: CreateUserProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.createUserRequest());
    console.log(name, email, password);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/institution/sign-up",
        { EMPRESA: name, EMAIL: email, PASSWORD: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch(userSlice.actions.createUserSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        userSlice.actions.createUserFailed(
          error.response.data.message || "Erro ao criar usuário"
        )
      );
    }
  };

export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get("http://localhost:3000/auth/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      userSlice.actions.loadUserFailed(
        error.response.data.message || "Erro ao carregar usuário"
      )
    );
  }
};

export const loginUser =
  ({ email, password }: LoginUserProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:3000/auth/login",
        { EMAIL: email, PASSWORD: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.loginSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        userSlice.actions.loginFailed(
          error.response.data.message || "Erro ao fazer login"
        )
      );
    }
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.post("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed("Erro ao fazer logout"));
  }
};

export const clearAllUserErrors = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
