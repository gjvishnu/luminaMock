import { type JobDetailRecord, useGetJobQuery } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { CompanyLogo } from "../shared/CompanyLogo";
import { DetailMeta } from "../shared/DetailMeta";
import { EmptyState } from "../shared/EmptyState";
import { PageBreadcrumb } from "../shared/PageBreadcrumb";
import { RequireStudentRecord } from "../shared/RequireStudentRecord";
import { AboutRole } from "./AboutRole";
import { ApplyJobDialog } from "./ApplyJobDialog";
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
  MapPin,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  // Set right after a successful apply, before the refetched job arrives with `application`.
  const [appliedAt, setAppliedAt] = useState<string | null>(null);

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
            onClick={() => setIsApplyOpen(true)}
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
          <SelectionProcess processes={jobRecord.selectionProcesses ?? []} />
          <DetailSkills skills={jobRecord.skills ?? []} />
          <AboutRole job={job} />
        </main>
        <aside className="space-y-3">
          <MatchCard job={job} />
          <DocumentsCard />
          <TipsCard />
          <ReviewsCard />
        </aside>
      </div>

      {isApplyOpen && (
        <ApplyJobDialog
          studentId={studentId}
          roleId={jobRecord.id}
          companyName={job.companyName}
          role={job.role}
          applyBy={jobRecord.applyBy}
          daysLeft={jobRecord.daysLeft}
          onApplied={setAppliedAt}
          onClose={() => setIsApplyOpen(false)}
        />
      )}
    </div>
  );
}
