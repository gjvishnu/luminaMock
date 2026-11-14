import { type JobDetailRecord, useApplyForJobMutation, useGetJobQuery } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { CompanyLogo } from "../shared/CompanyLogo";
import { DetailMeta } from "../shared/DetailMeta";
import { EmptyState } from "../shared/EmptyState";
import { PageBreadcrumb } from "../shared/PageBreadcrumb";
import { RequireStudentRecord } from "../shared/RequireStudentRecord";
import { AboutRole } from "./AboutRole";
import { AiPlacementInsights } from "./AiPlacementInsights";
import { DetailSkills } from "./DetailSkills";
import { DocumentsCard } from "./DocumentsCard";
import { MatchCard } from "./MatchCard";
import { ReviewsCard } from "./ReviewsCard";
import { SelectionProcess } from "./SelectionProcess";
import { TipsCard } from "./TipsCard";
import { formatDate, formatDaysLeft, formatJobType, toJobListing } from "./jobHelpers";
import {
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  MapPin,
  Share2,
  X,
} from "lucide-react";
import { toast } from "material-react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ApplyStep = "closed" | "confirm" | "loading" | "success";

function getErrorStatus(error: unknown) {
  return typeof error === "object" && error !== null && "status" in error ? (error as { status: unknown }).status : undefined;
}

export function StudentJobDetails() {
  const { jobId = "" } = useParams();

  return (
    <RequireStudentRecord
      loadingLabel="Loading job..."
      emptyTitle="Complete your profile to view jobs"
      emptyDescription="Jobs are matched to your department, batch, CGPA and skills. Add your details to see and apply for jobs."
    >
      {(studentId) => <JobDetailsLoader key={jobId} roleId={jobId} studentId={studentId} />}
    </RequireStudentRecord>
  );
}

