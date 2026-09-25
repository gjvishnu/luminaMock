import {
  AlignLeft,
  BadgeCheck,
  Bold,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Image,
  Info,
  Italic,
  Link,
  List,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Underline,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UploadedFile = {
  name: string;
  size: string;
  type: "pdf" | "image";
};

type RoleFieldKey =
  | "jobType"
  | "ctc"
  | "openings"
  | "departments"
  | "batch"
  | "minimumCgpa"
  | "maximumBacklogs"
  | "tenthCriteria"
  | "twelfthCriteria"
  | "degree"
  | "location"
  | "experience"
  | "skills"
  | "otherCriteria"
  | "jobDescription"
  | "selectionProcess"
  | "benefits"
  | "documentsToCarry"
  | "otherInstructions";

type RoleFieldValue = string | string[];
type RoleValues = Record<RoleFieldKey, RoleFieldValue>;
type RoleOverride = Partial<RoleValues>;

type DriveRole = {
  id: string;
  name: string;
  overrides: RoleOverride;
};

const startingFiles: UploadedFile[] = [
  { name: "Job Description (JD).pdf", size: "245 KB • PDF", type: "pdf" },
  { name: "Company Brochure.pdf", size: "1.2 MB • PDF", type: "pdf" },
  { name: "Eligibility Criteria.pdf", size: "180 KB • PDF", type: "pdf" },
  { name: "Drive Poster.png", size: "420 KB • PNG", type: "image" },
];

const departments = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];

const roleFieldLabels: Record<RoleFieldKey, string> = {
  jobType: "Job Type",
  ctc: "CTC / Package",
  openings: "Number of Openings",
  departments: "Departments",
  batch: "Batch / Graduation Year",
  minimumCgpa: "Minimum CGPA",
  maximumBacklogs: "Maximum Backlogs",
  tenthCriteria: "10th % Criteria",
  twelfthCriteria: "12th % Criteria",
  degree: "Degree",
  location: "Job Location",
  experience: "Experience Required",
  skills: "Skills Required",
  otherCriteria: "Other Criteria",
  jobDescription: "Job Description / JD",
  selectionProcess: "Selection Process",
  benefits: "Benefits (if any)",
  documentsToCarry: "Documents to Carry",
  otherInstructions: "Other Instructions",
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
  batch: ["Select batch", "2026", "2025", "2024"],
  degree: ["B.E / B.Tech", "BCA", "MCA", "Any Degree"],
};

const skillOptions = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "SQL", "Git", "AWS", "Figma"];

const textAreaFields = new Set<RoleFieldKey>([
  "otherCriteria",
  "jobDescription",
  "selectionProcess",
  "benefits",
  "documentsToCarry",
  "otherInstructions",
]);

const defaultRoleValues: RoleValues = {
  jobType: "Full Time",
  ctc: "₹7.5 LPA",
  openings: "25",
  departments: ["CSE", "ECE", "EEE"],
  batch: "2026",
  minimumCgpa: "7.0",
  maximumBacklogs: "0",
  tenthCriteria: "60 or Above",
  twelfthCriteria: "60 or Above",
  degree: "B.E / B.Tech",
  location: "Bengaluru / Hybrid",
  experience: "Fresher / 0-1 years",
  skills: ["React", "TypeScript", "Git"],
  otherCriteria: "",
  jobDescription: "",
  selectionProcess: "",
  benefits: "",
  documentsToCarry: "",
  otherInstructions: "",
};

const cloneRoleValue = (value: RoleFieldValue): RoleFieldValue => (Array.isArray(value) ? [...value] : value);

