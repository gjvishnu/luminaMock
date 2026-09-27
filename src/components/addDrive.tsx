import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  FileText,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type RoleFieldKey =
  | "jobType"
  | "ctc"
  | "openings"
  | "departments"
  | "batch"
  | "minimumCgpa"
  | "maximumBacklogs"
  | "degree"
  | "location"
  | "experience"
  | "skills"
  | "otherCriteria"
  | "jobDescription"
  | "selectionProcess";

type RoleFieldValue = string | string[];
type RoleValues = Record<RoleFieldKey, RoleFieldValue>;

type JdFile = {
  name: string;
  size: string;
  url: string;
};

const departments = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];

const roleFieldLabels: Record<RoleFieldKey, string> = {
  jobType: "Job Type",
  ctc: "CTC / Package",
  openings: "Number of Openings",
  departments: "Departments",
  batch: "Batch / Graduation Year",
  minimumCgpa: "Minimum CGPA",
  maximumBacklogs: "Maximum Backlogs",
  degree: "Degree",
  location: "Job Location",
  experience: "Experience Required",
  skills: "Skills Required",
  otherCriteria: "Other Criteria",
  jobDescription: "Job Description / JD",
  selectionProcess: "Selection Process",
};

const requiredRoleFields = new Set<RoleFieldKey>([
  "jobType",
  "ctc",
  "departments",
  "batch",
  "minimumCgpa",
  "jobDescription",
]);

const selectOptions: Partial<Record<RoleFieldKey, string[]>> = {
  jobType: ["Full Time", "Internship", "Contract"],
  batch: ["2026", "2025", "2024"],
  degree: ["B.E / B.Tech", "BCA", "MCA", "Any Degree"],
};

const skillOptions = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL", "Git", "AWS", "Figma"];
const selectionProcessOptions = ["Aptitude", "Technical", "GD", "HR Interview", "Coding Round"];

const textAreaFields = new Set<RoleFieldKey>(["otherCriteria"]);

const defaultRoleValues: RoleValues = {
  jobType: "",
  ctc: "",
  openings: "",
  departments: [],
  batch: "",
  minimumCgpa: "",
  maximumBacklogs: "",
  degree: "",
  location: "",
  experience: "",
  skills: [],
  otherCriteria: "",
  jobDescription: "",
  selectionProcess: [],
};

