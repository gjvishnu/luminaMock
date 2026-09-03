import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Download,
  FileText,
  ListChecks,
  MapPin,
  MoreHorizontal,
  Pencil,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type DepartmentSummary = {
  department: string;
  eligible: number;
  applied: number;
  notApplied: number;
  shortlisted: number;
  inProgress: number;
  completed: number;
  selected: number;
  rejected: number;
  range: string;
};

type DriveDetail = {
  company: string;
  companyFull: string;
  role: string;
  ctc: string;
  date: string;
  time: string;
  venue: string;
  status: string;
  eligible: number;
  applied: number;
  notApplied: number;
  shortlisted: number;
  inProgress: number;
  completed: number;
  selected: number;
  rejected: number;
  departments: DepartmentSummary[];
  timeline: { time: string; title: string }[];
};

const tcsDepartments: DepartmentSummary[] = [
  { department: "CSE", eligible: 128, applied: 98, notApplied: 30, shortlisted: 48, inProgress: 24, completed: 16, selected: 8, rejected: 10, range: "110 – 150" },
  { department: "ECE", eligible: 96, applied: 74, notApplied: 22, shortlisted: 36, inProgress: 18, completed: 12, selected: 6, rejected: 8, range: "85 – 120" },
  { department: "EEE", eligible: 56, applied: 42, notApplied: 14, shortlisted: 20, inProgress: 10, completed: 6, selected: 3, rejected: 3, range: "50 – 65" },
  { department: "IT", eligible: 24, applied: 20, notApplied: 4, shortlisted: 10, inProgress: 5, completed: 3, selected: 2, rejected: 0, range: "20 – 30" },
  { department: "MECH", eligible: 12, applied: 10, notApplied: 2, shortlisted: 4, inProgress: 2, completed: 2, selected: 1, rejected: 1, range: "10 – 15" },
  { department: "Others", eligible: 4, applied: 4, notApplied: 0, shortlisted: 2, inProgress: 1, completed: 1, selected: 0, rejected: 0, range: "3 – 6" },
];

function scaledDepartments(
  eligibleTotal: number,
  appliedTotal: number,
  shortlistedTotal: number,
  inProgressTotal: number,
  completedTotal: number,
  selectedTotal: number,
  rejectedTotal: number,
): DepartmentSummary[] {
  const weights = tcsDepartments.map((department) => department.eligible / 320);
  const distribute = (total: number) => {
    let assigned = 0;
    return weights.map((weight, index) => {
      const value = index === weights.length - 1 ? total - assigned : Math.round(total * weight);
      assigned += value;
      return value;
    });
  };

  const eligible = distribute(eligibleTotal);
  const applied = distribute(appliedTotal);
  const shortlisted = distribute(shortlistedTotal);
  const inProgress = distribute(inProgressTotal);
  const completed = distribute(completedTotal);
  const selected = distribute(selectedTotal);
  const rejected = distribute(rejectedTotal);

  return tcsDepartments.map((department, index) => ({
    department: department.department,
    eligible: eligible[index],
    applied: applied[index],
    notApplied: eligible[index] - applied[index],
    shortlisted: shortlisted[index],
    inProgress: inProgress[index],
    completed: completed[index],
    selected: selected[index],
    rejected: rejected[index],
    range: `${Math.max(eligible[index] - 18, 1)} – ${eligible[index] + 22}`,
  }));
}

const tcsDetail: DriveDetail = {
  company: "TCS",
  companyFull: "Tata Consultancy Services",
  role: "Software Engineer",
  ctc: "₹7.5 LPA",
  date: "05 Sep 2026",
  time: "09:00 AM",
  venue: "Seminar Hall",
  status: "Upcoming",
  eligible: 320,
  applied: 248,
  notApplied: 72,
  shortlisted: 120,
  inProgress: 60,
  completed: 40,
  selected: 18,
  rejected: 50,
  departments: tcsDepartments,
  timeline: [
    { time: "09:00 AM", title: "Reporting" },
    { time: "09:30 AM", title: "Pre-Placement Talk" },
    { time: "10:30 AM", title: "Online Assessment" },
    { time: "01:00 PM", title: "Technical Interview" },
    { time: "03:30 PM", title: "HR Interview" },
    { time: "05:00 PM", title: "Results Announcement" },
  ],
};

