import axios from "axios";
import { ApiError, parseApiError } from "./apiError";

const api = axios.create({
  withCredentials: true,
  timeout: 10000,
});

/**
 * Login API for the user service.
 *
 * Source of truth: services/userService/API.md
 *
 * - `POST /login` is public and is served from the service root
 *   (http://localhost:3000/login). It is not part of the "/api" scope used by
 *   the shared axiosInstance baseURL, so the request overrides baseURL.
 * - A successful login returns a token plus the user, and also sets an
 *   HttpOnly `access_token` cookie that the protected endpoints require.
 *   Axios sends that cookie because axiosInstance has withCredentials enabled.
 */
const USER_SERVICE_ORIGIN = "http://localhost:3000";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginUser = {
  id: number;
  email: string;
  role: string;
  regno: string | null;
};

export type LoginResponse = {
  message: string;
  token: string;
  user: LoginUser;
};

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const trimmedEmail = credentials?.email?.trim();
  const password = credentials?.password;

  if (!trimmedEmail || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

  try {
    const { data } = await api.post<LoginResponse>(
      "/login",
      { email: trimmedEmail, password },
      {
        baseURL: USER_SERVICE_ORIGIN,
      }
    );

    if (!data || typeof data !== "object") {
      throw new ApiError(500, "Received an unexpected response from the server.");
    }

    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("[authService.login failed]:", error);
    }
    throw parseApiError(error);
  }
}