export const AddDrive = () => {
  const navigate = useNavigate();
  const [defaultRole, setDefaultRole] = useState<RoleValues>(defaultRoleValues);
  const [jobRole, setJobRole] = useState("");
  const [jdFile, setJdFile] = useState<JdFile | null>(null);

  const updateDefaultField = (field: RoleFieldKey, value: RoleFieldValue) => {
    setDefaultRole((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => () => {
    if (jdFile) URL.revokeObjectURL(jdFile.url);
  }, [jdFile]);

  const handleJdFileChange = (file: File | undefined) => {
    const isPdf = file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");
    if (!file || !isPdf) return;
    setJdFile({
      name: file.name,
      size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB`,
      url: URL.createObjectURL(file),
    });
  };

  const removeJdFile = () => setJdFile(null);

  return (
    <div className="min-h-full space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Add Campus Drive</h1>
          <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">Set shared drive details once, then add role-specific requirements.</p>
        </div>
        <div className="mr-4 flex items-center gap-2">
          <button type="button" disabled className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-3 text-xs font-semibold text-slate-400"><Plus size={14} /> Add another role</button>
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600">Save Drive</button>
        </div>
      </div>

      <div className="grid items-start gap-3">
        <main className="min-w-0 space-y-3">
          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="1" title="Company & Drive Information" />
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
              <div className="xl:col-span-4"><InputField label="Company Name" required placeholder="Enter company name" /></div>
              <div className="xl:col-span-4"><InputField label="Company Website" placeholder="https://" /></div>
              <div className="xl:col-span-4 xl:row-span-2"><TextAreaField label="About Company" placeholder="Brief about the company" className="h-[108px]" /></div>

              <div className="xl:col-span-3"><DateField label="Drive Date" required placeholder="Select date" /></div>
              <div className="xl:col-span-3"><DateField label="Drive Time" required placeholder="Select time" time /></div>
              <div className="xl:col-span-3"><InputField label="Venue" required placeholder="Enter venue" /></div>
              <div className="xl:col-span-3"><SelectField label="Drive Status" options={["Upcoming", "Registration Open", "Ongoing", "Completed"]} /></div>

               <div className="xl:col-span-3"><DateField label="Registration End Date" placeholder="Select date" /></div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="mt-1 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
              <div className="xl:col-span-4"><InputField label="Job Role" required value={jobRole} onChange={setJobRole} placeholder="Enter job role" /></div>
              <div className="xl:col-span-3"><RoleFieldEditor field="jobType" value={defaultRole.jobType} onChange={updateDefaultField} /></div>
              <div className="xl:col-span-3"><RoleFieldEditor field="ctc" value={defaultRole.ctc} onChange={updateDefaultField} /></div>
              <div className="xl:col-span-2"><RoleFieldEditor field="openings" value={defaultRole.openings} onChange={updateDefaultField} /></div>

              <div className="xl:col-span-4"><RoleFieldEditor field="location" value={defaultRole.location} onChange={updateDefaultField} /></div>
              {/* <div className="xl:col-span-4"><RoleFieldEditor field="experience" value={defaultRole.experience} onChange={updateDefaultField} /></div> */}
              <div className="xl:col-span-4"><RoleFieldEditor field="skills" value={defaultRole.skills} onChange={updateDefaultField} /></div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-cyan-700 sm:text-xs">Eligibility criteria</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
                <div className="xl:col-span-4"><RoleFieldEditor field="departments" value={defaultRole.departments} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-3"><RoleFieldEditor field="batch" value={defaultRole.batch} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-3"><RoleFieldEditor field="minimumCgpa" value={defaultRole.minimumCgpa} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-2"><RoleFieldEditor field="maximumBacklogs" value={defaultRole.maximumBacklogs} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-3"><RoleFieldEditor field="degree" value={defaultRole.degree} onChange={updateDefaultField} /></div>
              <div className="xl:col-span-3"><RoleFieldEditor field="otherCriteria" value={defaultRole.otherCriteria} onChange={updateDefaultField} /></div>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-cyan-700 sm:text-xs">Role details & additional information</p>
              <div className="grid gap-3 lg:grid-cols-2">
                <div>
                  <FieldLabel label="Job Description / JD" required />
                  <JobDescriptionEditor
                    value={typeof defaultRole.jobDescription === "string" ? defaultRole.jobDescription : ""}
                    onChange={(value) => updateDefaultField("jobDescription", value)}
                    file={jdFile}
                    onFileChange={handleJdFileChange}
                    onRemoveFile={removeJdFile}
                  />
                </div>
                <RoleFieldEditor field="selectionProcess" value={defaultRole.selectionProcess} onChange={updateDefaultField} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <h2 className="text-sm font-bold text-cyan-500 sm:text-base"><span className="mr-1">{number}.</span>{title}</h2>;
}
function InputField({ label, placeholder, required = false, value, onChange }: { label: string; placeholder: string; required?: boolean; value?: string; onChange?: (value: string) => void }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input type="text" value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs" />
    </label>
  );
}

function TextAreaField({ label, placeholder, required = false, className = "h-[72px]", value, onChange }: { label: string; placeholder: string; required?: boolean; className?: string; value?: string; onChange?: (value: string) => void }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <textarea value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} className={`w-full resize-none rounded-md border border-slate-200 bg-white p-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${className}`} />
    </label>
  );
}

function SelectField({ label, options, required = false, value, onChange, placeholder = "Select an option" }: { label: string; options: string[]; required?: boolean; value?: string; onChange?: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <span className="relative block">
        <select value={onChange ? value ?? "" : undefined} defaultValue={onChange ? undefined : value ?? ""} onChange={onChange ? (event) => onChange(event.target.value) : undefined} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs">
          <option value="">{placeholder}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
      </span>
    </label>
  );
}

function DateField({ label, placeholder, required = false, time = false, value, onChange }: { label: string; placeholder: string; required?: boolean; time?: boolean; value?: string; onChange?: (value: string) => void }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <span className="relative block">
        {time ? <Clock3 size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" /> : <CalendarDays size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input type="text" value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} className="h-9 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs" />
      </span>
    </label>
  );
}

function FieldLabel({ label, required }: { label: string; required: boolean }) {
  return <span className="mb-1.5 block text-[10px] font-semibold text-slate-700 sm:text-xs">{label}{required && <span className="ml-0.5 text-rose-500">*</span>}</span>;
}

function RoleFieldEditor({ field, value, onChange }: { field: RoleFieldKey; value: RoleFieldValue; onChange: (field: RoleFieldKey, value: RoleFieldValue) => void }) {
  return (
    <label className="block">
      <FieldLabel label={roleFieldLabels[field]} required={requiredRoleFields.has(field)} />
      <RoleFieldControl field={field} value={value} onChange={(nextValue) => onChange(field, nextValue)} />
    </label>
  );
}

function RoleFieldControl({ field, value, onChange, disabled = false }: { field: RoleFieldKey; value: RoleFieldValue; onChange: (value: RoleFieldValue) => void; disabled?: boolean }) {
  if (field === "departments") {
    return <DepartmentPicker value={Array.isArray(value) ? value : []} onChange={onChange} disabled={disabled} />;
  }

  if (field === "skills") {
    return <SkillsPicker value={Array.isArray(value) ? value : []} onChange={onChange} disabled={disabled} />;
  }

  if (field === "selectionProcess") {
    return <SelectionProcessPicker value={Array.isArray(value) ? value : []} onChange={onChange} disabled={disabled} />;
  }

  const stringValue = typeof value === "string" ? value : "";
  const options = selectOptions[field];

  if (options) {
    return <SelectControl value={stringValue} options={options} onChange={onChange} disabled={disabled} placeholder={`Select ${roleFieldLabels[field].toLowerCase()}`} />;
  }

  if (textAreaFields.has(field)) {
    return <textarea disabled={disabled} value={stringValue} onChange={(event) => onChange(event.target.value)} placeholder={`Add ${roleFieldLabels[field].toLowerCase()}`} className={`h-[60px] w-full resize-none rounded-md border border-slate-200 p-2.5 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`} />;
  }

  return <input disabled={disabled} type={field === "maximumBacklogs" ? "number" : "text"} min={field === "maximumBacklogs" ? "0" : undefined} value={stringValue} onChange={(event) => onChange(event.target.value)} placeholder={field === "maximumBacklogs" ? "e.g. 0" : `Enter ${roleFieldLabels[field].toLowerCase()}`} className={`h-9 w-full rounded-md border border-slate-200 px-2.5 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`} />;
}

function SelectControl({ value, options, onChange, disabled = false, placeholder }: { value: string; options: string[]; onChange: (value: string) => void; disabled?: boolean; placeholder: string }) {
  return (
    <span className="relative block">
      <select disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className={`h-9 w-full appearance-none rounded-md border border-slate-200 px-2.5 pr-8 text-[11px] font-medium outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`}>
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
    </span>
  );
}

function JobDescriptionEditor({ value, onChange, file, onFileChange, onRemoveFile }: { value: string; onChange: (value: string) => void; file: JdFile | null; onFileChange: (file: File | undefined) => void; onRemoveFile: () => void }) {
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);
  const showPreview = Boolean(file && previewFileUrl === file.url);
  const hasTypedJd = value.trim().length > 0;

  return (
    <div>
      {file ? (
        <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-2.5 py-2">
            <FileText size={15} className="shrink-0 text-rose-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-slate-700 sm:text-xs">{file.name}</p>
              <p className="text-[9px] text-slate-500">{file.size} · PDF preview</p>
            </div>
            <button type="button" onClick={() => setPreviewFileUrl(showPreview ? null : file.url)} aria-label={showPreview ? "Hide JD PDF preview" : "Preview JD PDF"} title={showPreview ? "Hide preview" : "Preview PDF"} className={`rounded p-1 transition ${showPreview ? "bg-cyan-50 text-cyan-600" : "text-slate-400 hover:bg-cyan-50 hover:text-cyan-600"}`}><Eye size={14} /></button>
            <button type="button" onClick={onRemoveFile} aria-label="Remove JD PDF and enter text" title="Remove PDF and enter text" className="rounded p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"><X size={14} /></button>
          </div>
          <p className="px-2.5 py-2 text-[10px] text-slate-500">Using uploaded PDF. Remove it to enter the JD as text.</p>
        </div>
      ) : (
        <>
          <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder="Enter job description, responsibilities, skills required, etc." className="h-[116px] w-full resize-none rounded-md border border-slate-200 bg-white p-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs" />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {hasTypedJd ? (
              <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 sm:text-xs">Clear text to upload PDF</button>
            ) : (
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-cyan-300 bg-white px-3 py-1.5 text-[10px] font-semibold text-cyan-700 transition hover:bg-cyan-50 sm:text-xs">
                <Upload size={13} /> Upload JD PDF
                <input type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => {
                  onFileChange(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }} />
              </label>
            )}
            <span className="text-[10px] text-slate-500 sm:text-xs">{hasTypedJd ? "Using typed JD. Clear it to upload a PDF." : "Choose either typed text or one PDF upload."}</span>
          </div>
        </>
      )}

      {showPreview && file && (
        <div role="dialog" aria-modal="true" aria-label={`Preview of ${file.name}`} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4" onClick={() => setPreviewFileUrl(null)}>
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <FileText size={16} className="shrink-0 text-rose-500" />
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{file.name}</p>
              <button type="button" onClick={() => setPreviewFileUrl(null)} aria-label="Close PDF preview" title="Close preview" className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
            </div>
            <iframe src={file.url} title={`Preview of ${file.name}`} className="min-h-[65vh] w-full bg-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
}

function DepartmentPicker({ value, onChange, disabled = false }: { value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) {
  const toggleDepartment = (department: string) => {
    onChange(value.includes(department) ? value.filter((item) => item !== department) : [...value, department]);
  };

  return (
    <div className={`flex min-h-9 flex-wrap items-center gap-1 rounded-md border border-slate-200 px-2 py-1 ${disabled ? "bg-slate-100" : "bg-white"}`}>
      {departments.map((department) => {
        const selected = value.includes(department);
        return (
          <button key={department} disabled={disabled} type="button" onClick={() => toggleDepartment(department)} className={`inline-flex items-center gap-1 rounded px-1.5 py-1 text-[10px] font-semibold transition ${selected ? "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100" : "bg-slate-50 text-slate-400 hover:bg-slate-100"} ${disabled ? "cursor-not-allowed" : ""}`}>
            {selected && <Check size={11} />}{department}
          </button>
        );
      })}
    </div>
  );
}

function SkillsPicker({ value, onChange, disabled = false }: { value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSkill = (skill: string) => {
    onChange(value.includes(skill) ? value.filter((item) => item !== skill) : [...value, skill]);
  };

  return (
    <div className={`relative min-w-0 w-full ${isOpen ? "z-[9999]" : "z-0"}`}>
      <button disabled={disabled} type="button" onClick={() => setIsOpen((open) => !open)} className={`flex min-h-9 min-w-0 w-full flex-wrap items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-left ${disabled ? "cursor-not-allowed bg-slate-100" : "bg-white hover:border-cyan-300"}`}>
        {value.length ? value.map((skill) => <span key={skill} className="rounded bg-cyan-50 px-1.5 py-1 text-[10px] font-semibold text-cyan-700">{skill}</span>) : <span className="px-0.5 text-[11px] text-slate-400">Select skills</span>}
        <ChevronDown size={14} className="ml-auto shrink-0 text-slate-500" />
      </button>
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full z-[99999] mt-1 box-border max-h-48 min-w-0 overflow-x-hidden overflow-y-auto rounded-md border border-slate-200 bg-white p-1.5 shadow-lg">
          {skillOptions.map((skill) => {
            const selected = value.includes(skill);
            return <button key={skill} type="button" onClick={() => toggleSkill(skill)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[11px] font-medium text-slate-700 transition hover:bg-cyan-50"><span className={`flex h-4 w-4 items-center justify-center rounded border ${selected ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-300"}`}>{selected && <Check size={11} />}</span>{skill}</button>;
          })}
        </div>
      )}
    </div>
  );
}

