import {
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Download,
  Eye,
  Pencil,
  RotateCcw,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import { CustomSelect } from "./CustomSelect";
import {
  type CompanyRecord,
  type DriveJobType,
  type DrivePagination,
  type DriveRecord,
  type DriveStatus,
  useDeleteDriveMutation,
  useGetCompaniesQuery,
  useGetDrivesQuery,
} from "../redux/api";

const stats = [
  {
    title: "Total Drives",
    value: "12",
    growth: "20%",
    icon: Building2,
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    title: "Upcoming Drives",
    value: "4",
    growth: "33%",
    icon: CalendarDays,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Applications",
    value: "1,248",
    growth: "18%",
    icon: Users,
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    title: "Completed Drives",
    value: "6",
    growth: "50%",
    icon: CircleCheckBig,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

type FilterOption = { value: string; label: string };

const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;
const SEARCH_MAX_LENGTH = 150;
const ALL_OPTION: FilterOption = { value: "All", label: "All" };

const toFilterOptions = (values: string[]): FilterOption[] => [
  ALL_OPTION,
  ...values.map((value) => ({ value, label: prettyEnum(value) })),
];

const driveStatusOptions = toFilterOptions(["DRAFT", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]);
const jobTypeOptions = toFilterOptions(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "APPRENTICESHIP"]);
const dateFilterOptions = toFilterOptions(["Today", "This Week", "This Month"]);

type DriveRole = NonNullable<DriveRecord["roles"]>[number];

function getCompanyId(company: CompanyRecord) {
  return String(company.companyUuid ?? company.companyId ?? company.id ?? "");
}

function getDriveId(drive: DriveRecord) {
  return String(drive.driveUuid ?? drive.driveId ?? drive.id ?? "");
}

function getCompanyName(drive: DriveRecord) {
  if (typeof drive.company === "string") return drive.company;
  return drive.company?.name ?? drive.companyName ?? "—";
}

function getRoleField(role: DriveRole | undefined, keys: string[]) {
  if (!role) return undefined;
  const record = role as Record<string, unknown>;
  return keys.map((key) => record[key]).find((value) => value !== undefined && value !== null && value !== "");
}

function getRoleName(role: DriveRole | undefined) {
  const value = getRoleField(role, ["jobRole", "role", "title", "name"]);
  return typeof value === "string" ? value : "—";
}

function getRoleCtc(role: DriveRole | undefined) {
  const value = getRoleField(role, ["ctcPackage", "ctc", "package"]);
  return typeof value === "string" || typeof value === "number" ? String(value) : "—";
}

function formatCtc(value: string) {
  if (value === "—" || /\blpa\b/i.test(value)) return value;
  return `${value} LPA`;
}

function getApiErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } | string }).data;
    if (typeof data === "string") return data;
    if (data?.message) return data.message;
  }

  return "Unable to delete this campus drive. Please try again.";
}

