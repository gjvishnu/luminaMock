/**
 * Authentication is implemented through the RTK Query API layer.
 * These exports keep this module compatible with any older imports while
 * ensuring every request uses the documented `/api/users/*` endpoints.
 */
export { authApi, useLoginMutation, useLogoutMutation } from "../redux/api";
export type { LoginCredentials, LoginResponse } from "../redux/api";
