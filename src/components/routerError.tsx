import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const RouterError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-gray-900">
          {error.status}
        </h1>

        <p className="mt-2 text-lg font-semibold text-gray-700">
          {error.statusText}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <h2>Something went wrong</h2>
    </div>
  );
};