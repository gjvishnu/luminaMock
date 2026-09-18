import {
  AlertTriangle,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleCheckBig,
  Download,
  Eye,
  RotateCcw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type MatchSplit = {
  high: number;
  medium: number;
  low: number;
};

type DepartmentEligibility = {
  department: string;
  range: string;
  value: number;
};

type RecommendationDrive = {
  slug: string;
  role: string;
  company: string;
  date: string;
  time: string;
  venue: string;
  eligible: number;
  status: string;
  match: MatchSplit;
  departments: DepartmentEligibility[];
};

const recommendationDrives: RecommendationDrive[] = [
  {
    slug: "tcs",
    role: "Software Engineer",
    company: "Tata Consultancy Services",
    date: "05 Sep 2026",
    time: "09:00 AM",
    venue: "Main Auditorium",
    eligible: 320,
    status: "Registration Open",
    match: { high: 224, medium: 64, low: 32 },
    departments: [
      { department: "CSE", value: 128, range: "128 - 150" },
      { department: "ECE", value: 96, range: "90 - 110" },
      { department: "EEE", value: 56, range: "50 - 65" },
      { department: "IT", value: 24, range: "20 - 30" },
      { department: "MECH", value: 12, range: "10 - 15" },
      { department: "Others", value: 4, range: "3 - 6" },
    ],
  },
  {
    slug: "infosys",
    role: "System Engineer",
    company: "Infosys",
    date: "08 Sep 2026",
    time: "10:00 AM",
    venue: "Auditorium",
    eligible: 280,
    status: "Registration Open",
    match: { high: 182, medium: 70, low: 28 },
    departments: [
      { department: "CSE", value: 112, range: "112 - 130" },
      { department: "ECE", value: 90, range: "80 - 95" },
      { department: "EEE", value: 55, range: "55 - 70" },
      { department: "IT", value: 20, range: "20 - 30" },
      { department: "MECH", value: 8, range: "8 - 12" },
      { department: "Others", value: 5, range: "5 - 7" },
    ],
  },
  {
    slug: "zoho",
    role: "Developer",
    company: "Zoho Corporation",
    date: "12 Sep 2026",
    time: "09:30 AM",
    venue: "Lab 3",
    eligible: 180,
    status: "Registration Open",
    match: { high: 108, medium: 45, low: 27 },
    departments: [
      { department: "CSE", value: 82, range: "82 - 95" },
      { department: "IT", value: 40, range: "40 - 55" },
      { department: "ECE", value: 25, range: "25 - 35" },
      { department: "Others", value: 15, range: "10 - 15" },
    ],
  },
  {
    slug: "wipro",
    role: "Project Engineer",
    company: "Wipro",
    date: "18 Sep 2026",
    time: "09:00 AM",
    venue: "Seminar Hall",
    eligible: 240,
    status: "Upcoming",
    match: { high: 132, medium: 72, low: 36 },
    departments: [
      { department: "CSE", value: 95, range: "95 - 115" },
      { department: "ECE", value: 60, range: "60 - 75" },
      { department: "IT", value: 40, range: "40 - 55" },
      { department: "EEE", value: 25, range: "15 - 25" },
      { department: "Others", value: 20, range: "5 - 8" },
    ],
  },
  {
    slug: "accenture",
    role: "Associate Software Engineer",
    company: "Accenture",
    date: "20 Aug 2026",
    time: "09:00 AM",
    venue: "Main Block",
    eligible: 240,
    status: "Completed",
    match: { high: 205, medium: 123, low: 82 },
    departments: [
      { department: "CSE", value: 160, range: "160 - 180" },
      { department: "ECE", value: 110, range: "110 - 130" },
      { department: "IT", value: 70, range: "70 - 90" },
      { department: "MECH", value: 10, range: "10 - 20" },
      { department: "Others", value: 5, range: "5 - 10" },
    ],
  },
];

const initialFilters = {
  driveStatus: "All Drives",
  department: "All Departments",
  batch: "2026",
  jobRole: "All Roles",
  cgpa: "All",
  backlogs: "No Active Backlogs",
};

const filterOptions = {
  driveStatus: ["All Drives", "TCS", "HCL", "Google"],
  department: ["All Departments", "CSE", "ECE", "EEE", "IT", "MECH"],
  batch: ["2026", "2025", "2024"],
  jobRole: ["All Roles", "Software Engineer", "System Engineer", "Developer"],
 
};

const recommendationStats = [
  { title: "Total Drives", value: "18", caption: "All Drives", icon: Building2, tone: "bg-cyan-50 text-cyan-600" },
  { title: "Total Eligible Students", value: "1,248", caption: "Across all drives", icon: Users, tone: "bg-emerald-50 text-emerald-600" },
  { title: "Highest Match Students", value: "842", caption: "Best suited for roles", icon: ShieldCheck, tone: "bg-violet-50 text-violet-600" },
  { title: "Medium Match Students", value: "298", caption: "May require training", icon: CircleCheckBig, tone: "bg-orange-50 text-orange-500" },
  { title: "Low Match Students", value: "108", caption: "Not ideal fit", icon: AlertTriangle, tone: "bg-rose-50 text-rose-500" },
];

type FilterKey = keyof typeof initialFilters;

export const JDRecommendation = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="min-h-full space-y-3 pb-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
         
        <div className="flex items-center gap-2">
          <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <Download size={14} /> Export Report
          </button>
          <button type="button" onClick={() => setFilters(initialFilters)} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-500">
            <RotateCcw size={14} /> Reset Filters
          </button>
        </div>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-6">
          <RecommendationFilter label="Drives" value={filters.driveStatus} options={filterOptions.driveStatus} onChange={(value) => updateFilter("driveStatus", value)} />
          <RecommendationFilter label="Department" value={filters.department} options={filterOptions.department} onChange={(value) => updateFilter("department", value)} />
          <RecommendationFilter label="Batch" value={filters.batch} options={filterOptions.batch} onChange={(value) => updateFilter("batch", value)} />
          <RecommendationFilter label="Job Role" value={filters.jobRole} options={filterOptions.jobRole} onChange={(value) => updateFilter("jobRole", value)} />
         
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3 xl:grid-cols-5">
        {recommendationStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
              <div className="flex items-start gap-2.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.tone}`}><Icon size={21} /></div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-slate-600 sm:text-xs">{stat.title}</p>
                  <p className="mt-1 text-xl font-bold leading-none text-slate-900 sm:text-2xl">{stat.value}</p>
                  <p className="mt-2 truncate text-[10px] text-slate-500">{stat.caption}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <RecommendationTable
        drives={recommendationDrives}
        onDriveDetails={(slug) => navigate(`/campusdrive/${slug}`)}
        onViewStudents={(slug) => navigate(`/jdrecommendation/${slug}/students`)}
      />
    </div>
  );
};

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

