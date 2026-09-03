import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  Filter,
  ListChecks,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState, type ElementType } from "react";

type ReportMetric = {
  title: string;
  value: string;
  change: string;
  icon: ElementType;
  tone: string;
};

type DriveHistoryRow = {
  company: string;
  totalDrives: number;
  conducted: [number, number, number];
  applications: string;
  placed: number;
  rejected: number;
  rejectionCount: number;
  reasons: string[];
};

type PipelineStage = {
  label: string;
  value: number;
  caption: string;
  color: string;
  background: string;
  icon: ElementType;
};

type InterviewStatus = {
  label: string;
  value: number;
  color: string;
};

const reportMetrics: ReportMetric[] = [
  {
    title: "Companies Visited",
    value: "24",
    change: "26.3%",
    icon: BarChart3,
    tone: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Total Drives Conducted",
    value: "32",
    change: "33.3%",
    icon: FileText,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Total Applications",
    value: "3,842",
    change: "18.7%",
    icon: FileText,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    title: "Students Placed",
    value: "186",
    change: "21.6%",
    icon: UserCheck,
    tone: "bg-sky-50 text-sky-600",
  },
  {
    title: "Students Rejected",
    value: "578",
    change: "22.4%",
    icon: UserX,
    tone: "bg-rose-50 text-rose-600",
  },
  {
    title: "Placement Rate",
    value: "24.7%",
    change: "3.8%",
    icon: TrendingUp,
    tone: "bg-cyan-50 text-cyan-600",
  },
];

const driveHistory: DriveHistoryRow[] = [
  {
    company: "TCS",
    totalDrives: 6,
    conducted: [2, 2, 2],
    applications: "842",
    placed: 48,
    rejected: 112,
    rejectionCount: 112,
    reasons: ["Did not clear technical round (54),", "Low coding score (28), Poor communication (18),", "Other (12)"],
  },
  {
    company: "Infosys",
    totalDrives: 5,
    conducted: [1, 2, 2],
    applications: "689",
    placed: 36,
    rejected: 98,
    rejectionCount: 98,
    reasons: ["Did not clear technical round (48),", "Low coding score (26), Backlogs (15),", "Other (9)"],
  },
  {
    company: "Wipro",
    totalDrives: 4,
    conducted: [1, 1, 2],
    applications: "512",
    placed: 28,
    rejected: 74,
    rejectionCount: 74,
    reasons: ["Did not clear technical round (32),", "Low coding score (20), Poor communication (14),", "Other (8)"],
  },
  {
    company: "Cognizant",
    totalDrives: 3,
    conducted: [1, 1, 1],
    applications: "401",
    placed: 20,
    rejected: 61,
    rejectionCount: 61,
    reasons: ["Did not clear technical round (28),", "Low coding score (16), Backlogs (10),", "Other (7)"],
  },
  {
    company: "Accenture",
    totalDrives: 3,
    conducted: [1, 1, 1],
    applications: "367",
    placed: 18,
    rejected: 55,
    rejectionCount: 55,
    reasons: ["Did not clear technical round (26),", "Low coding score (14), Poor communication (9),", "Other (6)"],
  },
  {
    company: "Zoho",
    totalDrives: 2,
    conducted: [0, 1, 1],
    applications: "198",
    placed: 10,
    rejected: 28,
    rejectionCount: 28,
    reasons: ["Did not clear technical round (14),", "Low coding score (8), Backlogs (4),", "Other (2)"],
  },
  {
    company: "Capgemini",
    totalDrives: 2,
    conducted: [1, 0, 1],
    applications: "176",
    placed: 8,
    rejected: 24,
    rejectionCount: 24,
    reasons: ["Did not clear technical round (12),", "Low coding score (6), Poor communication (4),", "Other (2)"],
  },
  {
    company: "Others",
    totalDrives: 7,
    conducted: [2, 3, 2],
    applications: "657",
    placed: 18,
    rejected: 126,
    rejectionCount: 126,
    reasons: ["Various reasons"],
  },
];

 
const pipelineStages: PipelineStage[] = [
  { label: "Applications Received", value: 3842, caption: "100% of applications", color: "#2f7ef8", background: "#eff6ff", icon: FileText },
  { label: "Applications In Progress", value: 3078, caption: "80.1% of applications", color: "#6366f1", background: "#eef2ff", icon: ListChecks },
  { label: "Completed Outcomes", value: 764, caption: "19.9% of applications", color: "#f59e0b", background: "#fffbeb", icon: ClipboardCheck },
  { label: "Students Placed", value: 186, caption: "4.8% of applications", color: "#059669", background: "#ecfdf5", icon: ShieldCheck },
  { label: "Students Rejected", value: 578, caption: "15.0% of applications", color: "#f05262", background: "#fff1f2", icon: UserX },
];