function SelectionProcessPicker({ value, onChange, disabled = false }: { value: string[]; onChange: (value: string[]) => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleProcess = (process: string) => {
    onChange(value.includes(process) ? value.filter((item) => item !== process) : [...value, process]);
  };

  return (
    <div className={`relative min-w-0 w-full ${isOpen ? "z-[9999]" : "z-0"}`}>
      <button disabled={disabled} type="button" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} className={`flex min-h-9 w-full items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1 text-left text-[11px] transition ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-500 hover:border-cyan-300"}`}>
        <span>{value.length ? `${value.length} process${value.length === 1 ? "" : "es"} selected` : "Select selection processes"}</span>
        <ChevronDown size={14} className="ml-auto shrink-0 text-slate-500" />
      </button>

      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((process) => (
            <span key={process} className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-semibold text-cyan-700 ring-1 ring-cyan-100">
              {process}
              <button type="button" disabled={disabled} aria-label={`Remove ${process}`} onClick={() => toggleProcess(process)} className="rounded-full text-cyan-500 transition hover:bg-cyan-100 hover:text-cyan-800"><X size={11} /></button>
            </span>
          ))}
        </div>
      )}

      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-full z-[99999] mt-1 overflow-hidden rounded-md border border-slate-200 bg-white p-1.5 shadow-lg">
          {selectionProcessOptions.map((process) => {
            const selected = value.includes(process);
            return <button key={process} type="button" onClick={() => toggleProcess(process)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[11px] font-medium text-slate-700 transition hover:bg-cyan-50"><span className={`flex h-4 w-4 items-center justify-center rounded border ${selected ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-300"}`}>{selected && <Check size={11} />}</span>{process}</button>;
          })}
        </div>
      )}
    </div>
  );
}
