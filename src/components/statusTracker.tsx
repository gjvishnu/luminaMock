import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type StudentStatus = "In Process" | "Interviewed" | "Rejected" | "Selected";

type Drive = {
  id: string;
  company: string;
  companyFull: string;
  role: string;
  date: string;
  venue: string;
  applicants: number;
  eligible: number;
  status: "Upcoming" | "Ongoing" | "Completed";
  lastUpdated: string;
};

type Applicant = {
  studentId: string;
  name: string;
  department: string;
  batch: string;
  appliedOn: string;
  status: StudentStatus;
};

const studentStatuses: StudentStatus[] = [
  "In Process",
  "Interviewed",
  "Rejected",
  "Selected",
];

const emptyApplicants: Applicant[] = [];

const drives: Drive[] = [
  {
    id: "DRV-TCS-2026",
    company: "TCS",
    companyFull: "Tata Consultancy Services",
    role: "Software Engineer",
    date: "05 Sep 2026",
    venue: "Seminar Hall",
    applicants: 248,
    eligible: 320,
    status: "Upcoming",
    lastUpdated: "Today, 10:30 AM",
  },
  {
    id: "DRV-INF-2026",
    company: "Infosys",
    companyFull: "Infosys Limited",
    role: "System Engineer",
    date: "08 Sep 2026",
    venue: "Auditorium",
    applicants: 214,
    eligible: 280,
    status: "Ongoing",
    lastUpdated: "Yesterday, 04:15 PM",
  },
  {
    id: "DRV-ZOHO-2026",
    company: "Zoho",
    companyFull: "Zoho Corporation",
    role: "Developer",
    date: "12 Sep 2026",
    venue: "Lab 3",
    applicants: 156,
    eligible: 180,
    status: "Upcoming",
    lastUpdated: "18 Sep 2026, 11:20 AM",
  },
  {
    id: "DRV-ACC-2026",
    company: "Accenture",
    companyFull: "Accenture",
    role: "Analyst",
    date: "20 Aug 2026",
    venue: "Main Block",
    applicants: 324,
    eligible: 410,
    status: "Completed",
    lastUpdated: "22 Aug 2026, 06:45 PM",
  },
];

const applicantsByDrive: Record<string, Applicant[]> = {
  "DRV-TCS-2026": [
    { studentId: "22CS101", name: "Rahul Kumar", department: "CSE", batch: "2022 - 2026", appliedOn: "28 Aug 2026", status: "Selected" },
    { studentId: "22CS118", name: "Priya N", department: "CSE", batch: "2022 - 2026", appliedOn: "28 Aug 2026", status: "Interviewed" },
    { studentId: "22EC056", name: "Arun M", department: "ECE", batch: "2022 - 2026", appliedOn: "29 Aug 2026", status: "In Process" },
    { studentId: "22EE077", name: "Vignesh P", department: "EEE", batch: "2022 - 2026", appliedOn: "29 Aug 2026", status: "In Process" },
    { studentId: "22CS131", name: "Nisha R", department: "CSE", batch: "2022 - 2026", appliedOn: "30 Aug 2026", status: "Rejected" },
    { studentId: "22ME033", name: "Kiran S", department: "MECH", batch: "2022 - 2026", appliedOn: "30 Aug 2026", status: "In Process" },
  ],
  "DRV-INF-2026": [
    { studentId: "22CS101", name: "Rahul Kumar", department: "CSE", batch: "2022 - 2026", appliedOn: "30 Aug 2026", status: "Interviewed" },
    { studentId: "22EC056", name: "Arun M", department: "ECE", batch: "2022 - 2026", appliedOn: "31 Aug 2026", status: "Selected" },
    { studentId: "22CS142", name: "Meera K", department: "CSE", batch: "2022 - 2026", appliedOn: "31 Aug 2026", status: "In Process" },
    { studentId: "22IT044", name: "Aditya S", department: "IT", batch: "2022 - 2026", appliedOn: "01 Sep 2026", status: "Rejected" },
    { studentId: "22EC088", name: "Ananya V", department: "ECE", batch: "2022 - 2026", appliedOn: "01 Sep 2026", status: "In Process" },
  ],
  "DRV-ZOHO-2026": [
    { studentId: "22CS118", name: "Priya N", department: "CSE", batch: "2022 - 2026", appliedOn: "02 Sep 2026", status: "Interviewed" },
    { studentId: "22CS131", name: "Nisha R", department: "CSE", batch: "2022 - 2026", appliedOn: "02 Sep 2026", status: "In Process" },
    { studentId: "22IT044", name: "Aditya S", department: "IT", batch: "2022 - 2026", appliedOn: "03 Sep 2026", status: "In Process" },
    { studentId: "22EC088", name: "Ananya V", department: "ECE", batch: "2022 - 2026", appliedOn: "03 Sep 2026", status: "Rejected" },
  ],
  "DRV-ACC-2026": [
    { studentId: "22CS101", name: "Rahul Kumar", department: "CSE", batch: "2022 - 2026", appliedOn: "08 Aug 2026", status: "Selected" },
    { studentId: "22CS118", name: "Priya N", department: "CSE", batch: "2022 - 2026", appliedOn: "08 Aug 2026", status: "Selected" },
    { studentId: "22EE077", name: "Vignesh P", department: "EEE", batch: "2022 - 2026", appliedOn: "09 Aug 2026", status: "Rejected" },
    { studentId: "22IT044", name: "Aditya S", department: "IT", batch: "2022 - 2026", appliedOn: "09 Aug 2026", status: "Interviewed" },
    { studentId: "22ME033", name: "Kiran S", department: "MECH", batch: "2022 - 2026", appliedOn: "10 Aug 2026", status: "Rejected" },
  ],
};