export const AddDrive = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState(startingFiles);
  const [defaultRole, setDefaultRole] = useState<RoleValues>(defaultRoleValues);
  const [roles, setRoles] = useState<DriveRole[]>([
    { id: "role-1", name: "Frontend Developer", overrides: {} },
  ]);

  const removeFile = (name: string) => {
    setUploadedFiles((files) => files.filter((file) => file.name !== name));
  };

  const updateDefaultField = (field: RoleFieldKey, value: RoleFieldValue) => {
    setDefaultRole((current) => ({ ...current, [field]: value }));
  };

  const updateRoleName = (id: string, name: string) => {
    setRoles((current) => current.map((role) => (role.id === id ? { ...role, name } : role)));
  };

  const addRole = () => {
    setRoles((current) => [
      ...current,
      { id: `role-${Date.now()}`, name: `Role ${current.length + 1}`, overrides: {} },
    ]);
  };

  const removeRole = (id: string) => {
    setRoles((current) => current.filter((role) => role.id !== id));
  };

  const customizeRoleField = (roleId: string, field: RoleFieldKey) => {
    setRoles((current) => current.map((role) => (
      role.id === roleId
        ? { ...role, overrides: { ...role.overrides, [field]: cloneRoleValue(defaultRole[field]) } }
        : role
    )));
  };

  const updateRoleOverride = (roleId: string, field: RoleFieldKey, value: RoleFieldValue) => {
    setRoles((current) => current.map((role) => (
      role.id === roleId
        ? { ...role, overrides: { ...role.overrides, [field]: value } }
        : role
    )));
  };

  const clearRoleOverride = (roleId: string, field: RoleFieldKey) => {
    setRoles((current) => current.map((role) => {
      if (role.id !== roleId) return role;
      const overrides = { ...role.overrides };
      delete overrides[field];
      return { ...role, overrides };
    }));
  };

  return (
    <div className="min-h-full space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">Add Campus Drive</h1>
          <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">Set shared drive details once, then add role-specific requirements.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600">Save Drive</button>
        </div>
      </div>

      <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_310px]">
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
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <SectionTitle number="2" title="Roles & Role-specific Details" />
                <p className="mt-1 max-w-3xl text-[10px] leading-relaxed text-slate-500 sm:text-xs">
                  Role 1 is the default configuration. Every new role inherits these values automatically; customize only the fields that differ.
                </p>
              </div>
              <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-bold text-cyan-700 sm:text-xs">{roles.length} {roles.length === 1 ? "role" : "roles"}</span>
            </div>

            <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50/30 p-3 sm:p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">1</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800">Default role configuration</h3>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-cyan-700 ring-1 ring-cyan-100"><BadgeCheck size={11} /> Applies to new roles</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">Changes here update every role that is still using the default value.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
                <div className="xl:col-span-4"><InputField label="Job Role" required value={roles[0].name} onChange={(value) => updateRoleName(roles[0].id, value)} placeholder="Enter job role" /></div>
                <div className="xl:col-span-3"><RoleFieldEditor field="jobType" value={defaultRole.jobType} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-3"><RoleFieldEditor field="ctc" value={defaultRole.ctc} onChange={updateDefaultField} /></div>
                <div className="xl:col-span-2"><RoleFieldEditor field="openings" value={defaultRole.openings} onChange={updateDefaultField} /></div>

                <div className="xl:col-span-4"><RoleFieldEditor field="location" value={defaultRole.location} onChange={updateDefaultField} /></div>
                {/* <div className="xl:col-span-4"><RoleFieldEditor field="experience" value={defaultRole.experience} onChange={updateDefaultField} /></div> */}
                <div className="xl:col-span-4"><RoleFieldEditor field="skills" value={defaultRole.skills} onChange={updateDefaultField} /></div>
              </div>

              <div className="mt-4 border-t border-cyan-100 pt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-cyan-700 sm:text-xs">Eligibility criteria</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
                  <div className="xl:col-span-4"><RoleFieldEditor field="departments" value={defaultRole.departments} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="batch" value={defaultRole.batch} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="minimumCgpa" value={defaultRole.minimumCgpa} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-2"><RoleFieldEditor field="maximumBacklogs" value={defaultRole.maximumBacklogs} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="tenthCriteria" value={defaultRole.tenthCriteria} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="twelfthCriteria" value={defaultRole.twelfthCriteria} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="degree" value={defaultRole.degree} onChange={updateDefaultField} /></div>
                  <div className="xl:col-span-3"><RoleFieldEditor field="otherCriteria" value={defaultRole.otherCriteria} onChange={updateDefaultField} /></div>
                </div>
              </div>

              <div className="mt-4 border-t border-cyan-100 pt-4">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-cyan-700 sm:text-xs">Role details & additional information</p>
                <div className="grid gap-3 lg:grid-cols-2">
                  <RoleFieldEditor field="jobDescription" value={defaultRole.jobDescription} onChange={updateDefaultField} />
                  <RoleFieldEditor field="selectionProcess" value={defaultRole.selectionProcess} onChange={updateDefaultField} />
                  <RoleFieldEditor field="benefits" value={defaultRole.benefits} onChange={updateDefaultField} />
                  <RoleFieldEditor field="documentsToCarry" value={defaultRole.documentsToCarry} onChange={updateDefaultField} />
                  <RoleFieldEditor field="otherInstructions" value={defaultRole.otherInstructions} onChange={updateDefaultField} />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Additional roles</h3>
                <p className="text-[10px] text-slate-500 sm:text-xs">Inherited fields stay synced with the default role until customized.</p>
              </div>
              <button type="button" onClick={addRole} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-cyan-300 bg-white px-3 text-[10px] font-bold text-cyan-700 transition hover:bg-cyan-50 sm:text-xs"><Plus size={14} /> Add another role</button>
            </div>

            <div className="mt-3 space-y-3">
              {roles.slice(1).map((role, index) => (
                <RoleOverrideCard
                  key={role.id}
                  role={role}
                  roleNumber={index + 2}
                  defaultRole={defaultRole}
                  onNameChange={updateRoleName}
                  onCustomize={customizeRoleField}
                  onChange={updateRoleOverride}
                  onReset={clearRoleOverride}
                  onRemove={removeRole}
                />
              ))}
              {roles.length === 1 && (
                <div className="rounded-lg border border-dashed border-slate-200 px-4 py-5 text-center text-[11px] text-slate-500 sm:text-xs">
                  Add another role to reuse the default configuration with optional role-specific overrides.
                </div>
              )}
            </div>
          </section>
        </main>

        <aside className="min-w-0 space-y-3">
          <UploadFiles files={uploadedFiles} onRemove={removeFile} onUpload={(file) => setUploadedFiles((files) => [...files, file])} />
         </aside>
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

