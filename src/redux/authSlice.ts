import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BackendRole = "ADMIN" | "PLACEMENT_OFFICER" | "STUDENT" | "RECRUITER";
export type UserStatus = "ACTIVE" | "INACTIVE";

export type AuthUser = {
  userUuid: string;
  email: string;
  role: BackendRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type AuthCredentials = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type AuthState = AuthCredentials | {
  accessToken: null;
  refreshToken: null;
  user: null;
};

const AUTH_STORAGE_KEY = "lumina.auth";
export const SESSION_EXPIRED_STORAGE_KEY = "lumina.sessionExpired";
export const SESSION_EXPIRED_MESSAGE = "Your session has expired. Please log in again.";

function getInitialAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { accessToken: null, refreshToken: null, user: null };
  }

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return { accessToken: null, refreshToken: null, user: null };
    }

    const parsed = JSON.parse(stored) as Partial<AuthCredentials>;
    if (parsed.accessToken && parsed.refreshToken && parsed.user) {
      return {
        accessToken: parsed.accessToken,
        refreshToken: parsed.refreshToken,
        user: parsed.user,
      };
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return { accessToken: null, refreshToken: null, user: null };
}

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_state, action: PayloadAction<AuthCredentials>) => action.payload,
    setUser: (state, action: PayloadAction<AuthUser>) => {
      if (state.accessToken && state.refreshToken) {
        state.user = action.payload;
      }
    },
    clearCredentials: () => ({
      accessToken: null,
      refreshToken: null,
      user: null,
    }),
  },
});

export const { setCredentials, setUser, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => Boolean(
  state.auth.accessToken && state.auth.user,
);

export { AUTH_STORAGE_KEY };
