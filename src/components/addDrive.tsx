import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Home,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type JdFile = {
  name: string;
  size: string;
  url: string;
};

// Each role section contains Job Role Info + Eligibility + Role Details
type RoleSection = {
  id: string;
  // Job Role Info
  jobRole: string;
  jobLocation: string;
  jobType: string;
  ctc: string;
  skills: string[];
  openings: string;
  // Eligibility Criteria
  departments: string[];
  batch: string;
  minimumCgpa: string;
  maximumBacklogs: string;
  degree: string;
  otherCriteria: string;
  // Role Details
  jobDescription: string;
  jdFile: JdFile | null;
  selectionProcesses: string[];
};

const departmentOptions = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];
const jobTypeOptions = ["Full Time", "Internship", "Contract"];
const batchOptions = ["2026", "2025", "2024", "2023"];
const degreeOptions = ["B.E / B.Tech", "BCA", "MCA", "B.Sc", "Any Degree"];
const driveStatusOptions = ["Upcoming", "Registration Open", "Ongoing", "Completed"];
const skillOptions = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "Java", "SQL", "Git", "AWS", "Figma",
];
const selectionProcessOptions = [
  "Aptitude", "Technical", "GD", "HR Interview", "Coding Round",
];

const defaultRoleSection = (): RoleSection => ({
  id: "role-" + Date.now() + "-" + Math.random(),
  jobRole: "",
  jobLocation: "",
  jobType: "",
  ctc: "",
  skills: [],
  openings: "",
  departments: [],
  batch: "",
  minimumCgpa: "",
  maximumBacklogs: "",
  degree: "",
  otherCriteria: "",
  jobDescription: "",
  jdFile: null,
  selectionProcesses: [],
});

