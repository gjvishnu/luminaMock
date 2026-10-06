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

type RoleInfo = {
  id: string;
  jobRole: string;
  jobLocation: string;
  jobType: string;
  ctc: string;
  skills: string[];
  openings: string;
};

const departmentOptions = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];
const jobTypeOptions = ["Full Time", "Internship", "Contract"];
const batchOptions = ["2026", "2025", "2024", "2023"];
const degreeOptions = ["B.E / B.Tech", "BCA", "MCA", "B.Sc", "Any Degree"];
const driveStatusOptions = ["Upcoming", "Registration Open", "Ongoing", "Completed"];
const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "Git",
  "AWS",
  "Figma",
];
const selectionProcessOptions = [
  "Aptitude",
  "Technical",
  "GD",
  "HR Interview",
  "Coding Round",
];

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

  // Card 2: Job Role Information (support multiple roles)
  const [roles, setRoles] = useState<RoleInfo[]>([
    {
      id: "role-1",
      jobRole: "",
      jobLocation: "",
      jobType: "",
      ctc: "",
      skills: [],
      openings: "",
    },
  ]);

  // Card 3: Eligibility Criteria
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [batch, setBatch] = useState("");
  const [minimumCgpa, setMinimumCgpa] = useState("");
  const [maximumBacklogs, setMaximumBacklogs] = useState("");
  const [degree, setDegree] = useState("");
  const [otherCriteria, setOtherCriteria] = useState("");

  // Card 4: Role Details & Additional Information
  const [jobDescription, setJobDescription] = useState("");
  const [jdFile, setJdFile] = useState<JdFile | null>(null);
  const [selectionProcesses, setSelectionProcesses] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (jdFile) URL.revokeObjectURL(jdFile.url);
    };
  }, [jdFile]);

  const handleAddRole = () => {
    const newRole: RoleInfo = {
      id: "role-" + Date.now(),
      jobRole: "",
      jobLocation: "",
      jobType: "",
      ctc: "",
      skills: [],
      openings: "",
    };
    setRoles((prev) => [...prev, newRole]);
    toast.info("Added new Job Role section");
  };

  const handleDeleteRole = (id: string) => {
    if (roles.length <= 1) return;
    setRoles((prev) => prev.filter((r) => r.id !== id));
    toast.info("Deleted Job Role section");
  };

  const updateRoleField = (
    id: string,
    field: keyof Omit<RoleInfo, "id">,
    value: string | string[]
  ) => {
    setRoles((prev) =>
      prev.map((role) => (role.id === id ? { ...role, [field]: value } : role))
    );
  };

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleJdFileChange = (file: File | undefined) => {
    const isPdf =
      file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");
    if (!file || !isPdf) return;
    setJdFile({
      name: file.name,
      size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB`,
      url: URL.createObjectURL(file),
    });
  };

  const removeJdFile = () => setJdFile(null);

  const handleSaveDrive = () => {
    toast.success("Campus Drive saved successfully!");
    navigate("/campusdrive");
  };

  return (
    <div className="min-h-full space-y-4 pb-12 text-slate-800">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => navigate("/campusdrive")}
          className="flex items-center text-[#0088ff] hover:opacity-80 transition"
          aria-label="Home"
        >
          <Home size={15} />
        </button>
        <ChevronRight size={13} className="text-slate-300" />
        <button
          type="button"
          onClick={() => navigate("/campusdrive")}
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
            onClick={() => navigate("/campusdrive")}
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
        {/* Card 1: Company & Drive Information */}
        <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
            Company & Drive Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Col 1 */}
            <div>
              <InputField
                label="Company Name"
                required
                placeholder="Enter company name"
                value={companyName}
                onChange={setCompanyName}
              />
            </div>

            {/* Col 2 */}
            <div>
              <InputField
                label="Company Website"
                placeholder="https://"
                value={companyWebsite}
                onChange={setCompanyWebsite}
              />
            </div>

            {/* Col 3: About Company (Spans 2 rows on desktop) */}
            <div className="lg:row-span-2">
              <label className="block h-full">
                <FieldLabel label="About Company" />
                <textarea
                  value={aboutCompany}
                  onChange={(e) => setAboutCompany(e.target.value)}
                  placeholder="Brief about the company"
                  className="h-[114px] w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
                />
              </label>
            </div>

            {/* Row 2 - Col 1 */}
            <div>
              <DateField
                label="Drive Date"
                required
                placeholder="Select date"
                value={driveDate}
                onChange={setDriveDate}
              />
            </div>

            {/* Row 2 - Col 2 */}
            <div>
              <TimeField
                label="Drive Time"
                required
                placeholder="Select time"
                value={driveTime}
                onChange={setDriveTime}
              />
            </div>

            {/* Row 3 - Col 1 */}
            <div>
              <InputField
                label="Venue"
                required
                placeholder="Enter venue"
                value={venue}
                onChange={setVenue}
              />
            </div>

            {/* Row 3 - Col 2 */}
            <div>
              <DateField
                label="Registration End Date"
                placeholder="Select date"
                value={registrationEndDate}
                onChange={setRegistrationEndDate}
              />
            </div>

            {/* Row 3 - Col 3 */}
            <div>
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

        {/* Card 2: Job Role Information (Replicated per role) */}
        {roles.map((role, index) => (
          <section
            key={role.id}
            className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
                Job Role Information {roles.length > 1 ? `(${index + 1})` : ""}
              </h2>

              <div className="flex items-center gap-2">
                {roles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteRole(role.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 hover:border-rose-300"
                    title="Delete this role section"
                  >
                    <Trash2 size={13} />
                    Delete role
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#0088ff] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0088ff] shadow-sm transition hover:bg-sky-50"
                >
                  <Plus size={14} />
                  Add another role
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <InputField
                  label="Job Role"
                  required
                  placeholder="Enter job role"
                  value={role.jobRole}
                  onChange={(val) => updateRoleField(role.id, "jobRole", val)}
                />
              </div>

              <div>
                <InputField
                  label="Job Location"
                  placeholder="Enter job location"
                  value={role.jobLocation}
                  onChange={(val) => updateRoleField(role.id, "jobLocation", val)}
                />
              </div>

              <div>
                <SelectField
                  label="Job Type"
                  required
                  placeholder="Select job type"
                  options={jobTypeOptions}
                  value={role.jobType}
                  onChange={(val) => updateRoleField(role.id, "jobType", val)}
                />
              </div>

              <div>
                <InputField
                  label="CTC / Package"
                  required
                  placeholder="Enter ctc / package"
                  value={role.ctc}
                  onChange={(val) => updateRoleField(role.id, "ctc", val)}
                />
              </div>

              <div>
                <SkillsPicker
                  label="Skills Required"
                  value={role.skills}
                  onChange={(val) => updateRoleField(role.id, "skills", val)}
                />
              </div>

              <div>
                <InputField
                  label="Number of Openings"
                  placeholder="Enter number of openings"
                  value={role.openings}
                  onChange={(val) => updateRoleField(role.id, "openings", val)}
                />
              </div>
            </div>
          </section>
        ))}

        {/* Card 3: Eligibility Criteria */}
        <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
            Eligibility Criteria
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <FieldLabel label="Departments" required />
              <div className="flex h-10 w-full items-center gap-1.5 overflow-x-auto rounded-lg border border-slate-200 bg-white px-2 py-1 scrollbar-none">
                {departmentOptions.map((dept) => {
                  const isSelected = selectedDepartments.includes(dept);
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => toggleDepartment(dept)}
                      className={`shrink-0 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                        isSelected
                          ? "bg-[#0088ff] text-white shadow-xs"
                          : "bg-[#f1f5f9] text-slate-600 hover:bg-slate-200"
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
                label="Batch / Graduation Year"
                required
                placeholder="Select batch / graduation year"
                options={batchOptions}
                value={batch}
                onChange={setBatch}
              />
            </div>

            <div>
              <InputField
                label="Minimum CGPA"
                required
                placeholder="Enter minimum cgpa"
                value={minimumCgpa}
                onChange={setMinimumCgpa}
              />
            </div>

            <div>
              <InputField
                label="Maximum Backlogs"
                placeholder="e.g. 0"
                value={maximumBacklogs}
                onChange={setMaximumBacklogs}
              />
            </div>

            <div>
              <SelectField
                label="Degree"
                placeholder="Select degree"
                options={degreeOptions}
                value={degree}
                onChange={setDegree}
              />
            </div>

            <div>
              <InputField
                label="Other Criteria"
                placeholder="Add other criteria"
                value={otherCriteria}
                onChange={setOtherCriteria}
              />
            </div>
          </div>
        </section>

        {/* Card 4: Role Details & Additional Information */}
        <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-[#0088ff] sm:text-[17px]">
            Role Details & Additional Information
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Job Description / JD */}
            <div className="lg:col-span-8">
              <FieldLabel label="Job Description / JD" required />
              <JobDescriptionEditor
                value={jobDescription}
                onChange={setJobDescription}
                file={jdFile}
                onFileChange={handleJdFileChange}
                onRemoveFile={removeJdFile}
              />
            </div>

            {/* Right Column: Selection Process */}
            <div className="lg:col-span-4">
              <SelectionProcessPicker
                label="Selection Process"
                value={selectionProcesses}
                onChange={setSelectionProcesses}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* --- Form Field Components --- */

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-bold text-slate-800">
      {label}
      {required && <span className="ml-1 text-red-500 font-bold">*</span>}
    </span>
  );
}

function InputField({
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
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
  label,
  options,
  required = false,
  value,
  onChange,
  placeholder = "Select an option",
}: {
  label: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={`h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs outline-none transition focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100 ${
            !value ? "text-slate-400" : "text-slate-700 font-medium"
          }`}
        >
          <option value="" disabled hidden className="text-slate-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-slate-700">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </label>
  );
}

function DateField({
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <CalendarDays
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          onFocus={(e) => {
            e.target.type = "date";
          }}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
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
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <Clock3
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          onFocus={(e) => {
            e.target.type = "time";
          }}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
        />
      </div>
    </label>
  );
}

function SkillsPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSkill = (skill: string) => {
    onChange(
      value.includes(skill)
        ? value.filter((s) => s !== skill)
        : [...value, skill]
    );
  };

  return (
    <div className="block" ref={containerRef}>
      <FieldLabel label={label} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs outline-none transition focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
        >
          {value.length === 0 ? (
            <span className="text-slate-400">Select skills</span>
          ) : (
            <span className="truncate font-medium text-slate-700">
              {value.join(", ")}
            </span>
          )}
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {skillOptions.map((skill) => {
              const selected = value.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-sky-50"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      selected
                        ? "border-[#0088ff] bg-[#0088ff] text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {selected && <Check size={11} />}
                  </span>
                  {skill}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectionProcessPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProcess = (proc: string) => {
    onChange(
      value.includes(proc)
        ? value.filter((p) => p !== proc)
        : [...value, proc]
    );
  };

  return (
    <div className="block" ref={containerRef}>
      <FieldLabel label={label} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs outline-none transition focus:border-[#0088ff] focus:ring-2 focus:ring-sky-100"
        >
          {value.length === 0 ? (
            <span className="text-slate-400">Select selection processes</span>
          ) : (
            <span className="truncate font-medium text-slate-700">
              {value.join(", ")}
            </span>
          )}
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {selectionProcessOptions.map((proc) => {
              const selected = value.includes(proc);
              return (
                <button
                  key={proc}
                  type="button"
                  onClick={() => toggleProcess(proc)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-sky-50"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      selected
                        ? "border-[#0088ff] bg-[#0088ff] text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {selected && <Check size={11} />}
                  </span>
                  {proc}
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
  value,
  onChange,
  file,
  onFileChange,
  onRemoveFile,
}: {
  value: string;
  onChange: (value: string) => void;
  file: JdFile | null;
  onFileChange: (file: File | undefined) => void;
  onRemoveFile: () => void;
}) {
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const showPreview = Boolean(file && previewFileUrl === file.url);

  return (
    <div>
      {file ? (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2.5">
            <FileText size={16} className="shrink-0 text-rose-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">
                {file.name}
              </p>
              <p className="text-[10px] text-slate-500">
                {file.size} · PDF preview
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPreviewFileUrl(showPreview ? null : file.url)}
              aria-label={showPreview ? "Hide JD PDF preview" : "Preview JD PDF"}
              className={`rounded p-1 transition ${
                showPreview
                  ? "bg-sky-50 text-[#0088ff]"
                  : "text-slate-400 hover:bg-sky-50 hover:text-[#0088ff]"
              }`}
            >
              <Eye size={15} />
            </button>
            <button
              type="button"
              onClick={onRemoveFile}
              aria-label="Remove JD PDF"
              className="rounded p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
            >
              <X size={15} />
            </button>
          </div>
          <p className="px-3 py-2 text-xs text-slate-500">
            Using uploaded PDF. Remove it to enter the JD as text.
          </p>
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
              <input
                type="file"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => {
                  onFileChange(e.target.files?.[0]);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            <span className="text-xs text-slate-500">
              Choose either typed text or one PDF upload.
            </span>
          </div>
        </>
      )}

      {showPreview && file && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setPreviewFileUrl(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <FileText size={16} className="shrink-0 text-rose-500" />
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                {file.name}
              </p>
              <button
                type="button"
                onClick={() => setPreviewFileUrl(null)}
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={file.url}
              title={`Preview of ${file.name}`}
              className="min-h-[65vh] w-full bg-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}