function SelectField({ label, options, required = false, value, onChange }: { label: string; options: string[]; required?: boolean; value?: string; onChange?: (value: string) => void }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <span className="relative block">
        <select value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} defaultValue={value ? undefined : options[0]} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs">
          {options.map((option) => <option key={option}>{option}</option>)}
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

  const stringValue = typeof value === "string" ? value : "";
  const options = selectOptions[field];

  if (options) {
    return <SelectControl value={stringValue} options={options} onChange={onChange} disabled={disabled} />;
  }

  if (field === "jobDescription" || field === "selectionProcess") {
    return <RichTextControl value={stringValue} onChange={onChange} placeholder={field === "jobDescription" ? "Enter job description, responsibilities, skills required, etc." : "Describe the selection process (Test, Interviews, HR, etc.)"} disabled={disabled} />;
  }

  if (textAreaFields.has(field)) {
    return <textarea disabled={disabled} value={stringValue} onChange={(event) => onChange(event.target.value)} placeholder={`Add ${roleFieldLabels[field].toLowerCase()}`} className={`h-[60px] w-full resize-none rounded-md border border-slate-200 p-2.5 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`} />;
  }

  return <input disabled={disabled} type={field === "maximumBacklogs" ? "number" : "text"} min={field === "maximumBacklogs" ? "0" : undefined} value={stringValue} onChange={(event) => onChange(event.target.value)} placeholder={field === "maximumBacklogs" ? "e.g. 0" : `Enter ${roleFieldLabels[field].toLowerCase()}`} className={`h-9 w-full rounded-md border border-slate-200 px-2.5 text-[11px] outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`} />;
}

function SelectControl({ value, options, onChange, disabled = false }: { value: string; options: string[]; onChange: (value: string) => void; disabled?: boolean }) {
  return (
    <span className="relative block">
      <select disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className={`h-9 w-full appearance-none rounded-md border border-slate-200 px-2.5 pr-8 text-[11px] font-medium outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "bg-white text-slate-700"}`}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
    </span>
  );
}

