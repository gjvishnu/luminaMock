import {
  AlignLeft,
  Bold,
  CalendarDays,
  ChevronDown,
  Clock3,
  FileText,
  Image,
  Info,
  Italic,
  Link,
  List,
  Trash2,
  Underline,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UploadedFile = {
  name: string;
  size: string;
  type: "pdf" | "image";
};

const startingFiles: UploadedFile[] = [
  { name: "Job Description (JD).pdf", size: "245 KB • PDF", type: "pdf" },
  { name: "Company Brochure.pdf", size: "1.2 MB • PDF", type: "pdf" },
  { name: "Eligibility Criteria.pdf", size: "180 KB • PDF", type: "pdf" },
  { name: "Drive Poster.png", size: "420 KB • PNG", type: "image" },
];

const departments = ["CSE", "ECE", "EEE"];

export const AddDrive = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState(startingFiles);

  const removeFile = (name: string) => {
    setUploadedFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <div className="min-h-full space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={() => navigate("/campusdrive")} className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-500">Save Drive</button>
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

              <div className="xl:col-span-3"><InputField label="Job Role" required placeholder="Enter job role" /></div>
              <div className="xl:col-span-3"><SelectField label="Job Type" options={["Select job type", "Full Time", "Internship", "Contract"]} /></div>
              <div className="xl:col-span-2"><InputField label="CTC / Package" required placeholder="e.g. 7.5 LPA" /></div>

              <div className="xl:col-span-3"><DateField label="Drive Date" required placeholder="Select date" /></div>
              <div className="xl:col-span-3"><DateField label="Drive Time" required placeholder="Select time" time /></div>
              <div className="xl:col-span-3"><InputField label="Venue" required placeholder="Enter venue" /></div>

              <div className="xl:col-span-3"><SelectField label="Drive Status" options={["Upcoming", "Registration Open", "Ongoing", "Completed"]} /></div>
              <div className="xl:col-span-3"><DateField label="Registration Start Date" placeholder="Select date" /></div>
              <div className="xl:col-span-3"><DateField label="Registration End Date" placeholder="Select date" /></div>
              <div className="xl:col-span-3"><InputField label="Number of Openings" placeholder="e.g. 25" /></div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="2" title="Eligibility Criteria" />
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-12">
              <div className="xl:col-span-4"><DepartmentField /></div>
              <div className="xl:col-span-3"><SelectField label="Batch / Graduation Year" required options={["Select batch", "2026", "2025", "2024"]} /></div>
              <div className="xl:col-span-3"><InputField label="Minimum CGPA" required placeholder="e.g. 7.0" /></div>
              <div className="xl:col-span-2"><SelectField label="Maximum Backlogs" options={["No Active Backlogs", "1 backlog", "2 backlogs"]} /></div>

              <div className="xl:col-span-3"><InputField label="10th % Criteria" placeholder="e.g. 60 or Above" /></div>
              <div className="xl:col-span-3"><InputField label="12th % Criteria" placeholder="e.g. 60 or Above" /></div>
              <div className="xl:col-span-3"><SelectField label="Degree" options={["B.E / B.Tech", "BCA", "MCA", "Any Degree"]} /></div>
              <div className="xl:col-span-3"><TextAreaField label="Other Criteria" placeholder="Any additional criteria" className="h-[66px]" /></div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="3" title="Drive Details" />
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <RichTextField label="Job Description / JD" required placeholder="Enter job description, responsibilities, skills required, etc." />
              <RichTextField label="Selection Process" placeholder="Describe the selection process (Test, Interviews, HR, etc.)" />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="4" title="Additional Information" />
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <TextAreaField label="Benefits (if any)" placeholder="e.g. Medical Insurance, PF, etc." className="h-[60px]" />
              <TextAreaField label="Documents to Carry" placeholder="e.g. Resume, ID Proof, Mark Sheets" className="h-[60px]" />
              <TextAreaField label="Other Instructions" placeholder="Any other information for students" className="h-[60px]" />
            </div>
          </section>
        </main>

        <aside className="min-w-0 space-y-3">
          <UploadFiles files={uploadedFiles} onRemove={removeFile} onUpload={(file) => setUploadedFiles((files) => [...files, file])} />
          <EligibilitySummary />
        </aside>
      </div>
    </div>
  );
};

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <h2 className="text-sm font-bold text-cyan-500 sm:text-base"><span className="mr-1">{number}.</span>{title}</h2>;
}