function RecommendationTable({
  drives,
  onDriveDetails,
  onViewStudents,
}: {
  drives: RecommendationDrive[];
  onDriveDetails: (slug: string) => void;
  onViewStudents: (slug: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="w-[175px] border-b border-slate-200 px-3 py-3 font-semibold">Drive / Job Role</th>
              <th className="w-[165px] border-b border-slate-200 px-3 py-3 font-semibold">Drive Date &amp; Time</th>
              <th className="w-[145px] border-b border-slate-200 px-3 py-3 font-semibold">Eligible Students  </th>
              <th className="w-[245px] border-b border-slate-200 px-3 py-3 font-semibold"><span className="block">Match Distribution</span><span className="mt-1 block text-[9px] font-medium text-slate-500">● H / M / L</span></th>
              <th className="w-[385px] border-b border-slate-200 px-3 py-3 font-semibold">Department-wise Eligibility (Eligible Students) </th>
              <th className="w-[160px] border-b border-slate-200 px-3 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drive) => (
              <tr key={drive.slug} className="border-b border-slate-100 align-top last:border-0 hover:bg-slate-50/40">
                <td className="px-3 py-3">
                  <p className="font-bold text-slate-800">{drive.role}</p>
                  <p className="mt-2 text-[10px] font-medium text-slate-700">{drive.company}</p>
                  <span className={`mt-3 inline-flex rounded-md px-2 py-1 text-[9px] font-semibold ${drive.status === "Completed" ? "bg-slate-100 text-slate-600" : drive.status === "Upcoming" ? "bg-cyan-50 text-cyan-600" : "bg-emerald-50 text-emerald-600"}`}>{drive.status}</span>
                </td>
                <td className="px-3 py-3">
                  <p className="flex items-center gap-2 font-semibold text-slate-700"><CalendarDays size={14} />{drive.date}</p>
                   <p className="mt-3 flex items-center gap-2 font-medium text-slate-600"><Building2 size={14} />{drive.venue}</p>
                </td>
                <td className="px-3 py-3 text-center">
                  <p className="mt-6 text-xl font-bold text-slate-800">{drive.eligible}</p>
                  <button
                    type="button"
                    onClick={() => onViewStudents(drive.slug)}
                    className="mt-1 text-[10px] font-semibold text-cyan-500 hover:text-cyan-700 cursor-pointer"
                  >
                    View Eligible
                  </button>
                </td>
                <td className="px-3 py-3"><MatchDistribution match={drive.match} total={drive.match.high + drive.match.medium + drive.match.low} /></td>
                <td className="px-3 py-3"><DepartmentEligibility departments={drive.departments} /></td>
                <td className="px-3 py-3">
                  <div className="mt-4 flex flex-col items-stretch gap-2">
                    <button
                      type="button"
                      onClick={() => onViewStudents(drive.slug)}
                      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-cyan-500 px-2 text-[10px] font-semibold text-white transition hover:bg-cyan-600 cursor-pointer"
                    >
                      <Users size={13} /> View Students
                    </button>
                    <button
                      type="button"
                      onClick={() => onDriveDetails(drive.slug)}
                      className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 text-[10px] font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                    >
                      <Eye size={13} /> Drive Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-3 py-2.5 text-[10px] text-slate-500 sm:px-4 sm:text-xs">
        <span>Showing 1 to 5 of 18 drives</span>
        <div className="flex items-center gap-1">
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">«</button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400">‹</button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-500 bg-cyan-50 font-semibold text-cyan-500">1</button>
          {[2, 3, 4].map((page) => <button key={page} type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 font-medium text-slate-700">{page}</button>)}
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500">›</button>
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500">»</button>
          <button type="button" className="ml-3 inline-flex h-7 items-center gap-2 rounded-md border border-slate-200 px-2 font-medium text-slate-700">10 / page <ChevronDown size={13} /></button>
        </div>
      </div>
    </section>
  );
}

function MatchDistribution({ match, total }: { match: MatchSplit; total: number }) {
  const data = [
    { id: 0, value: match.high, label: "High" },
    { id: 1, value: match.medium, label: "Medium" },
    { id: 2, value: match.low, label: "Low" },
  ];
  return (
    <div className="flex items-center gap-2">
      <PieChart series={[{ data, innerRadius: 19, outerRadius: 34, paddingAngle: 1, cornerRadius: 1, arcLabel: () => "" }]} colors={["#58bd8f", "#ffbd22", "#ef555e"]} width={80} height={76} hideLegend margin={{ top: 2, bottom: 2, left: 2, right: 2 }} slotProps={{ tooltip: { trigger: "none" } }} />
      <div className="min-w-[122px] space-y-1.5">
        <MatchLegend label="High" value={match.high} total={total} color="bg-emerald-400" />
        <MatchLegend label="Medium" value={match.medium} total={total} color="bg-amber-400" />
        <MatchLegend label="Low" value={match.low} total={total} color="bg-rose-500" />
      </div>
    </div>
  );
}

function MatchLegend({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="w-14">{label} ({((value / total) * 100).toFixed(0)}%)</span>
      <span className="font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function DepartmentEligibility({ departments }: { departments: DepartmentEligibility[] }) {
  const maxValue = Math.max(...departments.map((department) => department.value));
  return (
    <div className="space-y-1.5">
      {departments.map((department) => (
        <div key={department.department} className="flex items-center gap-2 text-[10px] font-medium text-slate-700">
          <span className="w-8 shrink-0">{department.department}</span>
          <span className="h-1.5 flex-1 rounded-full bg-slate-100">
            <span className="block h-full rounded-full bg-cyan-500" style={{ width: `${(department.value / maxValue) * 100}%` }} />
          </span>
          <span className="w-[68px] shrink-0 text-right font-semibold text-slate-700">{department.range}</span>
        </div>
      ))}
    </div>
  );
}
