import { type JobListParams, type JobListResponse, useGetJobsQuery } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { EmptyState } from "../shared/EmptyState";
import { JobFilter } from "../shared/JobFilter";
import { Pagination } from "../shared/Pagination";
import { RequireStudentRecord } from "../shared/RequireStudentRecord";
import { JobMobileCard } from "./JobMobileCard";
import { JobTableRow } from "./JobTableRow";
import { SORT_OPTIONS, formatJobType, toJobListing } from "./jobHelpers";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const ALL = {
  company: "All Companies",
  role: "All Roles",
  location: "All Locations",
  type: "All Job Types",
};

const MISSING_FIELD_LABELS: Record<string, string> = {
  cgpa: "CGPA",
  backlogs: "Backlogs",
  departmentId: "Department",
  batch: "Batch",
  skills: "Skills",
};

export function StudentJobs() {
  return (
    <RequireStudentRecord
      loadingLabel="Loading jobs..."
      emptyTitle="Complete your profile to see jobs"
      emptyDescription="Jobs are matched to your department, batch, CGPA and skills. Add your details to see the jobs you are eligible for."
    >
      {(studentId) => <JobsList studentId={studentId} />}
    </RequireStudentRecord>
  );
}

function JobsList({ studentId }: { studentId: string }) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ ...ALL, sort: SORT_OPTIONS[0].label });
  const [page, setPage] = useState(1);
  const [lastFilterOptions, setLastFilterOptions] = useState<JobListResponse["filterOptions"] | null>(null);

  const companies = lastFilterOptions?.companies ?? [];
  const jobTypes = lastFilterOptions?.jobTypes ?? [];

  const params: JobListParams = {
    studentId,
    companyId: companies.find((company) => company.name === filters.company)?.id,
    jobRole: filters.role === ALL.role ? undefined : filters.role,
    jobLocation: filters.location === ALL.location ? undefined : filters.location,
    jobType: jobTypes.find((type) => formatJobType(type) === filters.type),
    sortBy: SORT_OPTIONS.find((option) => option.label === filters.sort)?.value,
    page,
    pageSize: PAGE_SIZE,
  };

  const { data, isLoading, isFetching, error, refetch } = useGetJobsQuery(params, { refetchOnMountOrArgChange: true });

  // filterOptions does not depend on the selected filters, so keep the last one
  // to fill the dropdowns and to turn a selected company name back into its id.
  if (data && data.filterOptions !== lastFilterOptions) setLastFilterOptions(data.filterOptions);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters((current) => ({ ...current, ...ALL }));
    setPage(1);
  };

  const unique = (values: string[]) => [...new Set(values)];
  const filterOptions = {
    company: [ALL.company, ...unique(companies.map((company) => company.name))],
    role: [ALL.role, ...unique(lastFilterOptions?.jobRoles ?? [])],
    location: [ALL.location, ...unique(lastFilterOptions?.jobLocations ?? [])],
    type: [ALL.type, ...unique(jobTypes.map(formatJobType))],
  };

  const hasFilters = Object.entries(ALL).some(([key, value]) => filters[key as keyof typeof ALL] !== value);
  const jobs = (data?.data ?? []).map(toJobListing);
  const pagination = data?.pagination;
  const missingFields = data?.missingProfileFields ?? [];
  const openJob = (jobId: string) => navigate(`/jobs/${jobId}`);

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <JobFilter options={filterOptions.company} value={filters.company} onChange={(value) => updateFilter("company", value)} />
          <JobFilter options={filterOptions.role} value={filters.role} onChange={(value) => updateFilter("role", value)} />
          <JobFilter options={filterOptions.location} value={filters.location} onChange={(value) => updateFilter("location", value)} />
          <JobFilter options={filterOptions.type} value={filters.type} onChange={(value) => updateFilter("type", value)} />
        </div>
        <JobFilter
          className="w-full sm:w-44 lg:w-44"
          options={SORT_OPTIONS.map((option) => option.label)}
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
        />
      </div>

      {missingFields.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
            <span>
              Some jobs are hidden because your profile is missing:{" "}
              <strong>{missingFields.map((field) => MISSING_FIELD_LABELS[field] ?? field).join(", ")}</strong>.
            </span>
          </p>
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="shrink-0 self-start rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 sm:self-auto"
          >
            Complete Profile
          </button>
        </div>
      )}

      {isLoading ? (
        <ProfileLoading label="Loading jobs..." />
      ) : error ? (
        <ProfileLoadError message={getApiErrorMessage(error, "Unable to load jobs.")} onRetry={() => void refetch()} />
      ) : jobs.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No jobs match these filters" : "No jobs available right now"}
          description={
            hasFilters
              ? "Try a different company, role, location or job type."
              : "New jobs appear here as soon as placement drives you are eligible for are announced."
          }
          actionLabel={hasFilters ? "Clear filters" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className={`space-y-4 transition-opacity ${isFetching ? "opacity-60" : ""}`} aria-busy={isFetching}>
          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
            <div role="table" aria-label="Available jobs" className="min-w-[1050px]">
              <div
                role="row"
                className="grid grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] gap-4 rounded-t-xl bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
              >
                <span>Company</span>
                <span>Job Role</span>
                <span>Location</span>
                <span>CTC</span>
                <span>Apply By</span>
                <span>Match</span>
                <span />
              </div>
              {jobs.map((job) => (
                <JobTableRow key={job.id} job={job} onOpen={() => openJob(job.id)} />
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:hidden">
            {jobs.map((job) => (
              <JobMobileCard key={job.id} job={job} onOpen={() => openJob(job.id)} />
            ))}
          </div>

          {pagination && (
            <Pagination
              page={pagination.page}
              pageSize={pagination.pageSize}
              total={pagination.total}
              totalPages={pagination.totalPages}
              noun="job"
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