function getDriveNumber(drive: DriveRecord, keys: string[]) {
  const record = drive as Record<string, unknown>;
  const value = keys.map((key) => record[key]).find((item) => typeof item === "number");
  return typeof value === "number" ? value : undefined;
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

function prettyEnum(value?: string) {
  if (!value) return "—";
  return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getStatusStyle(status?: string) {
  switch (status) {
    case "ONGOING":
      return "bg-amber-100 text-amber-700";
    case "DRAFT":
      return "bg-slate-100 text-slate-600";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-rose-100 text-rose-600";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

function toDateParam(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function getDateParams(filter: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  if (filter === "Today") return { driveDate: toDateParam(today) };
  if (filter === "This Week") {
    return {
      driveDateFrom: toDateParam(today),
      driveDateTo: toDateParam(new Date(year, month, today.getDate() + 6)),
    };
  }
  if (filter === "This Month") {
    return {
      driveDateFrom: toDateParam(new Date(year, month, 1)),
      driveDateTo: toDateParam(new Date(year, month + 1, 0)),
    };
  }

  return {};
}

export const CampusDrive = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { data: companies } = useGetCompaniesQuery();
  const { data, error, isLoading, isFetching, refetch } = useGetDrivesQuery({
    page,
    pageSize: PAGE_SIZE,
    search: appliedSearch || undefined,
    companyId: companyFilter === "All" ? undefined : companyFilter,
    status: statusFilter === "All" ? undefined : statusFilter as DriveStatus,
    jobType: jobTypeFilter === "All" ? undefined : jobTypeFilter as DriveJobType,
    ...getDateParams(dateFilter),
  });

  // Deleting the last row of the last page leaves the current page out of range.
  const lastPage = Math.max(data?.pagination.totalPages ?? 1, 1);
  if (data && !isFetching && page > lastPage) {
    setPage(lastPage);
  }

  const companyOptions = useMemo(() => [
    ALL_OPTION,
    ...(companies ?? []).map((company) => ({ value: getCompanyId(company), label: company.name })),
  ], [companies]);

  useEffect(() => {
    const nextSearch = searchQuery.trim();
    if (nextSearch === appliedSearch) return;

    const timer = window.setTimeout(() => {
      setAppliedSearch(nextSearch);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [appliedSearch, searchQuery]);

  const changeFilter = (setFilter: (value: string) => void) => (value: string) => {
    setFilter(value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setCompanyFilter("All");
    setStatusFilter("All");
    setJobTypeFilter("All");
    setDateFilter("All");
    setPage(1);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="min-w-0 rounded-md border border-gray-200 bg-white px-1.5 py-2 shadow-sm sm:rounded-lg sm:px-3 sm:py-3">
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-3 sm:text-left">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10 sm:rounded-lg ${item.bg}`}>
                  <Icon size={13} className={`${item.iconColor} sm:h-5 sm:w-5`} />
                </div>
                <div className="min-w-0 w-full">
                  <p className="mt-1 truncate text-[7px] font-medium text-slate-500 sm:mt-0 sm:text-[12px]">{item.title}</p>
                  <h3 className="mt-0.5 text-[14px] font-bold leading-none text-slate-800 sm:text-[22px]">{item.value}</h3>
                  <div className="mt-1 flex items-center justify-center gap-0.5 whitespace-nowrap text-[6px] text-slate-400 sm:justify-start sm:gap-1 sm:text-[10px]">
                    <span className="hidden sm:inline">vs last Year</span>
                    <TrendingUp size={8} className="text-green-500 sm:h-[11px] sm:w-[11px]" />
                    <span className="font-semibold text-green-600">{item.growth}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/add_drives")}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"
        >
          <CalendarDays size={14} />
          Create Drive
        </button>
      </div>

      <div className="mt-3 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-sm sm:p-2.5">
        <div className="flex flex-wrap items-end gap-2 lg:flex-nowrap lg:gap-2.5">
          <div className="w-full lg:w-[210px] lg:shrink-0">
            <label className="mb-1 block text-[9px] font-medium text-slate-500">Search</label>
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                maxLength={SEARCH_MAX_LENGTH}
                placeholder="Search company, role, location, venue..."
                className="h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-1 focus:ring-blue-100"
              />
            </div>
          </div>

          <FilterDropdown label="Company" options={companyOptions} value={companyFilter} onChange={changeFilter(setCompanyFilter)} />
          <FilterDropdown label="Drive Status" options={driveStatusOptions} value={statusFilter} onChange={changeFilter(setStatusFilter)} />
          <FilterDropdown label="Job Type" options={jobTypeOptions} value={jobTypeFilter} onChange={changeFilter(setJobTypeFilter)} />
          <FilterDropdown label="Date" options={dateFilterOptions} value={dateFilter} onChange={changeFilter(setDateFilter)} />

          <button
            type="button"
            onClick={resetFilters}
            className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-cyan-200 bg-cyan-50 px-3 text-[11px] font-medium text-cyan-500 transition hover:bg-cyan-100"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-2">
        <DriveTable
          drives={data?.drives ?? []}
          pagination={data?.pagination}
          page={page}
          onPageChange={setPage}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          onRetry={refetch}
          onOpen={(drive) => {
            const id = getDriveId(drive);
            if (id) navigate(`/campusdrive/${id}`);
          }}
          onEdit={(drive) => {
            const id = getDriveId(drive);
            if (id) navigate(`/campusdrive/${id}/edit`);
          }}
        />
      </div>
    </div>
  );
};

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1 block text-[9px] font-medium text-slate-500">{label}</label>
      <CustomSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={label}
        buttonClassName="h-9 text-[11px] font-medium text-slate-700"
      />
    </div>
  );
}

function DriveTable({
  drives,
  pagination,
  page,
  onPageChange,
  isLoading,
  isFetching,
  error,
  onRetry,
  onOpen,
  onEdit,
}: {
  drives: DriveRecord[];
  pagination?: DrivePagination;
  page: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onRetry: () => void;
  onOpen: (drive: DriveRecord) => void;
  onEdit: (drive: DriveRecord) => void;
}) {
  const [driveToDelete, setDriveToDelete] = useState<DriveRecord | null>(null);
  const [deleteDrive, { isLoading: isDeleting }] = useDeleteDriveMutation();

  const total = pagination?.total ?? 0;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);
  const firstRow = drives.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastRow = drives.length === 0 ? 0 : firstRow + drives.length - 1;
  const firstVisiblePage = Math.max(1, Math.min(page - 2, totalPages - 4));
  const visiblePages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => firstVisiblePage + index);

  const handleDelete = async () => {
    const driveId = driveToDelete ? getDriveId(driveToDelete) : "";
    if (!driveId) return;

    try {
      await deleteDrive(driveId).unwrap();
      setDriveToDelete(null);
      toast.success("Campus drive deleted successfully.");
    } catch (deleteError) {
      toast.error(getApiErrorMessage(deleteError));
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
        <div>
          <h2 className="text-xs font-semibold text-slate-900 sm:text-base">Campus Drives</h2>
          {isFetching && !isLoading && <p className="mt-0.5 text-[10px] text-slate-400">Refreshing live data...</p>}
        </div>
        <button type="button" className="flex items-center gap-1.5 rounded-md border border-cyan-300 px-2.5 py-1.5 text-[10px] font-medium text-cyan-600 hover:bg-cyan-50 sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm">
          <Download size={13} className="sm:h-4 sm:w-4" />
          Export
        </button>
      </div>

      {isLoading ? (
        <div className="px-4 py-12 text-center text-sm text-slate-500">Loading campus drives...</div>
      ) : error ? (
        <div className="px-4 py-12 text-center">
          <p className="text-sm font-semibold text-rose-600">Unable to load campus drives.</p>
          <button type="button" onClick={onRetry} className="mt-3 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">Try again</button>
        </div>
      ) : drives.length === 0 ? (
        <div className="px-4 py-12 text-center text-sm text-slate-500">No campus drives found.</div>
      ) : (
        <div className="w-full overflow-x-auto max-h-[520px]">
          <table className="w-full min-w-[950px] border-collapse sm:min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                {[
                  "Company",
                  "Job Role",
                  "CTC",
                  "Month & Year",
                  "Eligible",
                  "Applied",
                  "Not Applied",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th key={heading} className={`px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-[11px] ${heading === "Actions" ? "text-center" : ""}`}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drives.map((drive, index) => {
                const role = drive.roles?.[0];
                const id = getDriveId(drive);
                const company = getCompanyName(drive);
                const eligible = getDriveNumber(drive, ["eligibleStudents", "eligible", "eligibleCount"]);
                const applied = getDriveNumber(drive, ["applications", "totalApplicants", "applied", "appliedCount"]);
                const notApplied = getDriveNumber(drive, ["notApplied", "notAppliedCount"]);
                const appliedPercent = eligible && applied !== undefined ? `${((applied / eligible) * 100).toFixed(1)}%` : null;
                const notAppliedPercent = eligible && notApplied !== undefined ? `${((notApplied / eligible) * 100).toFixed(1)}%` : null;
                const status = String(drive.status ?? "").toUpperCase();

                return (
                  <tr
                    key={`${id || company}-${role?.id ?? index}`}
                    onClick={() => onOpen(drive)}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && id) {
                        event.preventDefault();
                        onOpen(drive);
                      }
                    }}
                    tabIndex={id ? 0 : -1}
                    role={id ? "link" : undefined}
                    className={`${id ? "cursor-pointer" : ""} border-t border-gray-200 hover:bg-slate-50/60 focus:bg-cyan-50/40 focus:outline-none`}
                  >
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      <p className="text-[10px] font-semibold text-slate-900 sm:text-[12px]">{company}</p>
                      {typeof drive.company === "object" && drive.company?.location && <p className="text-[9px] text-slate-500 sm:text-xs">{drive.company.location}</p>}
                    </td>
                    <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-[12px]">{getRoleName(role)}</td>
                    <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-[12px]">{formatCtc(getRoleCtc(role))}</td>
                    <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-[12px]">{formatDate(drive.driveDate)}</td>
                    <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-[12px]">{eligible ?? "—"}</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-semibold text-slate-800 sm:text-[12px]">{applied ?? "—"}</span>
                        {appliedPercent && <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold text-green-700 sm:px-2 sm:py-1">{appliedPercent}</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-semibold text-slate-800 sm:text-[12px]">{notApplied ?? "—"}</span>
                        {notAppliedPercent && <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-semibold text-red-600 sm:px-2 sm:py-1">{notAppliedPercent}</span>}
                      </div>
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">
                      <span className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-semibold sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-[10px] ${getStatusStyle(status)}`}>{prettyEnum(status)}</span>
                    </td>
                    <td className="px-3 py-2 text-center sm:px-4 sm:py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          aria-label={`View ${company} drive`}
                          title="View drive"
                          disabled={!id}
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpen(drive);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-slate-500 hover:bg-slate-50 hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9 sm:rounded-lg"
                        >
                          <Eye size={14} className="sm:h-[16px] sm:w-[16px]" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Edit ${company} drive`}
                          title="Edit drive"
                          disabled={!id}
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(drive);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-slate-500 hover:bg-slate-50 hover:text-cyan-600 sm:h-9 sm:w-9 sm:rounded-lg"
                        >
                          <Pencil size={14} className="sm:h-[16px] sm:w-[16px]" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${company} drive`}
                          title="Delete drive"
                          disabled={!id}
                          onClick={(event) => {
                            event.stopPropagation();
                            setDriveToDelete(drive);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-rose-100 text-rose-500 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9 sm:rounded-lg"
                        >
                          <Trash2 size={14} className="sm:h-[16px] sm:w-[16px]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
        <p className="text-[10px] text-slate-500 sm:text-sm">Showing {firstRow} to {lastRow} of {total} drive{total === 1 ? "" : "s"}</p>
        <div className="flex items-center gap-1.5">
          <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={15} /></button>
          {visiblePages.map((pageNumber) => (
            <button key={pageNumber} type="button" aria-label={`Page ${pageNumber}`} aria-current={pageNumber === page ? "page" : undefined} onClick={() => onPageChange(pageNumber)} className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold ${pageNumber === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{pageNumber}</button>
          ))}
          <button type="button" aria-label="Next page" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={15} /></button>
        </div>
      </div>

      {driveToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4" role="presentation">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="delete-drive-title">
            <h2 id="delete-drive-title" className="text-base font-bold text-slate-900">Delete campus drive?</h2>
            <p className="mt-2 text-sm text-slate-500">Are you sure you want to delete the {getCompanyName(driveToDelete)} drive? This action cannot be undone.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setDriveToDelete(null)} disabled={isDeleting} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">Cancel</button>
              <button type="button" onClick={handleDelete} disabled={isDeleting} className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
