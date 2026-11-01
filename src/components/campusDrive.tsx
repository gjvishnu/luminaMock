import {
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheckBig,
  Download,
  Pencil,
  RotateCcw,
  Search,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { type DriveRecord, useDeleteDriveMutation, useGetDrivesQuery } from "../redux/api";

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

const driveStatuses = ["All", "DRAFT", "UPCOMING", "ONGOING"];
const dateFilters = ["All", "Today", "This Week", "This Month"];

type DriveRole = NonNullable<DriveRecord["roles"]>[number];

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

function getRoleDepartments(role: DriveRole | undefined) {
  const departments = role?.departments as unknown;
  if (!Array.isArray(departments)) return [];

  return departments.map((department) => {
    if (typeof department === "string") return department;
    if (department && typeof department === "object") {
      const record = department as Record<string, unknown>;
      const name = record.name ?? record.departmentName ?? record.department;
      return typeof name === "string" ? name : "";
    }
    return "";
  }).filter(Boolean);
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
    default:
      return "bg-blue-100 text-blue-700";
  }
}

function isWithinDateFilter(value: string | undefined, filter: string) {
  if (filter === "All") return true;
  if (!value) return false;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const driveDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const differenceInDays = Math.floor((driveDay.getTime() - startOfToday.getTime()) / 86400000);

  if (filter === "Today") return differenceInDays === 0;
  if (filter === "This Week") return differenceInDays >= 0 && differenceInDays < 7;
  if (filter === "This Month") {
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
  }

  return true;
}

export const CampusDrive = () => {
  const navigate = useNavigate();
  const { data: drives = [], error, isLoading, isFetching, refetch } = useGetDrivesQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [jobRoleFilter, setJobRoleFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const departmentOptions = useMemo(() => {
    const values = drives.flatMap((drive) => (drive.roles ?? []).flatMap((role) => getRoleDepartments(role)));
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [drives]);

  const jobRoleOptions = useMemo(() => {
    const values = drives.flatMap((drive) => (drive.roles ?? []).map((role) => getRoleName(role))).filter((value) => value !== "—");
    return ["All", ...Array.from(new Set(values)).sort()];
  }, [drives]);

  const filteredDrives = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return drives.filter((drive) => {
      const roles = drive.roles ?? [];
      const company = getCompanyName(drive).toLowerCase();
      const jobRoles = roles.map((item) => getRoleName(item));
      const status = String(drive.status ?? "").toUpperCase();
      const departmentsForDrive = roles.flatMap((item) => getRoleDepartments(item));

      return (!query || company.includes(query) || jobRoles.some((jobRole) => jobRole.toLowerCase().includes(query)))
        && (statusFilter === "All" || status === statusFilter)
        && (departmentFilter === "All" || departmentsForDrive.includes(departmentFilter))
        && (jobRoleFilter === "All" || jobRoles.includes(jobRoleFilter))
        && isWithinDateFilter(drive.driveDate, dateFilter);
    });
  }, [dateFilter, departmentFilter, drives, jobRoleFilter, searchQuery, statusFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setJobRoleFilter("All");
    setDateFilter("All");
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
                placeholder="Search company or role..."
                className="h-9 w-full rounded-md border border-gray-200 bg-white pl-8 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-1 focus:ring-blue-100"
              />
            </div>
          </div>

          <FilterDropdown label="Drive Status" options={driveStatuses} value={statusFilter} onChange={setStatusFilter} />
          <FilterDropdown label="Department" options={departmentOptions} value={departmentFilter} onChange={setDepartmentFilter} />
          <FilterDropdown label="Job Role" options={jobRoleOptions} value={jobRoleFilter} onChange={setJobRoleFilter} />
          <FilterDropdown label="Date" options={dateFilters} value={dateFilter} onChange={setDateFilter} />

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
          drives={filteredDrives}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
          onRetry={refetch}
          onOpen={(drive) => {
            const id = getDriveId(drive);
            if (id) navigate(`/campusdrive/${id}`);
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
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1 block text-[9px] font-medium text-slate-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-white px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition focus:border-blue-300 focus:ring-1 focus:ring-blue-100"
        >
          {options.map((option) => <option key={option} value={option}>{option === "All" ? option : prettyEnum(option)}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>
    </div>
  );
}

function DriveTable({
  drives,
  isLoading,
  isFetching,
  error,
  onRetry,
  onOpen,
}: {
  drives: DriveRecord[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  onRetry: () => void;
  onOpen: (drive: DriveRecord) => void;
}) {
  const [driveToDelete, setDriveToDelete] = useState<DriveRecord | null>(null);
  const [deleteDrive, { isLoading: isDeleting }] = useDeleteDriveMutation();

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
                    key={id || `${company}-${drive.driveDate ?? "unknown"}-${index}`}
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
                          aria-label={`Edit ${company} drive`}
                          title="Edit drive"
                          onClick={(event) => event.stopPropagation()}
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

      <div className="border-t border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
        <p className="text-[10px] text-slate-500 sm:text-sm">Showing {drives.length} drive{drives.length === 1 ? "" : "s"}</p>
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