const interviewStatuses: InterviewStatus[] = [
  { label: "Applications In Progress", value: 3078, color: "#dfe4ed" },
  { label: "Students Placed", value: 186, color: "#4db77f" },
  { label: "Students Rejected", value: 578, color: "#f05262" },
];

const interviewTotal = interviewStatuses.reduce((total, status) => total + status.value, 0);

const reportFilterOptions = {
  department: ["All Departments", "CSE", "ECE", "EEE", "IT", "MECH"],
  batch: ["All Batches", "2026", "2025", "2024"],
};

const initialReportFilters = {
  department: "All Departments",
  batch: "2026",
};

type ReportFilterKey = keyof typeof initialReportFilters;
 
export const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const [filters, setFilters] = useState(initialReportFilters);

  const updateFilter = (key: ReportFilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="min-h-full space-y-3 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <RecommendationFilter label="Department" value={filters.department} options={reportFilterOptions.department} onChange={(value) => updateFilter("department", value)} />
          <RecommendationFilter label="Batch" value={filters.batch} options={reportFilterOptions.batch} onChange={(value) => updateFilter("batch", value)} />
        </div>

        <div className="flex w-full gap-2 md:w-auto">
          <button
            type="button"
            onClick={() => setFilters(initialReportFilters)}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-200  text-gray-700 px-3 text-[10px] font-semibold  transition  sm:text-xs md:flex-none"
          >
            <Filter size={14} />
            Clear Filters
          </button>
          <button
            type="button"
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-[10px] font-semibold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50/40 sm:text-xs md:flex-none"
          >
            <Download size={14} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 xl:gap-3">
        {reportMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.title} className="min-w-0 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${metric.tone}`}>
                  <Icon size={21} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-slate-600 sm:text-xs">{metric.title}</p>
                  <p className="mt-1 text-xl font-bold leading-none text-slate-900 sm:text-2xl">{metric.value}</p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1 text-[9px] font-semibold text-emerald-600 sm:text-[10px]">
                <TrendingUp size={12} />
                <span>↑ {metric.change}</span>
               </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.45fr_1fr]">
        <ApplicationPipeline department={filters.department} batch={filters.batch} />
        <InterviewStatusCard />
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <h2 className="mb-3 text-sm font-bold text-slate-800 sm:text-base">Drive History</h2>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[1340px] border-collapse text-left text-[10px] sm:text-xs">
            <thead className="text-slate-700">
              <tr className="bg-slate-50">
                <TableHeader rowSpan={2}>Company</TableHeader>
                <TableHeader rowSpan={2}>Total Drives</TableHeader>
                <TableHeader colSpan={3}>Drives Conducted</TableHeader>
                <TableHeader rowSpan={2}>Total Applications</TableHeader>
                <TableHeader rowSpan={2}>Students Placed</TableHeader>
                <TableHeader rowSpan={2}>Students Rejected</TableHeader>
                 <TableHeader rowSpan={2}>Main Reasons</TableHeader>
                <TableHeader rowSpan={2}>Action</TableHeader>
              </tr>
              <tr className="bg-white">
                <TableHeader> 2024</TableHeader>
                <TableHeader> 2025</TableHeader>
                <TableHeader> 2026</TableHeader>
              </tr>
            </thead>

            <tbody>
              {driveHistory.map((row) => (
                <tr key={row.company} className="border-t border-slate-200 align-middle transition hover:bg-cyan-50/30">
                  <TableCell className="font-semibold">{row.company}</TableCell>
                  <TableCell className="text-center font-semibold">{row.totalDrives}</TableCell>
                  {row.conducted.map((count, index) => <TableCell key={`${row.company}-${index}`} className="text-center">{count}</TableCell>)}
                  <TableCell className="text-center font-semibold">{row.applications}</TableCell>
                  <TableCell className="text-center font-semibold">{row.placed}</TableCell>
                  <TableCell className="text-center font-semibold text-rose-500">{row.rejected}</TableCell>
                   <TableCell>
                    <div className="leading-tight text-slate-700">
                      {row.reasons.map((reason) => <p key={reason}>{reason}</p>)}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <button type="button" className="whitespace-nowrap font-semibold text-cyan-600 transition hover:text-cyan-800">View All</button>
                  </TableCell>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-slate-200 bg-slate-50 font-bold text-slate-800">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">32</TableCell>
                <TableCell className="text-center">9</TableCell>
                <TableCell className="text-center">11</TableCell>
                <TableCell className="text-center">12</TableCell>
                <TableCell className="text-center">3,842</TableCell>
                <TableCell className="text-center">186</TableCell>
                <TableCell className="text-center">578</TableCell>
                <TableCell className="text-center">578</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-3 flex flex-col gap-3 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <span>Showing 1 to 8 of 24 entries</span>
          <div className="flex items-center justify-between gap-1 sm:justify-end sm:gap-2">
            <PaginationButton aria-label="First page" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              «
            </PaginationButton>
            <PaginationButton aria-label="Previous page" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft size={14} />
            </PaginationButton>
            {[1, 2, 3].map((page) => (
              <PaginationButton key={page} onClick={() => setCurrentPage(page)} active={currentPage === page}>
                {page}
              </PaginationButton>
            ))}
            <PaginationButton aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages}>
              <ChevronRight size={14} />
            </PaginationButton>
            <button type="button" className="ml-2 inline-flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 font-medium text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/40">
              10 / page <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

function TableHeader({ children, colSpan, rowSpan }: { children: React.ReactNode; colSpan?: number; rowSpan?: number }) {
  return <th colSpan={colSpan} rowSpan={rowSpan} className="border-r border-slate-200 px-3 py-2.5 text-center font-semibold last:border-r-0">{children}</th>;
}

function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`border-r border-slate-100 px-3 py-3 last:border-r-0 ${className}`}>{children}</td>;
}

