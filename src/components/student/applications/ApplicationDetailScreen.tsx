import { applicationRows } from "../shared/data";
import { ApplicationDetailsView } from "./ApplicationDetailsView";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * Route-level wrapper for a single application. It resolves the application
 * from the `:applicationId` route param and renders the shared detail view, or
 * a friendly "not found" panel for an unknown id.
 *
 * The back action returns to the list the user came from
 * (`location.state.from`, set when "View Details" was clicked) and falls back
 * to `fallbackBackPath` when the route is opened directly or refreshed.
 */
export function ApplicationDetailScreen({
  readOnly = false,
  backLabel = "Back to Applications",
  fallbackBackPath,
}: {
  readOnly?: boolean;
  backLabel?: string;
  fallbackBackPath: string;
}) {
  const { applicationId } = useParams<{ applicationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const previousList = (location.state as { from?: string } | null)?.from;
  const backTo = previousList ?? fallbackBackPath;
  const application = applicationRows.find((row) => row.id === applicationId);

  if (!application) {
    return (
      <div className="space-y-4 pb-5 text-slate-800">
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-500"
        >
          <ArrowLeft size={15} />
          {backLabel}
        </button>
        <section className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-800">
            Application not found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            This application is not available or may have been removed.
          </p>
        </section>
      </div>
    );
  }

  return (
    <ApplicationDetailsView
      application={application}
      onBack={() => navigate(backTo)}
      backLabel={backLabel}
      readOnly={readOnly}
    />
  );
}
