import { type ApplicationRecord, type ApplicationStatusValue, useGetApplicationsQuery } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { formatCtc, formatDate, formatJobType, getLogoText } from "../jobs/jobHelpers";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { EmptyState } from "../shared/EmptyState";
import { Pagination } from "../shared/Pagination";
import { RequireStudentRecord } from "../shared/RequireStudentRecord";
import type { ApplicationRow, ApplicationStatus } from "../shared/types";
import { ApplicationMobileCard } from "./ApplicationMobileCard";
import { ApplicationTableRow } from "./ApplicationTableRow";
import { AlertTriangle, BriefcaseBusiness, CheckCircle2, CircleMinus, Clock3, Search, Trophy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 10;
const SEARCH_DELAY_MS = 300;

const STATUS_ORDER: ApplicationStatusValue[] = ["APPLIED", "SHORTLISTED", "SELECTED", "REJECTED", "WITHDRAWN"];

const STATUS_META: Record<ApplicationStatusValue, { label: ApplicationStatus; icon: React.ElementType; tone: string }> = {
  APPLIED: { label: "Applied", icon: Clock3, tone: "bg-blue-50 text-blue-600" },
  SHORTLISTED: { label: "Shortlisted", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
  SELECTED: { label: "Selected", icon: Trophy, tone: "bg-violet-50 text-violet-600" },
  REJECTED: { label: "Rejected", icon: AlertTriangle, tone: "bg-rose-50 text-rose-600" },
  WITHDRAWN: { label: "Withdrawn", icon: CircleMinus, tone: "bg-slate-100 text-slate-600" },
};

// The API has no next-step data yet, so the "Next Step / Update" column is derived from the status.
function getNextStep(application: ApplicationRecord) {
  const updatedOn = formatDate(application.updatedAt);
  switch (application.status) {
    case "APPLIED":
      return { nextStep: "Awaiting shortlist", nextDate: "The placement cell is reviewing applications" };
    case "SHORTLISTED":
      return { nextStep: "Shortlisted for next round", nextDate: "The placement cell will share the next steps" };
    case "SELECTED":
      return { nextStep: "Selected", nextDate: `Updated on ${updatedOn}` };
    case "REJECTED":
      return { nextStep: "Not selected", nextDate: `Updated on ${updatedOn}` };
    case "WITHDRAWN":
      return { nextStep: "Application withdrawn", nextDate: `On ${updatedOn}` };
  }
}

function toApplicationRow(application: ApplicationRecord): ApplicationRow {
  const { job } = application;
  return {
    id: application.id,
    company: job.company.name,
    companyName: job.company.name,
    logo: getLogoText(job.company.name),
    role: job.jobRole,
    location: job.jobLocation || "—",
    ctc: formatCtc(job.ctcPackage),
    jobType: job.jobType ? formatJobType(job.jobType) : undefined,
    appliedOn: formatDate(application.appliedAt),
    status: STATUS_META[application.status].label,
    updated: `Updated on ${formatDate(application.updatedAt)}`,
    ...getNextStep(application),
  };
}

function isStatusValue(value: string | null): value is ApplicationStatusValue {
  return STATUS_ORDER.includes(value as ApplicationStatusValue);
}

export function StudentApplications() {
  return (
    <RequireStudentRecord
      loadingLabel="Loading applications..."
      emptyTitle="Complete your profile to apply for jobs"
      emptyDescription="Add your details to see the jobs you are eligible for. Your applications will appear here."
    >
      {(studentId) => <ApplicationsList studentId={studentId} />}
    </RequireStudentRecord>
  );
}

function ApplicationsList({ studentId }: { studentId: string }) {
  const navigate = useNavigate();
  // Status and search live in the URL so coming back to this page keeps the same filters.
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const activeStatus = isStatusValue(statusParam) ? statusParam : null;
  const search = searchParams.get("search") ?? "";
  const [searchInput, setSearchInput] = useState(search);
  const [page, setPage] = useState(1);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(searchTimerRef.current), []);

  const { data, isLoading, isFetching, error, refetch } = useGetApplicationsQuery(
    {
      studentId,
      status: activeStatus ?? undefined,
      search: search || undefined,
      page,
      pageSize: PAGE_SIZE,
    },
    { refetchOnMountOrArgChange: true },
  );

  const applyFilters = (status: ApplicationStatusValue | null, nextSearch: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) params.set("status", status);
    else params.delete("status");
    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");
    setSearchParams(params, { replace: true });
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => applyFilters(activeStatus, value.trim()), SEARCH_DELAY_MS);
  };

  const clearFilters = () => {
    clearTimeout(searchTimerRef.current);
    setSearchInput("");
    applyFilters(null, "");
  };

  if (isLoading) return <ProfileLoading label="Loading applications..." />;
  if (error) {
    return <ProfileLoadError message={getApiErrorMessage(error, "Unable to load your applications.")} onRetry={() => void refetch()} />;
  }

  const counts = data?.statusCounts;
  if (counts && counts.ALL === 0) {
    return (
      <EmptyState
        title="You haven't applied for any jobs yet"
        description="Browse the jobs you are eligible for and apply. Your applications and their status will appear here."
        actionLabel="Browse Jobs"
        onAction={() => navigate("/jobs")}
      />
    );
  }

  const records = data?.data ?? [];
  const rows = records.map(toApplicationRow);
  const hasFilters = Boolean(activeStatus || search);

  // There is no single-application API yet, so "View Details" opens the job.
  const openApplication = (applicationId: string) => {
    const record = records.find((item) => item.id === applicationId);
    if (record) navigate(`/jobs/${record.job.id}`);
  };

  const summaryCards = [
    { label: "Total Applications", value: counts?.ALL ?? 0, icon: BriefcaseBusiness, tone: "bg-violet-50 text-violet-600" },
    ...STATUS_ORDER.map((status) => ({ ...STATUS_META[status], value: counts?.[status] ?? 0 })),
  ];

  const tabs: { status: ApplicationStatusValue | null; label: string; count: number }[] = [
    { status: null, label: "All", count: counts?.ALL ?? 0 },
    ...STATUS_ORDER.map((status) => ({ status, label: STATUS_META[status].label, count: counts?.[status] ?? 0 })),
  ];

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((summary) => {
          const Icon = summary.icon;

          return (
            <section
              key={summary.label}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${summary.tone}`}>
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">{summary.label}</p>
                <p className="mt-1 text-2xl font-bold leading-none text-slate-800">{summary.value}</p>
              </div>
            </section>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {tabs.map((tab) => {
              const active = activeStatus === tab.status;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => applyFilters(tab.status, search)}
                  className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold transition sm:px-4 ${active ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <label className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchInput}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search by company, role or location..."
                className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
              >
                <X size={15} /> Clear
              </button>
            )}
          </div>
        </div>

        <div className={`transition-opacity ${isFetching ? "opacity-60" : ""}`} aria-busy={isFetching}>
          <div className="hidden overflow-x-auto lg:block">
            <div role="table" aria-label="Applications" className="min-w-[1020px]">
              <div
                role="row"
                className="grid grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] gap-4 bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
              >
                <span>Company &amp; Role</span>
                <span>Applied On</span>
                <span>Current Status</span>
                <span>Next Step / Update</span>
                <span>Action</span>
              </div>
              {rows.map((application) => (
                <ApplicationTableRow key={application.id} application={application} onView={openApplication} />
              ))}
            </div>
          </div>

          <div className="space-y-3 p-3 lg:hidden">
            {rows.map((application) => (
              <ApplicationMobileCard key={application.id} application={application} onView={openApplication} />
            ))}
          </div>

          {rows.length === 0 && (
            <p className="px-4 py-10 text-center text-xs text-slate-500">
              No applications match your filters.
            </p>
          )}
        </div>
      </section>

      {data?.pagination && (
        <Pagination
          page={data.pagination.page}
          pageSize={data.pagination.pageSize}
          total={data.pagination.total}
          totalPages={data.pagination.totalPages}
          noun="application"
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
