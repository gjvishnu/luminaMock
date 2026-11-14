import { useApplyForJobMutation } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { formatDate, formatDaysLeft } from "./jobHelpers";
import { CalendarDays, CheckCircle2, Loader2, X } from "lucide-react";
import { toast } from "material-react-toastify";
import { useEffect, useState } from "react";

type ApplyStep = "confirm" | "loading" | "success";

function getErrorStatus(error: unknown) {
  return typeof error === "object" && error !== null && "status" in error ? (error as { status: unknown }).status : undefined;
}

/**
 * Confirm -> submit -> success popup for POST /api/applications.
 * Used by the job details page and the dashboard's Upcoming & Ongoing Drives card.
 */
export function ApplyJobDialog({
  studentId,
  roleId,
  companyName,
  role,
  applyBy,
  daysLeft,
  onApplied,
  onClose,
}: {
  studentId: string;
  roleId: string;
  companyName: string;
  role: string;
  /** ISO date from the API, or null when the drive has no apply-by date. */
  applyBy: string | null;
  daysLeft: number | null;
  onApplied?: (appliedAt: string) => void;
  onClose: () => void;
}) {
  const [step, setStep] = useState<ApplyStep>("confirm");
  const [error, setError] = useState("");
  const [applyForJob] = useApplyForJobMutation();
  const isLoading = step === "loading";

  const close = () => {
    if (!isLoading) onClose(); // don't allow dismissing mid-submit
  };

  // Close on Escape (not while loading) and lock background scroll while open
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading, onClose]);

  const confirmApply = async () => {
    setError("");
    setStep("loading");

    try {
      const application = await applyForJob({ studentId, roleId }).unwrap();
      onApplied?.(application.appliedAt);
      setStep("success");
    } catch (applyError) {
      if (getErrorStatus(applyError) === 409) {
        // Already applied, e.g. from another tab.
        onApplied?.(new Date().toISOString());
        toast.info("You have already applied for this job.");
        onClose();
        return;
      }
      setError(getApiErrorMessage(applyError, "Unable to submit your application. Please try again."));
      setStep("confirm");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        aria-busy={isLoading}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-xl sm:p-6"
      >
        {/* Close button hidden while submitting */}
        {!isLoading && (
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}

        {/* STEP 1: Confirm */}
        {step === "confirm" && (
          <>
            <div className="flex items-center gap-3 pr-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
                <CheckCircle2 size={22} />
              </span>
              <h2 id="apply-modal-title" className="text-base font-bold text-slate-900 sm:text-lg">
                Apply to {companyName}?
              </h2>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              You are about to submit your application for{" "}
              <span className="font-semibold text-slate-800">{role}</span> at {companyName}. Your profile and uploaded
              documents will be shared with the recruiter.
            </p>
            {applyBy && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[11px] leading-4 text-cyan-700">
                <CalendarDays size={15} className="shrink-0" />
                Applications close on {formatDate(applyBy)}
                {daysLeft !== null && daysLeft >= 0 && ` (${formatDaysLeft(daysLeft).toLowerCase()})`}.
              </div>
            )}
            {error && (
              <p role="alert" className="mt-3 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2.5 text-[11px] leading-4 text-rose-600">
                {error}
              </p>
            )}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={close}
                className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void confirmApply()}
                className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-600"
              >
                {error ? "Try Again" : "Yes, Apply"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Submitting */}
        {step === "loading" && (
          <div className="flex flex-col items-center py-6 text-center">
            <Loader2 size={40} className="animate-spin text-cyan-500" aria-hidden="true" />
            <h2 id="apply-modal-title" className="mt-4 text-base font-bold text-slate-900 sm:text-lg">
              Submitting your application…
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-slate-600">
              Please wait while we send your profile to {companyName}.
            </p>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === "success" && (
          <>
            <div className="flex items-center gap-3 pr-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 size={22} />
              </span>
              <h2 id="apply-modal-title" className="text-base font-bold text-slate-900 sm:text-lg">
                Applied successfully!
              </h2>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-600">
              Your application for <span className="font-semibold text-slate-800">{role}</span> at {companyName} has
              been submitted. You can track its status under Applications.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-600"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