const driveDetails: Record<string, DriveDetail> = {
  tcs: tcsDetail,
  infosys: {
    ...tcsDetail,
    company: "Infosys",
    companyFull: "Infosys Limited",
    role: "System Engineer",
    ctc: "₹6.5 LPA",
    date: "08 Sep 2026",
    time: "10:00 AM",
    venue: "Auditorium",
    eligible: 280,
    applied: 214,
    notApplied: 66,
    shortlisted: 102,
    inProgress: 50,
    completed: 35,
    selected: 16,
    rejected: 45,
    departments: scaledDepartments(280, 214, 102, 50, 35, 16, 45),
  },
  zoho: {
    ...tcsDetail,
    company: "Zoho",
    companyFull: "Zoho Corporation",
    role: "Developer",
    ctc: "₹6.0 LPA",
    date: "12 Sep 2026",
    time: "09:30 AM",
    venue: "Lab 3",
    eligible: 180,
    applied: 156,
    notApplied: 24,
    shortlisted: 90,
    inProgress: 36,
    completed: 25,
    selected: 14,
    rejected: 30,
    departments: scaledDepartments(180, 156, 90, 36, 25, 14, 30),
  },
  accenture: {
    ...tcsDetail,
    company: "Accenture",
    companyFull: "Accenture",
    role: "Analyst",
    ctc: "₹4.5 LPA",
    date: "20 Aug 2026",
    time: "10:00 AM",
    venue: "Main Block",
    status: "Completed",
    eligible: 410,
    applied: 324,
    notApplied: 86,
    shortlisted: 150,
    inProgress: 70,
    completed: 55,
    selected: 30,
    rejected: 65,
    departments: scaledDepartments(410, 324, 150, 70, 55, 30, 65),
  },
};

const summaryTabs = [
  "Applications Summary",
  "Shortlisted Students",
  "Interview In Progress",
  "Interview Completed",
  "Selected Students",
  "Not Applied Students",
];

const overviewSteps = [
  { label: "Eligible", key: "eligible", icon: Users, color: "text-blue-600", border: "border-blue-500" },
  { label: "Applied", key: "applied", icon: FileText, color: "text-emerald-600", border: "border-emerald-500" },
  { label: "Shortlisted", key: "shortlisted", icon: ListChecks, color: "text-cyan-500", border: "border-cyan-500" },
  { label: "Interview In Progress", key: "inProgress", icon: UserCheck, color: "text-orange-500", border: "border-orange-400" },
  { label: "Interview Completed", key: "completed", icon: ClipboardCheck, color: "text-blue-600", border: "border-blue-500" },
  { label: "Selected", key: "selected", icon: ShieldCheck, color: "text-emerald-600", border: "border-emerald-500" },
] as const;

const interviewStatus = [
  { label: "Not Started", key: "notStarted", color: "#dfe3ec" },
  { label: "Interview In Progress", key: "inProgress", color: "#ffb03b" },
  { label: "Interview Completed", key: "completed", color: "#4785ed" },
  { label: "Selected", key: "selected", color: "#4db87b" },
  { label: "Rejected", key: "rejected", color: "#ef5360" },
] as const;

const summaryCell = (value: number, total: number, color: string) => (
  <span className={`font-semibold ${color}`}>
    {value} <span className="text-[10px]">({total ? ((value / total) * 100).toFixed(1) : "0.0"}%)</span>
  </span>
);