function PaginationButton({ children, active = false, disabled = false, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs transition ${active ? "border-cyan-500 bg-cyan-500 font-semibold text-white" : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/40"} disabled:cursor-not-allowed disabled:text-slate-300`}
      {...props}
    >
      {children}
    </button>
  );
}


function RecommendationFilter({
  label,
  value,
  options,
  onChange,
 }: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
 }) {
  return (
    <label className="min-w-0">
      <span className="mb-1 block text-[8px] font-semibold text-slate-700 sm:mb-1.5 sm:text-xs">{label}</span>
      <span className="relative block">
        <select value={value} onChange={(event) => onChange(event.target.value)} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-1 pr-4 text-[8px] font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:h-9 sm:px-2.5 sm:pr-7 sm:text-xs">
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500 sm:right-2 sm:h-[14px] sm:w-[14px]" />
      </span>
    </label>
  );
}

function ApplicationPipeline({ department, batch }: { department: string; batch: string }) {
  const scopeLabel = department === "All Departments" ? "All departments" : department;
  const batchLabel = batch === "All Batches" ? "All batches" : `Batch ${batch}`;

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">Application &amp; Placement Overview</h2>
          <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Track application progress and outcomes across the report</p>
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-700">24 companies · 32 drives</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">{scopeLabel} · {batchLabel}</span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex min-w-[690px] items-start justify-between gap-1 px-1 sm:min-w-0 sm:gap-0">
          {pipelineStages.map((stage, index) => {
            const Icon = stage.icon;

            return (
              <div key={stage.label} className="flex min-w-[92px] flex-1 items-start">
                <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] bg-white sm:h-14 sm:w-14" style={{ borderColor: stage.color, color: stage.color, backgroundColor: stage.background }}>
                    <Icon size={23} strokeWidth={2.2} />
                  </div>
                  <p className="mt-2.5 text-xl font-bold leading-none text-slate-800 sm:text-2xl">{stage.value.toLocaleString("en-IN")}</p>
                  <p className="mt-1.5 min-h-8 max-w-[108px] text-[10px] font-semibold leading-tight text-slate-600 sm:text-xs">{stage.label}</p>
                  <p className="mt-1 text-[10px] font-medium leading-tight text-slate-400 sm:text-xs">{stage.caption}</p>
                </div>
                {index < pipelineStages.length - 1 && <ArrowRight className="mt-4 shrink-0 text-slate-300 sm:mt-5" size={25} strokeWidth={2.2} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InterviewStatusCard() {
  const legend = interviewStatuses.map((status, index) => {
    const percent = (status.value / interviewTotal) * 100;
    const start = interviewStatuses.slice(0, index).reduce((total, previousStatus) => total + (previousStatus.value / interviewTotal) * 100, 0);

    return { ...status, percent, start, end: start + percent };
  });

  const donutBackground = `conic-gradient(${legend.map((status) => `${status.color} ${status.start}% ${status.end}%`).join(", ")})`;

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">Application Outcome Status</h2>
          <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Current outcome of all applications</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">24.7% placement rate</span>
      </div>

      <div className="mt-5 grid items-center gap-5 sm:grid-cols-[minmax(145px,0.8fr)_1fr] sm:gap-4">
        <div className="mx-auto flex h-[164px] w-[164px] items-center justify-center rounded-full p-[13px]" style={{ background: donutBackground }} role="img" aria-label="Application outcome breakdown">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
            <span className="text-2xl font-bold leading-none text-slate-800">{interviewTotal}</span>
            <span className="mt-1 text-[11px] font-semibold text-slate-500">Total Applications</span>
          </div>
        </div>

        <div className="space-y-3">
          {legend.map((status) => (
            <div key={status.label} className="flex items-center gap-2 text-[10px] sm:text-xs">
              <span className="h-3.5 w-3.5 shrink-0 rounded-[4px]" style={{ backgroundColor: status.color }} />
              <span className="min-w-0 flex-1 truncate font-semibold text-slate-600">{status.label}</span>
              <span className="shrink-0 font-bold text-slate-600">{status.value} ({status.percent.toFixed(1)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