const driveStatusStyles: Record<Drive["status"], string> = {
  Upcoming: "bg-cyan-50 text-cyan-600",
  Ongoing: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

const driveStatusOptions: Drive["status"][] = ["Upcoming", "Ongoing", "Completed"];

const studentStatusStyles: Record<StudentStatus, string> = {
  "In Process": "bg-amber-50 text-amber-600",
  Interviewed: "bg-blue-50 text-blue-600",
  Rejected: "bg-rose-50 text-rose-600",
  Selected: "bg-emerald-50 text-emerald-600",
};

function DriveStatusBadge({ status }: { status: Drive["status"] }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${driveStatusStyles[status]}`}>{status}</span>;
}

function StudentStatusBadge({ status }: { status: StudentStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${studentStatusStyles[status]}`}>{status}</span>;
}

export function StatusTracker() {
  const { driveId } = useParams();

  if (driveId) {
    return <DriveStatusDetail driveId={driveId} />;
  }

  return <DriveStatusList />;
}

function DriveStatusList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [driveStatuses, setDriveStatuses] = useState<Record<string, Drive["status"]>>(() => drives.reduce<Record<string, Drive["status"]>>((result, drive) => {
    result[drive.id] = drive.status;
    return result;
  }, {}));
  const [selectedDriveIds, setSelectedDriveIds] = useState<string[]>([]);
  const [bulkDriveStatus, setBulkDriveStatus] = useState<Drive["status"] | "">("");
  const [pendingDriveStatus, setPendingDriveStatus] = useState<{ driveIds: string[]; status: Drive["status"] } | null>(null);
  const [pendingDriveCompletion, setPendingDriveCompletion] = useState<string[] | null>(null);
  const [showCompletionWarning, setShowCompletionWarning] = useState(false);

  const filteredDrives = drives.filter((drive) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [drive.id, drive.company, drive.companyFull, drive.role].some((value) => value.toLowerCase().includes(query));
    const matchesStatus = statusFilter === "All Status" || driveStatuses[drive.id] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const allVisibleDrivesSelected = filteredDrives.length > 0 && filteredDrives.every((drive) => selectedDriveIds.includes(drive.id));

  const toggleAllVisibleDrives = () => {
    if (allVisibleDrivesSelected) {
      setSelectedDriveIds((current) => current.filter((id) => !filteredDrives.some((drive) => drive.id === id)));
      return;
    }

    setSelectedDriveIds((current) => Array.from(new Set([...current, ...filteredDrives.map((drive) => drive.id)])));
  };

  const requestDriveStatusChange = (driveIds: string[], status: Drive["status"]) => {
    if (status === "Completed") {
      setPendingDriveCompletion(driveIds);
      setShowCompletionWarning(true);
      return;
    }

    setPendingDriveStatus({ driveIds, status });
  };

  const savePendingDriveStatus = () => {
    if (!pendingDriveStatus) return;

    setDriveStatuses((current) => {
      const next = { ...current };
      pendingDriveStatus.driveIds.forEach((driveId) => { next[driveId] = pendingDriveStatus.status; });
      return next;
    });
    setPendingDriveStatus(null);
  };

  const markDriveCompletedAnyway = () => {
    if (!pendingDriveCompletion) return;

    setDriveStatuses((current) => {
      const next = { ...current };
      pendingDriveCompletion.forEach((driveId) => { next[driveId] = "Completed"; });
      return next;
    });
    setPendingDriveCompletion(null);
    setShowCompletionWarning(false);
  };

  const applyBulkDriveStatus = (status: Drive["status"] | "") => {
    if (!status || selectedDriveIds.length === 0) return;

    setBulkDriveStatus("");
    requestDriveStatusChange(selectedDriveIds, status);
  };

  return (
    <div className="-m-3 min-h-full bg-slate-50/60 p-3 pb-5 text-slate-800 sm:p-4">
      <div className="mx-auto w-full max-w-[1500px] space-y-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Drive Status Tracker</h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">Review applications and update each student&apos;s placement status by drive.</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <TrackerMetric label="Total Drives" value={drives.length.toString()} icon={CalendarDays} tone="text-cyan-600" bg="bg-cyan-50" />
          <TrackerMetric label="Total Applicants" value={drives.reduce((total, drive) => total + drive.applicants, 0).toLocaleString()} icon={Users} tone="text-blue-600" bg="bg-blue-50" />
          <TrackerMetric label="Ongoing Drives" value={drives.filter((drive) => driveStatuses[drive.id] === "Ongoing").length.toString()} icon={FileText} tone="text-amber-600" bg="bg-amber-50" />
          <TrackerMetric label="Completed Drives" value={drives.filter((drive) => driveStatuses[drive.id] === "Completed").length.toString()} icon={CheckCircle2} tone="text-emerald-600" bg="bg-emerald-50" />
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="block min-w-0 flex-1">
              <span className="mb-1 block text-[10px] font-semibold text-slate-500">Search drives</span>
              <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by drive ID, company or role..."
                  className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
                />
              </div>
            </label>
            <label className="block w-full sm:w-44">
              <span className="mb-1 block text-[10px] font-semibold text-slate-500">Drive status</span>
              <div className="relative">
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100">
                  <option>All Status</option>
                  {driveStatusOptions.map((status) => <option key={status}>{status}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-3 py-3 sm:px-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">Campus Drives</h2>
              <p className="mt-0.5 text-[10px] text-slate-500">Select a drive to manage its applicant statuses.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-medium text-slate-500">{selectedDriveIds.length} selected</span>
              <label className="relative block w-[132px]">
                <span className="sr-only">Apply status to selected drives</span>
                <select value={bulkDriveStatus} disabled={selectedDriveIds.length === 0} onChange={(event) => applyBulkDriveStatus(event.target.value as Drive["status"] | "")} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] font-medium text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"><option value="">Apply status</option>{driveStatusOptions.map((status) => <option key={status}>{status}</option>)}</select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
              <span className="text-[10px] font-medium text-slate-500">{filteredDrives.length} drives</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-semibold text-slate-600 sm:text-xs">
                  <th className="w-10 px-3 py-3 sm:px-4"><input type="checkbox" aria-label="Select all visible drives" checked={allVisibleDrivesSelected} onChange={toggleAllVisibleDrives} className="h-3.5 w-3.5 accent-cyan-600" /></th>
                  <th className="px-3 py-3 sm:px-4">Drive ID</th>
                  <th className="px-3 py-3 sm:px-4">Company &amp; Role</th>
                  <th className="px-3 py-3 sm:px-4">Drive Date</th>
                  <th className="px-3 py-3 sm:px-4">Applicants</th>
                  <th className="px-3 py-3 sm:px-4">Status</th>
                  <th className="px-3 py-3 sm:px-4">Last Updated</th>
                  <th className="px-3 py-3 text-right sm:px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrives.map((drive) => {
                  const currentStatus = driveStatuses[drive.id];
                  return (
                  <tr key={drive.id} className="border-t border-slate-100 text-[10px] transition hover:bg-cyan-50/30 sm:text-xs">
                    <td className="px-3 py-3 sm:px-4"><input type="checkbox" aria-label={`Select ${drive.company} drive`} checked={selectedDriveIds.includes(drive.id)} onChange={() => setSelectedDriveIds((current) => current.includes(drive.id) ? current.filter((id) => id !== drive.id) : [...current, drive.id])} className="h-3.5 w-3.5 accent-cyan-600" /></td>
                    <td className="px-3 py-3 font-semibold text-cyan-600 sm:px-4">{drive.id}</td>
                    <td className="px-3 py-3 sm:px-4">
                      <p className="font-bold text-slate-800">{drive.company}</p>
                      <p className="mt-0.5 text-[10px] text-slate-500">{drive.role}</p>
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-600 sm:px-4">
                      <p>{drive.date}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{drive.venue}</p>
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-700 sm:px-4">{drive.applicants}</td>
                    <td className="px-3 py-3 sm:px-4">
                      <label className="relative block w-[125px]">
                        <span className="sr-only">Change status for {drive.company} drive</span>
                        <select value={currentStatus} onChange={(event) => requestDriveStatusChange([drive.id], event.target.value as Drive["status"])} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] font-semibold text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100">{driveStatusOptions.map((status) => <option key={status}>{status}</option>)}</select>
                        <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                      </label>
                    </td>
                    <td className="px-3 py-3 text-slate-500 sm:px-4">{drive.lastUpdated}</td>
                    <td className="px-3 py-3 text-right sm:px-4">
                      <button type="button" onClick={() => navigate(`/status-tracker/${drive.id}`)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-cyan-200 px-2.5 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50">
                        <Eye size={14} />
                        View details
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredDrives.length === 0 && <p className="px-4 py-10 text-center text-xs text-slate-500">No drives match your search.</p>}
          <div className="border-t border-slate-100 px-3 py-3 text-[10px] text-slate-500 sm:px-4">Showing {filteredDrives.length} of {drives.length} drives</div>
        </section>
      </div>

      {pendingDriveStatus && (
        <StatusConfirmationDialog
          title="Confirm status change"
          message={`Save ${pendingDriveStatus.status} for ${pendingDriveStatus.driveIds.length === 1 ? "this drive" : `${pendingDriveStatus.driveIds.length} selected drives`}?`}
          onCancel={() => setPendingDriveStatus(null)}
          onConfirm={savePendingDriveStatus}
        />
      )}
      {showCompletionWarning && (
        <StatusWarningDialog
          onClose={() => {
            setPendingDriveCompletion(null);
            setShowCompletionWarning(false);
          }}
          onMarkAnyway={markDriveCompletedAnyway}
        />
      )}
    </div>
  );
}

function StatusConfirmationDialog({ title, message, onCancel, onConfirm }: { title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/35 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="status-confirmation-title" onMouseDown={(event) => event.stopPropagation()}>
        <h2 id="status-confirmation-title" className="text-sm font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-slate-600">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={onConfirm} className="h-8 rounded-md bg-cyan-500 px-3 text-[10px] font-semibold text-white transition hover:bg-cyan-600">Confirm &amp; Save</button>
        </div>
      </div>
    </div>
  );
}

function StatusWarningDialog({ onClose, onMarkAnyway }: { onClose: () => void; onMarkAnyway: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/35 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="w-full max-w-sm rounded-xl border border-amber-200 bg-white p-4 shadow-xl" role="dialog" aria-modal="true" aria-labelledby="status-warning-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600"><AlertTriangle size={16} /></span>
          <div>
            <h2 id="status-warning-title" className="text-sm font-bold text-slate-900">Before marking this drive complete</h2>
            <p className="mt-2 text-xs leading-5 text-slate-600">Friendly reminder: please make sure all student statuses have been updated in the detail screen first.</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-8 rounded-md border border-slate-200 px-3 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={onMarkAnyway} className="h-8 rounded-md bg-amber-500 px-3 text-[10px] font-semibold text-white transition hover:bg-amber-600">Mark anyway</button>
        </div>
      </div>
    </div>
  );
}

function TrackerMetric({ label, value, icon: Icon, tone, bg }: { label: string; value: string; icon: typeof CalendarDays; tone: string; bg: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:gap-3 sm:p-3">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${bg} ${tone}`}><Icon size={17} /></span>
      <div className="min-w-0">
        <p className="truncate text-[9px] font-medium text-slate-500 sm:text-[11px]">{label}</p>
        <p className="mt-0.5 text-lg font-bold leading-none text-slate-800 sm:text-xl">{value}</p>
      </div>
    </div>
  );
}

function DriveStatusDetail({ driveId }: { driveId: string }) {
  const navigate = useNavigate();
  const drive = drives.find((item) => item.id.toLowerCase() === driveId.toLowerCase()) ?? drives[0];
  const applicants = applicantsByDrive[drive.id] ?? emptyApplicants;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<Record<string, StudentStatus>>(() => Object.fromEntries(applicants.map((student) => [student.studentId, student.status])));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [bulkStatus, setBulkStatus] = useState<StudentStatus | "">("");
  const [exportedCount, setExportedCount] = useState(0);
  const [pendingStudentStatus, setPendingStudentStatus] = useState<{ studentIds: string[]; status: StudentStatus } | null>(null);
  const departmentOptions = Array.from(new Set(applicants.map((student) => student.department))).sort();

  const filteredApplicants = useMemo(() => applicants.filter((student) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [student.studentId, student.name, student.department].some((value) => value.toLowerCase().includes(query));
    const matchesDepartment = departmentFilter === "All Departments" || student.department === departmentFilter;
    const matchesStatus = statusFilter === "All Status" || statuses[student.studentId] === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  }), [applicants, departmentFilter, search, statusFilter, statuses]);

  const allVisibleSelected = filteredApplicants.length > 0 && filteredApplicants.every((student) => selectedIds.includes(student.studentId));
  const selectedApplicants = applicants.filter((student) => selectedIds.includes(student.studentId));
  const counts = studentStatuses.reduce<Record<StudentStatus, number>>((result, status) => {
    result[status] = applicants.filter((student) => statuses[student.studentId] === status).length;
    return result;
  }, { "In Process": 0, Interviewed: 0, Rejected: 0, Selected: 0 });

  const toggleAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((current) => current.filter((id) => !filteredApplicants.some((student) => student.studentId === id)));
      return;
    }

    setSelectedIds((current) => Array.from(new Set([...current, ...filteredApplicants.map((student) => student.studentId)])));
  };

  const requestStudentStatusChange = (studentIds: string[], status: StudentStatus) => {
    setPendingStudentStatus({ studentIds, status });
  };

  const savePendingStudentStatus = () => {
    if (!pendingStudentStatus) return;

    setStatuses((current) => {
      const next = { ...current };
      pendingStudentStatus.studentIds.forEach((studentId) => { next[studentId] = pendingStudentStatus.status; });
      return next;
    });
    setPendingStudentStatus(null);
  };

  const applyBulkStatus = (nextStatus: StudentStatus | "") => {
    if (!nextStatus || selectedIds.length === 0) return;
    setBulkStatus("");
    requestStudentStatusChange(selectedIds, nextStatus);
  };

  const exportSelected = () => {
    if (selectedApplicants.length === 0) return;

    const escapeCell = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const rows = selectedApplicants.map((student) => `<tr><td>${escapeCell(drive.id)}</td><td>${escapeCell(student.studentId)}</td><td>${escapeCell(statuses[student.studentId])}</td></tr>`).join("");
    const workbook = `<html><head><meta charset="UTF-8"></head><body><table><tr><th>driveid</th><th>studentid</th><th>status</th></tr>${rows}</table></body></html>`;
    const blob = new Blob([workbook], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${drive.id}-student-status.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExportedCount(selectedApplicants.length);
  };

  return (
    <div className="-m-3 min-h-full bg-slate-50/60 p-3 pb-5 text-slate-800 sm:p-4">
      <div className="mx-auto w-full max-w-[1500px] space-y-3">
        <button type="button" onClick={() => navigate("/status-tracker")} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-600"><ArrowLeft size={15} />Back to Drive Status Tracker</button>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-600">{drive.id}</span>
                <DriveStatusBadge status={drive.status} />
              </div>
              <h1 className="mt-2 text-lg font-bold tracking-tight text-slate-900 sm:text-2xl">{drive.company} - {drive.role}</h1>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
                <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} className="text-slate-400" />{drive.date}</span>
                <span className="inline-flex items-center gap-1.5"><Users size={14} className="text-slate-400" />{drive.applicants} applicants</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-slate-400" />{drive.venue}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[420px]">
              {studentStatuses.map((status) => <div key={status} className="rounded-lg bg-slate-50 px-3 py-2"><p className="text-lg font-bold leading-none text-slate-800">{counts[status]}</p><p className="mt-1 truncate text-[9px] font-medium text-slate-500">{status}</p></div>)}
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 sm:text-base">Applied Students</h2>
              <p className="mt-0.5 text-[10px] text-slate-500">Select students to update their status or export their results.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative block w-[180px]">
                <span className="sr-only">Search students</span>
                <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students..." className="h-8 w-full rounded-md border border-slate-200 pl-8 pr-2 text-[10px] text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100" />
              </label>
              <label className="relative block w-[132px]">
                <span className="sr-only">Filter by student status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"><option>All Status</option>{studentStatuses.map((status) => <option key={status}>{status}</option>)}</select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
              <label className="relative block w-[132px]">
                <span className="sr-only">Filter by department</span>
                <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"><option>All Departments</option>{departmentOptions.map((department) => <option key={department}>{department}</option>)}</select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-cyan-50/40 px-3 py-2.5 sm:px-4">
            <p className="text-[10px] font-semibold text-slate-600">{selectedIds.length} student{selectedIds.length === 1 ? "" : "s"} selected</p>
            <div className="flex flex-wrap items-center gap-2">
              <label className="relative block w-[132px]">
                <span className="sr-only">Status for selected students</span>
                <select value={bulkStatus} disabled={selectedIds.length === 0} onChange={(event) => applyBulkStatus(event.target.value as StudentStatus | "")} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] font-medium text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"><option value="" disabled>Apply status</option>{studentStatuses.map((status) => <option key={status}>{status}</option>)}</select>
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
              <button type="button" disabled={selectedIds.length === 0} onClick={exportSelected} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-cyan-300 bg-white px-3 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"><Download size={14} />Export Excel</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-semibold text-slate-600 sm:text-xs">
                  <th className="w-10 px-3 py-3 sm:px-4"><input type="checkbox" aria-label="Select all visible students" checked={allVisibleSelected} onChange={toggleAllVisible} className="h-3.5 w-3.5 accent-cyan-600" /></th>
                  <th className="px-3 py-3 sm:px-4">Student</th>
                  <th className="px-3 py-3 sm:px-4">Student ID</th>
                  <th className="px-3 py-3 sm:px-4">Department</th>
                  <th className="px-3 py-3 sm:px-4">Batch</th>
                  <th className="px-3 py-3 sm:px-4">Applied On</th>
                  <th className="px-3 py-3 sm:px-4">Status</th>
                  <th className="px-3 py-3 sm:px-4">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((student) => {
                  const studentStatus = statuses[student.studentId];
                  return (
                    <tr key={student.studentId} className="border-t border-slate-100 text-[10px] transition hover:bg-cyan-50/20 sm:text-xs">
                      <td className="px-3 py-3 sm:px-4"><input type="checkbox" aria-label={`Select ${student.name}`} checked={selectedIds.includes(student.studentId)} onChange={() => setSelectedIds((current) => current.includes(student.studentId) ? current.filter((id) => id !== student.studentId) : [...current, student.studentId])} className="h-3.5 w-3.5 accent-cyan-600" /></td>
                      <td className="px-3 py-3 sm:px-4"><p className="font-bold text-slate-800">{student.name}</p><p className="mt-0.5 text-[10px] text-slate-500">{student.department}</p></td>
                      <td className="px-3 py-3 font-semibold text-cyan-600 sm:px-4">{student.studentId}</td>
                      <td className="px-3 py-3 font-medium text-slate-600 sm:px-4">{student.department}</td>
                      <td className="px-3 py-3 text-slate-600 sm:px-4">{student.batch}</td>
                      <td className="px-3 py-3 text-slate-600 sm:px-4">{student.appliedOn}</td>
                      <td className="px-3 py-3 sm:px-4"><StudentStatusBadge status={studentStatus} /></td>
                      <td className="px-3 py-3 sm:px-4">
                        <label className="relative block w-[132px]"><span className="sr-only">Update status for {student.name}</span><select value={studentStatus} onChange={(event) => requestStudentStatusChange([student.studentId], event.target.value as StudentStatus)} className="h-8 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-7 text-[10px] font-medium text-slate-700 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100">{studentStatuses.map((status) => <option key={status}>{status}</option>)}</select><ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" /></label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredApplicants.length === 0 && <p className="px-4 py-10 text-center text-xs text-slate-500">No students match your filters.</p>}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-3 sm:px-4">
            <p className="text-[10px] text-slate-500">Showing {filteredApplicants.length} of {applicants.length} applied students</p>
            {exportedCount > 0 && <p className="text-[10px] font-medium text-emerald-600">Exported {exportedCount} student record{exportedCount === 1 ? "" : "s"}.</p>}
          </div>
        </section>

        {pendingStudentStatus && (
          <StatusConfirmationDialog
            title="Confirm student status"
            message={`Save ${pendingStudentStatus.status} for ${pendingStudentStatus.studentIds.length === 1 ? "this student" : `${pendingStudentStatus.studentIds.length} selected students`}?`}
            onCancel={() => setPendingStudentStatus(null)}
            onConfirm={savePendingStudentStatus}
          />
        )}
      </div>
    </div>
  );
}
