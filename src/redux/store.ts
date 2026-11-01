import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api";
import { AUTH_STORAGE_KEY, authReducer } from "./authSlice";
import { roleReducer } from "./roleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

store.subscribe(() => {
  if (typeof window === "undefined") {
    return;
  }

  const auth = store.getState().auth;
  if (auth.accessToken && auth.refreshToken && auth.user) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