function InputField({ label, placeholder, required = false }: { label: string; placeholder: string; required?: boolean }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input type="text" placeholder={placeholder} className="h-9 w-full rounded-md border border-slate-200 bg-white px-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs" />
    </label>
  );
}

function TextAreaField({ label, placeholder, required = false, className = "h-[72px]" }: { label: string; placeholder: string; required?: boolean; className?: string }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <textarea placeholder={placeholder} className={`w-full resize-none rounded-md border border-slate-200 bg-white p-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs ${className}`} />
    </label>
  );
}

function SelectField({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <span className="relative block">
        <select defaultValue={options[0]} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs">
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
      </span>
    </label>
  );
}

function DateField({ label, placeholder, required = false, time = false }: { label: string; placeholder: string; required?: boolean; time?: boolean }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <span className="relative block">
        {time ? <Clock3 size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" /> : <CalendarDays size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input type="text" placeholder={placeholder} className="h-9 w-full rounded-md border border-slate-200 bg-white pl-8 pr-2.5 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs" />
      </span>
    </label>
  );
}

function FieldLabel({ label, required }: { label: string; required: boolean }) {
  return <span className="mb-1.5 block text-[10px] font-semibold text-slate-700 sm:text-xs">{label}{required && <span className="ml-0.5 text-rose-500">*</span>}</span>;
}

function DepartmentField() {
  return (
    <label className="block">
      <FieldLabel label="Departments" required />
      <span className="flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-2">
        {departments.map((department) => <span key={department} className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-1 text-[10px] font-semibold text-slate-600">{department}<X size={11} className="text-slate-400" /></span>)}
        <ChevronDown size={14} className="ml-auto shrink-0 text-slate-500" />
      </span>
    </label>
  );
}

function RichTextField({ label, placeholder, required = false }: { label: string; placeholder: string; required?: boolean }) {
  return (
    <div>
      <FieldLabel label={label} required={required} />
      <div className="overflow-hidden rounded-md border border-slate-200">
        <div className="flex h-9 items-center gap-3 border-b border-slate-200 px-2 text-slate-600">
          <button type="button" aria-label="Bold" className="hover:text-cyan-600"><Bold size={14} /></button>
          <button type="button" aria-label="Italic" className="hover:text-cyan-600"><Italic size={14} /></button>
          <button type="button" aria-label="Underline" className="hover:text-cyan-600"><Underline size={14} /></button>
          <span className="h-5 border-l border-slate-200" />
          <button type="button" aria-label="Bulleted list" className="hover:text-cyan-600"><List size={14} /></button>
          <button type="button" aria-label="Align left" className="hover:text-cyan-600"><AlignLeft size={14} /></button>
          <button type="button" aria-label="Add link" className="hover:text-cyan-600"><Link size={14} /></button>
        </div>
        <textarea placeholder={placeholder} className="h-[84px] w-full resize-none p-2.5 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 sm:text-xs" />
      </div>
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

function EligibilitySummary() {
  const rows = [
    ["Departments", "CSE, ECE, EEE"],
    ["Batch", "2026"],
    ["Min. CGPA", "7.0"],
    ["Backlogs", "No Active Backlogs"],
    ["10th %", "60 and Above"],
    ["12th %", "60 and Above"],
    ["Openings", "25"],
  ];
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h2 className="flex items-center gap-1.5 text-sm font-bold text-slate-800 sm:text-base">Eligibility Summary <Info size={13} className="text-slate-400" /></h2>
      <div className="mt-3 space-y-2 text-[10px] sm:text-xs">
        {rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3"><span className="font-medium text-slate-500">{label}</span><span className="text-right font-semibold text-slate-700">{value}</span></div>)}
      </div>
      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3 text-[10px] leading-relaxed text-slate-700 sm:text-xs">
        <Info size={16} className="float-left mr-2 mt-0.5 text-blue-500" />
        Based on the above criteria, approximately <span className="font-bold text-blue-700">320 students</span> are eligible for this drive.
      </div>
    </section>
  );
}
