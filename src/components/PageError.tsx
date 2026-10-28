import { useNavigate } from "react-router-dom";
import { Clock3, House, MessageSquareText, RefreshCw, TriangleAlert, Wifi, CircleHelp } from "lucide-react";

type PageErrorProps = {
  onRetry?: () => void;
};

export const PageError = ({ onRetry }: PageErrorProps) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  return (
    <div
      role="alert"
      className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-10 text-center"
    >
      <div
        aria-hidden="true"
        className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-50"
      >
        <TriangleAlert size={56} className="text-cyan-500" strokeWidth={1.8} />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
        We couldn&apos;t load this page. This might be a temporary issue.
        Please try again in a moment.
      </p>

      <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleRetry}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-white px-6 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50"
        >
          <House size={16} />
          Go to Dashboard
        </button>
        {/* TODO: wire the support destination later — UI only for now. */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-cyan-200 bg-white px-6 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50"
        >
          <CircleHelp size={16} />
          Contact Support
        </button>
      </div>

      <div className="mt-10 w-full border-t border-slate-200 pt-6 text-left">
        <p className="text-sm font-semibold text-slate-600">
          If the problem persists:
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50">
                <Wifi size={18} className="text-cyan-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Check your connection
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Ensure you have a stable internet connection.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <Clock3 size={18} className="text-purple-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Try again later
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The server might be temporarily unavailable.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <MessageSquareText size={18} className="text-emerald-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Contact support
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Reach out to the team if the issue continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
