import api from "./axiosInstance";

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
  const { data } = await api.post<LoginResponse>("/login", credentials, {
    baseURL: USER_SERVICE_ORIGIN,
  });

  return data;
}