function RichTextControl({ value, onChange, placeholder, disabled = false }: { value: string; onChange: (value: string) => void; placeholder: string; disabled?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-md border border-slate-200 ${disabled ? "bg-slate-100" : "bg-white"}`}>
      <div className="flex h-8 items-center gap-3 border-b border-slate-200 px-2 text-slate-600">
        <button disabled={disabled} type="button" aria-label="Bold" className="hover:text-cyan-600"><Bold size={13} /></button>
        <button disabled={disabled} type="button" aria-label="Italic" className="hover:text-cyan-600"><Italic size={13} /></button>
        <button disabled={disabled} type="button" aria-label="Underline" className="hover:text-cyan-600"><Underline size={13} /></button>
        <span className="h-4 border-l border-slate-200" />
        <button disabled={disabled} type="button" aria-label="Bulleted list" className="hover:text-cyan-600"><List size={13} /></button>
        <button disabled={disabled} type="button" aria-label="Align left" className="hover:text-cyan-600"><AlignLeft size={13} /></button>
        <button disabled={disabled} type="button" aria-label="Add link" className="hover:text-cyan-600"><Link size={13} /></button>
      </div>
      <textarea disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`h-[84px] w-full resize-none p-2.5 text-[11px] outline-none placeholder:text-slate-400 sm:text-xs ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-500" : "text-slate-700"}`} />
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

function RoleOverrideCard({ role, roleNumber, defaultRole, onNameChange, onCustomize, onChange, onReset, onRemove }: { role: DriveRole; roleNumber: number; defaultRole: RoleValues; onNameChange: (id: string, name: string) => void; onCustomize: (id: string, field: RoleFieldKey) => void; onChange: (id: string, field: RoleFieldKey, value: RoleFieldValue) => void; onReset: (id: string, field: RoleFieldKey) => void; onRemove: (id: string) => void }) {
  const overriddenCount = Object.keys(role.overrides).length;
  const fields = Object.keys(roleFieldLabels) as RoleFieldKey[];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">{roleNumber}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <input value={role.name} onChange={(event) => onNameChange(role.id, event.target.value)} aria-label={`Role ${roleNumber} name`} className="h-8 min-w-[180px] rounded-md border border-slate-200 bg-white px-2 text-sm font-bold text-slate-800 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100" />
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${overriddenCount ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{overriddenCount ? `${overriddenCount} customized` : "All fields inherited"}</span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Each field below uses the default role until you choose to customize it.</p>
          </div>
        </div>
        <button type="button" onClick={() => onRemove(role.id)} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 sm:text-xs"><Trash2 size={13} /> Remove role</button>
      </div>

      <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {fields.map((field) => (
          <OverrideField
            key={field}
            field={field}
            role={role}
            defaultRole={defaultRole}
            onCustomize={onCustomize}
            onChange={onChange}
            onReset={onReset}
          />
        ))}
      </div>
    </div>
  );
}

function OverrideField({ field, role, defaultRole, onCustomize, onChange, onReset }: { field: RoleFieldKey; role: DriveRole; defaultRole: RoleValues; onCustomize: (id: string, field: RoleFieldKey) => void; onChange: (id: string, field: RoleFieldKey, value: RoleFieldValue) => void; onReset: (id: string, field: RoleFieldKey) => void }) {
  const isCustomized = Object.prototype.hasOwnProperty.call(role.overrides, field);
  const value = isCustomized ? role.overrides[field] ?? "" : defaultRole[field];

  return (
    <div className={`rounded-lg border p-2.5 ${isCustomized ? "border-amber-200 bg-amber-50/30" : "border-slate-200 bg-slate-50/50"}`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold text-slate-700 sm:text-xs">{roleFieldLabels[field]}</p>
          <span className={`mt-0.5 inline-flex items-center gap-1 text-[9px] font-semibold ${isCustomized ? "text-amber-700" : "text-slate-500"}`}>
            {isCustomized ? <><Pencil size={10} /> Customized for this role</> : <><BadgeCheck size={10} /> Inherited from default</>}
          </span>
        </div>
        {isCustomized ? (
          <button type="button" onClick={() => onReset(role.id, field)} className="inline-flex shrink-0 items-center gap-1 text-[9px] font-bold text-slate-500 transition hover:text-cyan-600" title="Use the default value"><RotateCcw size={11} /> Use default</button>
        ) : (
          <button type="button" onClick={() => onCustomize(role.id, field)} className="inline-flex shrink-0 items-center gap-1 text-[9px] font-bold text-cyan-700 transition hover:text-cyan-500" title="Customize this field"><Pencil size={11} /> Customize</button>
        )}
      </div>
      <RoleFieldControl field={field} value={value} disabled={!isCustomized} onChange={(nextValue) => onChange(role.id, field, nextValue)} />
    </div>
  );
}

function UploadFiles({ files, onRemove, onUpload }: { files: UploadedFile[]; onRemove: (name: string) => void; onUpload: (file: UploadedFile) => void }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-800 sm:text-base">Upload Files <Info size={13} className="text-slate-400" /></h2>
      <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Upload related documents (Optional)</p>
      <label className="mt-3 flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-cyan-200 bg-cyan-50/10 px-3 text-center transition hover:bg-cyan-50/40">
        <Upload size={29} className="text-cyan-600" />
        <span className="mt-2 text-xs font-medium text-slate-600">Drag &amp; drop files here</span>
        <span className="my-1 text-xs text-slate-500">or</span>
        <span className="rounded-md border border-cyan-300 bg-white px-5 py-1.5 text-xs font-semibold text-cyan-500">Browse Files</span>
        <input type="file" multiple className="sr-only" onChange={(event) => {
          Array.from(event.target.files ?? []).forEach((file) => onUpload({ name: file.name, size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB • ${file.type.split("/")[1]?.toUpperCase() ?? "FILE"}`, type: file.type.startsWith("image/") ? "image" : "pdf" }));
          event.currentTarget.value = "";
        }} />
      </label>
      <p className="mt-2 text-[10px] leading-relaxed text-slate-500">Allowed files: PDF, DOC, DOCX, PPT, PPTX<br />Max file size: 10MB each</p>
      <div className="mt-3 divide-y divide-slate-100">
        {files.map((file) => (
          <div key={file.name} className="flex items-center gap-2 py-2">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${file.type === "image" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`}>{file.type === "image" ? <Image size={15} /> : <FileText size={15} />}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-[10px] font-semibold text-slate-700">{file.name}</span><span className="block text-[9px] text-slate-500">{file.size}</span></span>
            <button type="button" aria-label={`Remove ${file.name}`} onClick={() => onRemove(file.name)} className="text-slate-400 transition hover:text-rose-500"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
 