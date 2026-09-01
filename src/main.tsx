import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import {
  ErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";


function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div>
      <h2>Something went wrong !</h2>

      <p>
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred"}
      </p>

      <button onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Error:", error);
        console.error("Error Info:", info);
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);