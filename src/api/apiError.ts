import axios from "axios";

/**
 * Standardized frontend API Error class.
 * Holds safe, user-friendly error messages and HTTP status codes.
 */
export class ApiError extends Error {
  public status?: number;
  public isNetworkError: boolean;
  public isTimeout: boolean;

  constructor(
    status?: number,
    message?: string,
    options?: { isNetworkError?: boolean; isTimeout?: boolean }
  ) {
    super(message || "An unexpected error occurred. Please try again.");
    this.name = "ApiError";
    this.status = status;
    this.isNetworkError = Boolean(options?.isNetworkError);
    this.isTimeout = Boolean(options?.isTimeout);
  }
}

/**
 * Safely extracts a server-provided error message if it is safe for display.
 * Avoids leaking raw stack traces, database details, or sensitive server internals.
 */
function extractSafeServerMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const payload = data as Record<string, unknown>;
  const rawMessage = payload.message || payload.error;

  if (typeof rawMessage === "string" && rawMessage.trim()) {
    const lower = rawMessage.toLowerCase();
    // Exclude technical/sensitive keywords that shouldn't be shown to end users
    const isSensitive =
      lower.includes("sql") ||
      lower.includes("stack trace") ||
      lower.includes("syntax error") ||
      lower.includes("database") ||
      lower.includes("at line") ||
      lower.includes("token");

    if (!isSensitive) {
      return rawMessage.trim();
    }
  }

  return null;
}

/**
 * Parses any caught error (Axios, Network, DOMException, or Error)
 * into a safe, user-friendly ApiError.
 */
export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    // 1. Timeout error
    if (error.code === "ECONNABORTED" || error.message?.toLowerCase().includes("timeout")) {
      return new ApiError(
        408,
        "The request timed out. Please check your connection and try again.",
        { isTimeout: true }
      );
    }

    // 2. Network error / Server unreachable
    if (!error.response || error.code === "ERR_NETWORK") {
      return new ApiError(
        undefined,
        "Unable to connect to the server. Please check your network connection or try again later.",
        { isNetworkError: true }
      );
    }

    // 3. HTTP status response errors
    const status = error.response.status;
    const safeServerMessage = extractSafeServerMessage(error.response.data);

    switch (status) {
      case 400:
        return new ApiError(
          400,
          safeServerMessage || "Invalid request. Please check the submitted fields."
        );
      case 401:
        return new ApiError(
          401,
          safeServerMessage || "Invalid credentials or your session has expired."
        );
      case 403:
        return new ApiError(
          403,
          safeServerMessage || "Access denied. You do not have permission to perform this action."
        );
      case 404:
        return new ApiError(
          404,
          safeServerMessage || "The requested resource could not be found."
        );
      case 409:
        return new ApiError(
          409,
          safeServerMessage || "A record with this information already exists."
        );
      case 500:
      default:
        if (status >= 500) {
          return new ApiError(
            status,
            "An unexpected server error occurred. Please try again later."
          );
        }
        return new ApiError(
          status,
          safeServerMessage || "An unexpected error occurred. Please try again."
        );
    }
  }

  if (error instanceof Error) {
    return new ApiError(undefined, error.message || "An unexpected error occurred.");
  }

  return new ApiError(undefined, "An unexpected error occurred. Please try again.");
}
