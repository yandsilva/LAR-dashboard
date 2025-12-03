import type { AppDispatch } from "@/store/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProps {
  ABOUT?: string;
  EMAIL: string;
  NAME: string;
  FACEBOOK?: string;
  ID: string;
  IMAGE?: string;
  INSTAGRAM?: string;
  LINKEDIN?: string;
  PHONE?: string;
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

interface UpdatePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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

    //UPDATE PASSWORD
    updatePassworRequest(state) {
      state.loading = true;
      state.error = null;
      state.isUpdate = false;
    },
    updatePasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isUpdate = true;
      state.error = null;
      state.message = action.payload;
    },
    updatePasswordFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isUpdate = false;
      state.error = action.payload;
    },

    // UPDATE USER
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdate = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdate = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdate = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdate = false;
      state.message = null;
    },

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

    try {
      const { data } = await axios.post(
        "https://lar-backend.onrender.com/institution/sign-up",
        { EMPRESA: name, EMAIL: email, PASSWORD: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.createUserSuccess(data));
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
    const { data } = await axios.get(
      "https://lar-backend.onrender.com/auth/me",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.loadUserSuccess(data));
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
        "https://lar-backend.onrender.com/auth/login",
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
    const { data } = await axios.post(
      "https://lar-backend.onrender.com/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed("Erro ao fazer logout"));
  }
};

export const updatePassword =
  ({ currentPassword, newPassword, confirmPassword }: UpdatePasswordProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.updatePassworRequest());
    try {
      const { data } = await axios.put(
        "https://lar-backend.onrender.com/institution/change-password",
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(
          "Erro ao atualizar a senha do usuário"
        )
      );
    }
  };

export const updateProfile =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
      const response = await axios.put(
        "https://lar-backend.onrender.com/institution/update-profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        userSlice.actions.updateProfileFailed(error.response.data.message)
      );
    }
  };

export const resetProfile = () => (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