function JobDetailsLoader({ roleId, studentId }: { roleId: string; studentId: string }) {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetJobQuery({ roleId, studentId }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <ProfileLoading label="Loading job..." />;

  if (error) {
    // The API returns 404 both for unknown jobs and for jobs the student is no longer eligible for.
    if (getErrorStatus(error) === 404) {
      return (
        <div className="space-y-3 pb-5 text-slate-800">
          <PageBreadcrumb parentLabel="Jobs" to="/jobs" currentLabel="Job" />
          <EmptyState
            title="This job is not available"
            description="It may have closed, been removed, or you may no longer meet its eligibility criteria."
            actionLabel="Back to Jobs"
            onAction={() => navigate("/jobs")}
          />
        </div>
      );
    }
    return <ProfileLoadError message={getApiErrorMessage(error, "Unable to load this job.")} onRetry={() => void refetch()} />;
  }

  if (!data) return null;
  return <JobDetailsContent jobRecord={data} studentId={studentId} />;
}

function JobDetailsContent({ jobRecord, studentId }: { jobRecord: JobDetailRecord; studentId: string }) {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [applyStep, setApplyStep] = useState<ApplyStep>("closed");
  const [applyError, setApplyError] = useState("");
  // Set right after a successful apply, before the refetched job arrives with `application`.
  const [appliedAt, setAppliedAt] = useState<string | null>(null);
  const [applyForJob] = useApplyForJobMutation();

  const job = toJobListing(jobRecord);
  const applicationDate = jobRecord.application?.appliedAt ?? appliedAt;
  const applied = Boolean(applicationDate);
  const batches = jobRecord.eligibility.graduationYears;
  const tabs = [
    "Overview",
    "Job Description",
    "Eligibility",
    "About Company",
    "Reviews",
  ];

  const isModalOpen = applyStep !== "closed";
  const isLoading = applyStep === "loading";

  // Close on Escape (not while loading) and lock background scroll while the popup is open
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) setApplyStep("closed");
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen, isLoading]);

  const openModal = () => {
    setApplyError("");
    setApplyStep("confirm");
  };

  const closeModal = () => {
    if (isLoading) return; // don't allow dismissing mid-submit
    setApplyStep("closed");
  };

  const confirmApply = async () => {
    setApplyError("");
    setApplyStep("loading");

    try {
      const application = await applyForJob({ studentId, roleId: jobRecord.id }).unwrap();
      setAppliedAt(application.appliedAt);
      setApplyStep("success");
    } catch (error) {
      if (getErrorStatus(error) === 409) {
        // Already applied, e.g. from another tab.
        setAppliedAt(new Date().toISOString());
        setApplyStep("closed");
        toast.info("You have already applied for this job.");
        return;
      }
      setApplyError(getApiErrorMessage(error, "Unable to submit your application. Please try again."));
      setApplyStep("confirm");
    }
  };

  return (
    <div className="space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageBreadcrumb
          parentLabel="Jobs"
          to="/jobs"
          currentLabel={job.companyName}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold ${saved ? "border-cyan-300 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-700"}`}
          >
            <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save Job"}
          </button>
          <button
            type="button"
            aria-label="Share job"
            title="Share job"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>

      <section className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="flex items-center gap-5 p-4 sm:p-6">
          <CompanyLogo job={job} large />
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {job.role}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{job.companyName}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <DetailMeta icon={BriefcaseBusiness}>{formatJobType(jobRecord.jobType)}</DetailMeta>
              <DetailMeta icon={MapPin}>{job.location}</DetailMeta>
              <DetailMeta icon={FileText}>{job.ctc}</DetailMeta>
              {batches.length > 0 && (
                <DetailMeta icon={Clock3}>{batches.join(", ")} Batch</DetailMeta>
              )}
            </div>
            {jobRecord.eligibility.degree && (
              <span className="mt-4 inline-flex rounded bg-cyan-50 px-2 py-1 text-[10px] font-semibold text-cyan-600">
                {jobRecord.eligibility.degree}
              </span>
            )}
          </div>
        </div>
        <aside className="border-t border-slate-100 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold text-slate-700">
            Application Deadline
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <CalendarDays size={15} className="text-slate-500" />
            {job.applyBy}
          </p>
          {applied ? (
            <p className="mt-3 text-xs font-bold text-emerald-600">
              Applied on {formatDate(applicationDate!)}
            </p>
          ) : (
            job.daysLeft !== null && (
              <p className="mt-3 text-xs font-bold text-rose-500">
                {formatDaysLeft(job.daysLeft)}
              </p>
            )
          )}
          <button
            type="button"
            disabled={applied}
            onClick={openModal}
            className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-cyan-500 text-xs font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-emerald-500"
          >
            {applied ? (
              <>
                <CheckCircle2 size={14} /> Applied
              </>
            ) : (
              "Apply Now"
            )}
          </button>
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            <Bookmark size={14} /> Save for Later
          </button>
        </aside>
      </section>

      <nav
        className="flex overflow-x-auto border-b border-slate-200 bg-white"
        aria-label="Job details sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium transition first:pl-2 sm:px-5 ${activeTab === tab ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <AiPlacementInsights job={job} />

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_275px]">
        <main className="space-y-3">
          <SelectionProcess />
          <DetailSkills />
          <AboutRole job={job} />
        </main>
        <aside className="space-y-3">
          <MatchCard job={job} />
          <DocumentsCard />
          <TipsCard />
          <ReviewsCard />
        </aside>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            aria-busy={isLoading}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
          >
            {/* Close button hidden while submitting */}
            {!isLoading && (
              <button
                type="button"
                aria-label="Close"
                onClick={closeModal}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}

            {/* STEP 1: Confirm */}
            {applyStep === "confirm" && (
              <>
                {/* Icon + title on the same line */}
                <div className="flex items-center gap-3 pr-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
                    <CheckCircle2 size={22} />
                  </span>
                  <h2
                    id="apply-modal-title"
                    className="text-base font-bold text-slate-900 sm:text-lg"
                  >
                    Apply to {job.companyName}?
                  </h2>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  You are about to submit your application for{" "}
                  <span className="font-semibold text-slate-800">
                    {job.role}
                  </span>{" "}
                  at {job.companyName}. Your profile and uploaded documents
                  will be shared with the recruiter.
                </p>
                {jobRecord.applyBy && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[11px] leading-4 text-cyan-700">
                    <CalendarDays size={15} className="shrink-0" />
                    Applications close on {job.applyBy}
                    {job.daysLeft !== null && ` (${formatDaysLeft(job.daysLeft).toLowerCase()})`}.
                  </div>
                )}
                {applyError && (
                  <p role="alert" className="mt-3 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2.5 text-[11px] leading-4 text-rose-600">
                    {applyError}
                  </p>
                )}
                <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => void confirmApply()}
                    className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-600"
                  >
                    {applyError ? "Try Again" : "Yes, Apply"}
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Submitting */}
            {applyStep === "loading" && (
              <div className="flex flex-col items-center py-6 text-center">
                <Loader2
                  size={40}
                  className="animate-spin text-cyan-500"
                  aria-hidden="true"
                />
                <h2
                  id="apply-modal-title"
                  className="mt-4 text-base font-bold text-slate-900 sm:text-lg"
                >
                  Submitting your application…
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">
                  Please wait while we send your profile to {job.companyName}.
                </p>
              </div>
            )}

            {/* STEP 3: Success */}
            {applyStep === "success" && (
              <>
                <div className="flex items-center gap-3 pr-8">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <CheckCircle2 size={22} />
                  </span>
                  <h2
                    id="apply-modal-title"
                    className="text-base font-bold text-slate-900 sm:text-lg"
                  >
                    Applied successfully!
                  </h2>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  Your application for{" "}
                  <span className="font-semibold text-slate-800">
                    {job.role}
                  </span>{" "}
                  at {job.companyName} has been submitted. You can track its
                  status under Applications.
                </p>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
