import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export const RouterError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let description = "The page you're looking for doesn't exist.";
    if (error.status === 401) {
      description = "You must be authenticated to view this page.";
    } else if (error.status === 403) {
      description = "Access forbidden. You do not have permission to view this page.";
    } else if (error.status === 500) {
      description = "A server error occurred while loading this page.";
    }

    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          {error.status}
        </h1>

        <p className="mt-2 text-lg font-semibold text-gray-700">
          {error.statusText || "Routing Error"}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

        <button
          type="button"
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
        <AlertCircle size={26} strokeWidth={2} />
      </div>
      <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
      <p className="mt-1 max-w-md text-sm text-gray-500">
        An unexpected error occurred while loading this page. Please try returning to the dashboard.
      </p>
      <button
        type="button"
        onClick={() => (window.location.href = "/dashboard")}
        className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        Go to Dashboard
      </button>
    </div>
  );
};