export const DriveDetails = () => {
  const navigate = useNavigate();
  const { driveId } = useParams();
  const drive = driveDetails[driveId?.toLowerCase() ?? "tcs"] ?? tcsDetail;
  const [activeTab, setActiveTab] = useState(summaryTabs[0]);
  const notStarted = Math.max(drive.applied - drive.inProgress - drive.completed - drive.selected - drive.rejected, 0);
  const totalApplied = drive.applied;
  const donutData = [
    { id: 0, value: notStarted, label: "Not Started" },
    { id: 1, value: drive.inProgress, label: "Interview In Progress" },
    { id: 2, value: drive.completed, label: "Interview Completed" },
    { id: 3, value: drive.selected, label: "Selected" },
    { id: 4, value: drive.rejected, label: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-3 text-slate-800 sm:p-4">
      <div className="mx-auto w-full max-w-[1500px] space-y-3 pb-5">
      <button
        type="button"
        onClick={() => navigate("/campusdrive")}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-500"
      >
        <ArrowLeft size={15} />
        Back to Campus Drives
      </button>
      <section className="rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">
                {drive.company} – {drive.role} Drive
              </h1>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${drive.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-cyan-50 text-cyan-500"}`}>
                {drive.status}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-slate-400" />{drive.date}, {drive.time}</span>
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" />{drive.venue}</span>
              <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none text-slate-400">₹</span>{drive.ctc}</span>
              <span className="inline-flex items-center gap-1.5"><Building2 size={14} className="text-slate-400" />{drive.companyFull}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:h-9">
              <Pencil size={14} /> Edit Drive
            </button>
            <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-500 sm:h-9">
              <Download size={14} /> Download Report
            </button>
            <button type="button" aria-label="More drive actions" className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-50 sm:h-9 sm:w-9">
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-[1.55fr_1fr]">
        <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
          <h2 className="text-sm font-bold text-slate-900 sm:text-base">Application &amp; Selection Overview</h2>
          <div className="mt-4 overflow-x-auto pb-1">
            <div className="flex min-w-[690px] items-start justify-between gap-1 px-2">
              {overviewSteps.map((step, index) => {
                const Icon = step.icon;
                const value = drive[step.key];
                const percentage = step.key === "eligible"
                  ? "Eligible"
                  : `${((value / (step.key === "applied" ? drive.eligible : drive.applied)) * 100).toFixed(1)}%`;
                return (
                  <div key={step.key} className="flex min-w-0 flex-1 items-start">
                    <div className="flex min-w-[82px] flex-1 flex-col items-center text-center">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full border-2 bg-white ${step.border} ${step.color}`}>
                        <Icon size={20} />
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-800">{value}</p>
                      <p className="mt-0.5 max-w-[90px] text-[9px] font-medium leading-tight text-slate-500 sm:text-[10px]">{step.label}</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-400">{percentage}</p>
                    </div>
                    {index < overviewSteps.length - 1 && <ArrowRight size={22} className="mt-3 shrink-0 text-slate-300" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <InterviewStatusCard drive={drive} data={donutData} statuses={interviewStatus} totalApplied={totalApplied} />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1.05fr]">
        <DepartmentCard drive={drive} />
        <TimelineCard drive={drive} />
      </div>

      <ApplicationsSummary drive={drive} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

function InterviewStatusCard({
  drive,
  data,
  statuses,
  totalApplied,
}: {
  drive: DriveDetail;
  data: { id: number; value: number; label: string }[];
  statuses: typeof interviewStatus;
  totalApplied: number;
}) {
  return (
    <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="text-sm font-bold text-slate-900 sm:text-base">Interview Status</h2>
      <div className="mt-2 flex items-center justify-center gap-2 sm:justify-between sm:gap-4">
        <div className="relative flex shrink-0 items-center justify-center">
          <PieChart
            series={[{ data, innerRadius: 43, outerRadius: 80, paddingAngle: 1, cornerRadius: 1, arcLabel: () => "" }]}
            colors={statuses.map((status) => status.color)}
            width={190}
            height={180}
            hideLegend
            margin={{ top: 3, bottom: 3, left: 3, right: 3 }}
            slotProps={{ tooltip: { trigger: "none" } }}
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold leading-none text-slate-800">{totalApplied}</span>
            <span className="mt-1 text-[10px] font-semibold text-slate-500">Total Applied</span>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-2 pr-1">
          {statuses.map((status) => {
            const value = status.key === "notStarted"
              ? Math.max(drive.applied - drive.inProgress - drive.completed - drive.selected - drive.rejected, 0)
              : drive[status.key];
            return (
              <div key={status.key} className="flex min-w-0 items-center gap-2 text-[10px] font-medium text-slate-600 sm:text-[11px]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: status.color }} />
                <span className="min-w-0 flex-1 truncate">{status.label}</span>
                <span className="shrink-0 font-semibold text-slate-600">{value} ({totalApplied ? ((value / totalApplied) * 100).toFixed(1) : "0.0"}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DepartmentCard({ drive }: { drive: DriveDetail }) {
  const maxEligible = Math.max(...drive.departments.map((department) => department.eligible));
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-1.5">
        <h2 className="text-sm font-bold text-slate-900 sm:text-base">Department-wise Eligible Students</h2>
        <span className="text-[11px] font-bold text-cyan-500">ⓘ</span>
      </div>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="px-2 py-2 font-semibold">Department</th>
              <th className="px-2 py-2 font-semibold">Eligible Students</th>
              <th className="px-2 py-2 font-semibold">Range</th>
              <th className="px-2 py-2 text-right font-semibold">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {drive.departments.map((department) => (
              <tr key={department.department} className="border-b border-slate-100 last:border-0">
                <td className="px-2 py-1.5 font-medium text-slate-600">{department.department}</td>
                <td className="px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-7 shrink-0 font-semibold text-slate-700">{department.eligible}</span>
                    <span className="h-1.5 w-full max-w-[150px] rounded-full bg-slate-100">
                      <span className="block h-full rounded-full bg-cyan-500" style={{ width: `${(department.eligible / maxEligible) * 100}%` }} />
                    </span>
                  </div>
                </td>
                <td className="px-2 py-1.5 font-medium text-slate-600">{department.range}</td>
                <td className="px-2 py-1.5 text-right font-semibold text-slate-600">{((department.eligible / drive.eligible) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TimelineCard({ drive }: { drive: DriveDetail }) {
  return (
    <section className="min-w-0 w-[80%] rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="text-sm font-bold text-slate-900 sm:text-base">Schedule</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-[10px] sm:text-xs">
          <DetailLine label="Date" value={drive.date} />
          <DetailLine label="Venue" value={drive.venue} />
          <DetailLine label="Job Role" value={drive.role} />
          <DetailLine label="CTC" value={drive.ctc} />
          <DetailLine label="Openings" value="25" />
        </div>
      </div>
    </section>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 py-1.5 last:border-0">
      <span className="font-medium text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-700">{value}</span>
    </div>
  );
}

function ApplicationsSummary({
  drive,
  activeTab,
  onTabChange,
}: {
  drive: DriveDetail;
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto border-b border-gray-200 px-3 pt-2 sm:px-4">
        <div className="flex min-w-max gap-5">
          {summaryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`border-b-2 px-1 pb-2 pt-1 text-[10px] font-semibold transition sm:text-xs ${activeTab === tab ? "border-cyan-500 text-cyan-500" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto p-3 sm:p-4">
        <table className="w-full min-w-[1050px] border-collapse text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-700">
              <th className="px-2 py-2.5 font-semibold">Department</th>
              <th className="px-2 py-2.5 font-semibold">Eligible</th>
              <th className="px-2 py-2.5 font-semibold">Applied</th>
              <th className="px-2 py-2.5 font-semibold">Not Applied</th>
              <th className="px-2 py-2.5 font-semibold">Shortlisted</th>
              <th className="px-2 py-2.5 font-semibold">Interview In Progress</th>
              <th className="px-2 py-2.5 font-semibold">Interview Completed</th>
              <th className="px-2 py-2.5 font-semibold">Selected</th>
              <th className="px-2 py-2.5 font-semibold">Rejected</th>
              <th className="px-2 py-2.5 font-semibold">Application Rate</th>
            </tr>
          </thead>
          <tbody>
            {drive.departments.map((department) => (
              <tr key={department.department} className="border-b border-slate-100 last:border-0">
                <td className="px-2 py-2.5 font-medium text-slate-600">{department.department}</td>
                <td className="px-2 py-2.5 font-semibold text-slate-700">{department.eligible}</td>
                <td className="px-2 py-2.5">{summaryCell(department.applied, department.eligible, "text-emerald-600")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.notApplied, department.eligible, "text-rose-500")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.shortlisted, department.applied, "text-slate-600")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.inProgress, department.applied, "text-orange-500")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.completed, department.applied, "text-blue-600")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.selected, department.applied, "text-emerald-600")}</td>
                <td className="px-2 py-2.5">{summaryCell(department.rejected, department.applied, "text-rose-500")}</td>
                <td className="px-2 py-2.5 font-semibold text-emerald-600">{((department.applied / department.eligible) * 100).toFixed(1)}%</td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold text-slate-800">
              <td className="px-2 py-2.5">Total</td>
              <td className="px-2 py-2.5">{drive.eligible}</td>
              <td className="px-2 py-2.5 text-emerald-600">{drive.applied} ({((drive.applied / drive.eligible) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-rose-500">{drive.notApplied} ({((drive.notApplied / drive.eligible) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5">{drive.shortlisted} ({((drive.shortlisted / drive.applied) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-orange-500">{drive.inProgress} ({((drive.inProgress / drive.applied) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-blue-600">{drive.completed} ({((drive.completed / drive.applied) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-emerald-600">{drive.selected} ({((drive.selected / drive.applied) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-rose-500">{drive.rejected} ({((drive.rejected / drive.applied) * 100).toFixed(1)}%)</td>
              <td className="px-2 py-2.5 text-emerald-600">{((drive.applied / drive.eligible) * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
