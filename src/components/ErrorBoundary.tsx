import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: { error: Error; reset: () => void }) => ReactNode);
  onReset?: () => void;
  title?: string;
  description?: string;
  level?: "page" | "app";
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Reusable, class-based React Error Boundary component.
 * Catches render-time errors in child component trees and displays a graceful fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary caught an error]:", error, errorInfo);
    }
  }

  public handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error || new Error("Unknown error"),
          reset: this.handleReset,
        });
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isAppLevel = this.props.level === "app";

      return (
        <div
          role="alert"
          aria-live="assertive"
          className={`flex w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm ${
            isAppLevel ? "min-h-[500px] max-w-xl mx-auto my-12" : "min-h-[320px]"
          }`}
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <AlertTriangle size={24} strokeWidth={2} />
          </div>

          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            {this.props.title || (isAppLevel ? "Application Error" : "Unable to display this section")}
          </h2>

          <p className="mt-1.5 max-w-md text-xs text-slate-500">
            {this.props.description ||
              (isAppLevel
                ? "A critical error occurred while rendering the application. Please reload or return to the dashboard."
                : "An unexpected error occurred while loading this section. You can try again or use the navigation sidebar to visit another section.")}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 active:scale-95"
            >
              <RefreshCw size={14} />
              Try Again
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