export const AddDrive = () => {
  const navigate = useNavigate();

  // Card 1: Company & Drive Information
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [driveDate, setDriveDate] = useState("");
  const [driveTime, setDriveTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [driveStatus, setDriveStatus] = useState("");

  // Multiple role sections (each has Job Role Info + Eligibility + Role Details)
  const [roleSections, setRoleSections] = useState<RoleSection[]>([
    { ...defaultRoleSection(), id: "role-1" },
  ]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      roleSections.forEach((r) => {
        if (r.jdFile) URL.revokeObjectURL(r.jdFile.url);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddRole = () => {
    setRoleSections((prev) => [...prev, defaultRoleSection()]);
    toast.info("Added new role section");
  };

  const handleDeleteRole = (id: string) => {
    if (roleSections.length <= 1) return;
    setRoleSections((prev) => {
      const removed = prev.find((r) => r.id === id);
      if (removed?.jdFile) URL.revokeObjectURL(removed.jdFile.url);
      return prev.filter((r) => r.id !== id);
    });
    toast.info("Deleted role section");
  };

  const updateRole = (id: string, patch: Partial<Omit<RoleSection, "id">>) => {
    setRoleSections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  const handleSaveDrive = () => {
    toast.success("Campus Drive saved successfully!");
    navigate("/dashboard/campusdrive");
  };

  return (
    <div className="space-y-4 pb-6 text-slate-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => navigate("/dashboard/campusdrive")}
          className="flex items-center text-[#0088ff] hover:opacity-80 transition"
          aria-label="Home"
        >
          <Home size={15} />
        </button>
        <ChevronRight size={13} className="text-slate-300" />
        <button
          type="button"
          onClick={() => navigate("/dashboard/campusdrive")}
          className="text-slate-400 hover:text-slate-600 transition"
        >
          Applications
        </button>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="font-bold text-slate-800">Company details</span>
      </div>

      {/* Page Title & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
            Add Campus Drive
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Set shared drive details once, then add role-specific requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/campusdrive")}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveDrive}
            className="rounded-lg bg-[#0088ff] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0077e6]"
          >
            Save Drive
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* â”€â”€ Card 1: Company & Drive Information â”€â”€ */}
        <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
            Company &amp; Drive Information
          </h2>

          {/* Row 1: Company Name | Company Website | About Company (rowspan 2) */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <InputField label="Company Name" required placeholder="Enter company name" value={companyName} onChange={setCompanyName} />
            </div>
            <div className="lg:col-span-4">
              <InputField label="Company Website" placeholder="https://" value={companyWebsite} onChange={setCompanyWebsite} />
            </div>
            <div className="lg:col-span-4 lg:row-span-2">
              <label className="block">
                <FieldLabel label="About Company" />
                <textarea
                  value={aboutCompany}
                  onChange={(e) => setAboutCompany(e.target.value)}
                  placeholder="Brief about the company"
                  className="h-[108px] w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
                />
              </label>
            </div>

            {/* Row 2: Drive Date | Drive Time */}
            <div className="lg:col-span-4">
              <DateField label="Drive Date" required placeholder="Select date" value={driveDate} onChange={setDriveDate} />
            </div>
            <div className="lg:col-span-4">
              <TimeField label="Drive Time" required placeholder="Select time" value={driveTime} onChange={setDriveTime} />
            </div>

            {/* Row 3: Venue | Registration End Date | Drive Status (half size = col-span-2) */}
            <div className="lg:col-span-4">
              <InputField label="Venue" required placeholder="Enter venue" value={venue} onChange={setVenue} />
            </div>
            <div className="lg:col-span-4">
              <DateField label="Registration End Date" placeholder="Select date" value={registrationEndDate} onChange={setRegistrationEndDate} />
            </div>
            {/* Drive Status â€“ half the width of a regular field (col-span-2 out of 12 = ~half of col-span-4) */}
            <div className="lg:col-span-2">
              <SelectField
                label="Drive Status"
                placeholder="Select an option"
                options={driveStatusOptions}
                value={driveStatus}
                onChange={setDriveStatus}
              />
            </div>
          </div>
        </section>

        {/* â”€â”€ Repeated Role Sections â”€â”€ */}
        {roleSections.map((role, index) => (
          <RoleSectionCard
            key={role.id}
            role={role}
            index={index}
            totalCount={roleSections.length}
            onUpdate={(patch) => updateRole(role.id, patch)}
            onDelete={() => handleDeleteRole(role.id)}
            onAddAnother={handleAddRole}
          />
        ))}
      </div>
    </div>
  );
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   RoleSectionCard â€” contains Job Role Info + Eligibility Criteria + Role Details
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function RoleSectionCard({
  role,
  index,
  totalCount,
  onUpdate,
  onDelete,
  onAddAnother,
}: {
  role: RoleSection;
  index: number;
  totalCount: number;
  onUpdate: (patch: Partial<Omit<RoleSection, "id">>) => void;
  onDelete: () => void;
  onAddAnother: () => void;
}) {
  const handleJdFileChange = (file: File | undefined) => {
    const isPdf = file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");
    if (!file || !isPdf) return;
    const jdFile: JdFile = {
      name: file.name,
      size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB`,
      url: URL.createObjectURL(file),
    };
    onUpdate({ jdFile });
  };

  const removeJdFile = () => {
    if (role.jdFile) URL.revokeObjectURL(role.jdFile.url);
    onUpdate({ jdFile: null });
  };

  const toggleDept = (dept: string) => {
    const departments = role.departments.includes(dept)
      ? role.departments.filter((d) => d !== dept)
      : [...role.departments, dept];
    onUpdate({ departments });
  };

  return (
    <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
      {/* â”€â”€ Section header â”€â”€ */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
            Role {totalCount > 1 ? `${index + 1}` : ""} Details
          </h2>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Job role information, eligibility criteria &amp; role details
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalCount > 1 && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 hover:border-rose-300"
            >
              <Trash2 size={13} />
              Delete role
            </button>
          )}
          <button
            type="button"
            onClick={onAddAnother}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0088ff] bg-white px-3 py-1.5 text-xs font-semibold text-[#0088ff] shadow-sm transition hover:bg-sky-50"
          >
            <Plus size={14} />
            Add another role
          </button>
        </div>
      </div>

      {/* â”€â”€ Sub-section A: Job Role Information â”€â”€ */}
      <div className="mt-5">
        <h3 className="mb-3 text-sm font-bold text-[#0088ff]">Job Role Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <InputField
              label="Job Role" required placeholder="Enter job role"
              value={role.jobRole} onChange={(v) => onUpdate({ jobRole: v })}
            />
          </div>
          <div>
            <InputField
              label="Job Location" placeholder="Enter job location"
              value={role.jobLocation} onChange={(v) => onUpdate({ jobLocation: v })}
            />
          </div>
          <div>
            <SelectField
              label="Job Type" required placeholder="Select job type"
              options={jobTypeOptions} value={role.jobType} onChange={(v) => onUpdate({ jobType: v })}
            />
          </div>
          <div>
            <InputField
              label="CTC / Package" required placeholder="Enter ctc / package"
              value={role.ctc} onChange={(v) => onUpdate({ ctc: v })}
            />
          </div>
          <div>
            <SkillsPicker
              label="Skills Required"
              value={role.skills}
              onChange={(v) => onUpdate({ skills: v })}
            />
          </div>
          <div>
            <InputField
              label="Number of Openings" placeholder="Enter number of openings"
              value={role.openings} onChange={(v) => onUpdate({ openings: v })}
            />
          </div>
        </div>
      </div>

      {/* â”€â”€ Sub-section B: Eligibility Criteria â”€â”€ */}
      <div className="mt-5 border-t border-slate-100 pt-5">
        <h3 className="mb-3 text-sm font-bold text-[#0088ff]">Eligibility Criteria</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Departments â€“ pill buttons */}
          <div>
            <FieldLabel label="Departments" required />
            <div className="flex h-10 w-full flex-wrap items-center gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-white px-2 py-1">
              {departmentOptions.map((dept) => {
                const sel = role.departments.includes(dept);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDept(dept)}
                    className={`shrink-0 rounded px-2 py-1 text-[11px] font-semibold transition ${
                      sel ? "bg-[#0088ff] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <SelectField
              label="Batch / Graduation Year" required placeholder="Select batch / graduation year"
              options={batchOptions} value={role.batch} onChange={(v) => onUpdate({ batch: v })}
            />
          </div>
          <div>
            <InputField
              label="Minimum CGPA" required placeholder="Enter minimum cgpa"
              value={role.minimumCgpa} onChange={(v) => onUpdate({ minimumCgpa: v })}
            />
          </div>
          <div>
            <InputField
              label="Maximum Backlogs" placeholder="e.g. 0"
              value={role.maximumBacklogs} onChange={(v) => onUpdate({ maximumBacklogs: v })}
            />
          </div>
          <div>
            <SelectField
              label="Degree" placeholder="Select degree"
              options={degreeOptions} value={role.degree} onChange={(v) => onUpdate({ degree: v })}
            />
          </div>
          <div>
            <InputField
              label="Other Criteria" placeholder="Add other criteria"
              value={role.otherCriteria} onChange={(v) => onUpdate({ otherCriteria: v })}
            />
          </div>
        </div>
      </div>

      {/* â”€â”€ Sub-section C: Role Details & Additional Information â”€â”€ */}
      <div className="mt-5 border-t border-slate-100 pt-5">
        <h3 className="mb-3 text-sm font-bold text-[#0088ff]">Role Details &amp; Additional Information</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FieldLabel label="Job Description / JD" required />
            <JobDescriptionEditor
              value={role.jobDescription}
              onChange={(v) => onUpdate({ jobDescription: v })}
              file={role.jdFile}
              onFileChange={handleJdFileChange}
              onRemoveFile={removeJdFile}
            />
          </div>
          <div className="lg:col-span-4">
            <SelectionProcessPicker
              label="Selection Process"
              value={role.selectionProcesses}
              onChange={(v) => onUpdate({ selectionProcesses: v })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€ Shared Field Components â”€â”€â”€ */

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-bold text-slate-800">
      {label}
      {required && <span className="ml-1 font-bold text-red-500">*</span>}
    </span>
  );
}

function InputField({
  label, placeholder, required = false, value, onChange,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
      />
    </label>
  );
}

function SelectField({
  label, options, required = false, value, onChange, placeholder = "Select an option",
}: {
  label: string; options: string[]; required?: boolean;
  value?: string; onChange?: (value: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={`h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs outline-none transition focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100 ${!value ? "text-slate-400" : "font-medium text-slate-700"}`}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-slate-700">{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>
    </label>
  );
}

function DateField({
  label, placeholder, required = false, value, onChange,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          onFocus={(e) => { e.target.type = "date"; }}
          onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
        />
      </div>
    </label>
  );
}

function TimeField({
  label, placeholder, required = false, value, onChange,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <Clock3 size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          onFocus={(e) => { e.target.type = "time"; }}
          onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
        />
      </div>
    </label>
  );
}

function SkillsPicker({ label, value, onChange }: {
  label: string; value: string[]; onChange: (val: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (s: string) =>
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s]);

  return (
    <div ref={ref}>
      <FieldLabel label={label} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-[#0088ff]"
        >
          {value.length === 0
            ? <span className="text-slate-400">Select skills</span>
            : <span className="truncate font-medium text-slate-700">{value.join(", ")}</span>}
          <ChevronDown size={14} className="pointer-events-none ml-1 shrink-0 text-slate-500" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {skillOptions.map((s) => {
              const sel = value.includes(s);
              return (
                <button key={s} type="button" onClick={() => toggle(s)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-sky-50"
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-[#0088ff] bg-[#0088ff] text-white" : "border-slate-300"}`}>
                    {sel && <Check size={11} />}
                  </span>
                  {s}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectionProcessPicker({ label, value, onChange }: {
  label: string; value: string[]; onChange: (val: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (p: string) =>
    onChange(value.includes(p) ? value.filter((x) => x !== p) : [...value, p]);

  return (
    <div ref={ref}>
      <FieldLabel label={label} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-[#0088ff]"
        >
          {value.length === 0
            ? <span className="text-slate-400">Select selection processes</span>
            : <span className="truncate font-medium text-slate-700">{value.join(", ")}</span>}
          <ChevronDown size={14} className="pointer-events-none ml-1 shrink-0 text-slate-500" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {selectionProcessOptions.map((p) => {
              const sel = value.includes(p);
              return (
                <button key={p} type="button" onClick={() => toggle(p)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-sky-50"
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-[#0088ff] bg-[#0088ff] text-white" : "border-slate-300"}`}>
                    {sel && <Check size={11} />}
                  </span>
                  {p}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function JobDescriptionEditor({
  value, onChange, file, onFileChange, onRemoveFile,
}: {
  value: string;
  onChange: (v: string) => void;
  file: JdFile | null;
  onFileChange: (f: File | undefined) => void;
  onRemoveFile: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const showPreview = Boolean(file && previewUrl === file.url);

  return (
    <div>
      {file ? (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2.5">
            <FileText size={16} className="shrink-0 text-rose-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">{file.name}</p>
              <p className="text-[10px] text-slate-500">{file.size} Â· PDF</p>
            </div>
            <button type="button"
              onClick={() => setPreviewUrl(showPreview ? null : file.url)}
              className={`rounded p-1 transition ${showPreview ? "bg-sky-50 text-[#0088ff]" : "text-slate-400 hover:bg-sky-50 hover:text-[#0088ff]"}`}
            ><Eye size={15} /></button>
            <button type="button" onClick={onRemoveFile}
              className="rounded p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
            ><X size={15} /></button>
          </div>
          <p className="px-3 py-2 text-xs text-slate-500">Using uploaded PDF. Remove to enter JD as text.</p>
        </div>
      ) : (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter job description, responsibilities, skills required, etc."
            className="h-[92px] w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
          />
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#0088ff] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0088ff] shadow-sm transition hover:bg-sky-50">
              <Upload size={14} />
              Upload JD PDF
              <input type="file" accept="application/pdf,.pdf" className="sr-only"
                onChange={(e) => { onFileChange(e.target.files?.[0]); e.currentTarget.value = ""; }}
              />
            </label>
            <span className="text-xs text-slate-500">Choose either typed text or one PDF upload.</span>
          </div>
        </>
      )}

      {showPreview && file && (
        <div role="dialog" aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <FileText size={16} className="shrink-0 text-rose-500" />
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{file.name}</p>
              <button type="button" onClick={() => setPreviewUrl(null)}
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              ><X size={18} /></button>
            </div>
            <iframe src={file.url} title={`Preview of ${file.name}`} className="min-h-[65vh] w-full bg-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
}


