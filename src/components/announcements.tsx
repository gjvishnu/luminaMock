import {
  AlignLeft,
  Bell,
  Bold,
  ChevronDown,
  Download,
  FileText,
  Image,
  Info,
  Italic,
  Link,
  List,
  Mail,
  MessageCircle,
  Send,
  Underline,
  Upload,
} from "lucide-react";
import { useState } from "react";

type Channel = "Email" | "SMS / Text Message" | "WhatsApp" | "In-App Notification";

type Attachment = {
  name: string;
  size: string;
  type: "pdf" | "doc";
};

const channelOptions: { label: Channel; description: string; tone: string }[] = [
  { label: "Email", description: "Send via email to students", tone: "text-cyan-600" },
  { label: "SMS / Text Message", description: "Send via SMS to students' mobile numbers", tone: "text-blue-600" },
  { label: "WhatsApp", description: "Send via WhatsApp to students (if number available)", tone: "text-emerald-500" },
  { label: "In-App Notification", description: "Send in-app notification", tone: "text-slate-400" },
];

const initialAttachments: Attachment[] = [
  { name: "TCS_Drive_Details.pdf", size: "245 KB", type: "pdf" },
  { name: "Eligibility_Criteria.docx", size: "120 KB", type: "doc" },
];

export const Announcements = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("Select audience");
  const [departments, setDepartments] = useState("Select departments");
  const [batches, setBatches] = useState("Select batches");
  const [year, setYear] = useState("Select year / semester");
  const [channels, setChannels] = useState<Channel[]>(["Email", "SMS / Text Message", "WhatsApp"]);
  const [attachments, setAttachments] = useState(initialAttachments);
  const [notice, setNotice] = useState("");

  const toggleChannel = (channel: Channel) => {
    setChannels((selected) => selected.includes(channel) ? selected.filter((item) => item !== channel) : [...selected, channel]);
  };

  const updateAttachment = (file: Attachment) => {
    setAttachments((current) => [...current, file]);
  };

  return (
    <div className="min-h-full space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Create Announcement</h1>
          <p className="mt-1 text-xs text-slate-500">Share important updates with students and keep everyone informed.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setNotice("Announcement saved as draft.")} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">Save as Draft</button>
          <button type="button" onClick={() => setNotice("Announcement is ready to send.")} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"><Send size={14} /> Send Announcement</button>
        </div>
      </div>

      {notice && <p role="status" className="rounded-md border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700">{notice}</p>}

      <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,1fr)_390px]">
        <main className="min-w-0 space-y-3">
          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="1" title="Announcement Details" />
            <div className="mt-3">
              <FieldLabel label="Announcement Title" required />
              <input value={title} onChange={(event) => setTitle(event.target.value.slice(0, 150))} placeholder="Enter announcement title" className="h-9 w-full rounded-md border border-slate-200 px-2.5 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100" />
              <p className="mt-1 text-right text-[10px] text-slate-500">{title.length}/150</p>
            </div>
            <div className="mt-1">
              <FieldLabel label="Message" required />
              <RichTextEditor value={message} onChange={setMessage} />
              <p className="mt-1 text-right text-[10px] text-slate-500">{message.length}/2000</p>
            </div>
            <div className="mt-3">
              <FieldLabel label="Attach Files (Optional)" />
              <label className="flex h-[68px] cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-cyan-200 bg-cyan-50/10 px-3 text-center transition hover:bg-cyan-50/40">
                <Upload size={18} className="text-cyan-500" />
                <span className="text-xs text-slate-600">Drag &amp; drop files here or</span>
                <span className="rounded-md border border-cyan-300 bg-white px-4 py-1.5 text-xs font-semibold text-cyan-600">Browse Files</span>
                <input type="file" multiple className="sr-only" onChange={(event) => {
                  Array.from(event.target.files ?? []).forEach((file) => updateAttachment({ name: file.name, size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB`, type: file.name.endsWith(".docx") ? "doc" : "pdf" }));
                  event.currentTarget.value = "";
                }} />
              </label>
              <p className="mt-1.5 text-[10px] text-slate-500">Allowed files: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG (Max 10MB each)</p>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="2" title="Select Audience" />
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <SelectField label="Send To" required value={audience} options={["Select audience", "All Students", "Eligible Students", "Selected Students"]} onChange={setAudience} />
              <SelectField label="Departments (Optional)" value={departments} options={["Select departments", "All Departments", "CSE, ECE, EEE", "IT, MECH"]} onChange={setDepartments} />
              <SelectField label="Batches (Optional)" value={batches} options={["Select batches", "2024", "2025", "2026"]} onChange={setBatches} />
              <SelectField label="Year / Semester (Optional)" value={year} options={["Select year / semester", "All Years / All Semesters", "Final Year", "Semester 7"]} onChange={setYear} />
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-md border border-cyan-100 bg-cyan-50/70 px-3 py-2 text-[10px] text-cyan-700 sm:text-xs"><Info size={15} className="shrink-0 text-cyan-500" />Announcement will be sent to selected audience only.</div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <SectionTitle number="3" title="Mode of communication " />
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">Select one or more channels to send this announcement</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {channelOptions.map((channel) => {
                const selected = channels.includes(channel.label);
                return <ChannelCard key={channel.label} channel={channel} selected={selected} onToggle={() => toggleChannel(channel.label)} />;
              })}
            </div>
            <div className="mt-3 rounded-md border border-cyan-100 bg-cyan-50/50 px-3 py-2 text-[10px] text-cyan-700 sm:text-xs"><span className="font-semibold">Note:</span> SMS and WhatsApp will be sent only to students who have updated their mobile numbers.</div>
          </section>
        </main>

        <aside className="min-w-0 space-y-3">
          <AnnouncementPreview title={title || "Campus Placement Drive by TCS"} message={message} attachments={attachments} />
          <AnnouncementSummary audience={audience} departments={departments} batches={batches} year={year} channels={channels} />
        </aside>
      </div>
    </div>
  );
};

function SectionTitle({ number, title }: { number: string; title: string }) {
  return <h2 className="text-sm font-bold text-cyan-600 sm:text-base"><span className="mr-1">{number}.</span>{title}</h2>;
}

function FieldLabel({ label, required = false }: { label: string; required?: boolean }) {
  return <span className="mb-1.5 block text-[10px] font-semibold text-slate-700 sm:text-xs">{label}{required && <span className="ml-0.5 text-rose-500">*</span>}</span>;
}

function SelectField({ label, value, options, onChange, required = false }: { label: string; value: string; options: string[]; onChange: (value: string) => void; required?: boolean }) {
  return <label className="block"><FieldLabel label={label} required={required} /><span className="relative block"><select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 sm:text-xs">{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500" /></span></label>;
}

function RichTextEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="overflow-hidden rounded-md border border-slate-200"><div className="flex h-9 items-center gap-3 border-b border-slate-200 px-3 text-slate-600"><span className="mr-1 text-[11px] font-semibold">Normal</span><ChevronDown size={12} /><span className="h-5 border-l border-slate-200" /><button type="button" aria-label="Bold"><Bold size={14} /></button><button type="button" aria-label="Italic"><Italic size={14} /></button><button type="button" aria-label="Underline"><Underline size={14} /></button><span className="h-5 border-l border-slate-200" /><button type="button" aria-label="Bulleted list"><List size={14} /></button><button type="button" aria-label="Align left"><AlignLeft size={14} /></button><button type="button" aria-label="Add link"><Link size={14} /></button><button type="button" aria-label="Add image"><Image size={14} /></button></div><textarea value={value} maxLength={2000} onChange={(event) => onChange(event.target.value)} placeholder="Type your message here..." className="h-[130px] w-full resize-none p-3 text-xs text-slate-700 outline-none placeholder:text-slate-400" /></div>;
}

function ChannelCard({ channel, selected, onToggle }: { channel: { label: Channel; description: string; tone: string }; selected: boolean; onToggle: () => void }) {
  const Icon = channel.label === "Email" ? Mail : channel.label === "WhatsApp" ? MessageCircle : channel.label === "In-App Notification" ? Bell : MessageCircle;
  return <button type="button" onClick={onToggle} className={`relative flex min-h-[116px] flex-col items-start rounded-md border p-3 text-left transition ${selected ? "border-cyan-400 bg-cyan-50/30 shadow-sm" : "border-slate-200 bg-white hover:border-cyan-200"}`}><span className={`mb-3 ${channel.tone}`}><Icon size={18} /></span><span className="text-xs font-bold text-slate-800">{channel.label}</span><span className="mt-1 text-[10px] leading-relaxed text-slate-600">{channel.description}</span>{selected && <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded bg-cyan-500 text-[10px] font-bold text-white">✓</span>}</button>;
}

function AnnouncementPreview({ title, message, attachments }: { title: string; message: string; attachments: Attachment[] }) {
  return <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><h2 className="text-sm font-bold text-slate-800 sm:text-base">Announcement Preview</h2><div className="mt-4 space-y-3 text-xs text-slate-700"><div><p className="font-bold text-slate-800">Title</p><p className="mt-2 font-medium">{title}</p></div><div><p className="font-bold text-slate-800">Message</p>{message ? <p className="mt-2 whitespace-pre-line leading-relaxed">{message}</p> : <div className="mt-2 space-y-3 leading-relaxed"><p>We are excited to announce that TCS is visiting our campus for the recruitment drive.</p><p>Eligible students are requested to apply before the last date.</p><p>Please find the attached documents for more details.</p></div>}</div></div><div className="mt-4 border-t border-slate-100 pt-4"><p className="text-xs font-semibold text-slate-700">Attachments ({attachments.length})</p><div className="mt-2 divide-y divide-slate-100 rounded-md border border-slate-200">{attachments.map((attachment) => <div key={attachment.name} className="flex items-center gap-2 px-2.5 py-2"><span className={`flex h-7 w-7 items-center justify-center rounded-md ${attachment.type === "pdf" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-500"}`}><FileText size={15} /></span><span className="min-w-0 flex-1"><span className="block truncate text-[10px] font-semibold text-slate-700">{attachment.name}</span><span className="block text-[9px] text-slate-500">{attachment.size}</span></span><button type="button" aria-label={`Download ${attachment.name}`} className="text-slate-400 hover:text-cyan-600"><Download size={15} /></button></div>)}</div></div></section>;
}

function AnnouncementSummary({ audience, departments, batches, year, channels }: { audience: string; departments: string; batches: string; year: string; channels: Channel[] }) {
  const summaryRows = [["Audience", audience === "Select audience" ? "All Students" : audience], ["Departments", departments === "Select departments" ? "CSE, ECE, EEE, IT, MECH" : departments], ["Batches", batches === "Select batches" ? "2024, 2025, 2026" : batches], ["Year / Semester", year === "Select year / semester" ? "All Years / All Semesters" : year]];
  const channelIcons: { label: Channel; Icon: typeof Mail }[] = [
    { label: "Email", Icon: Mail },
    { label: "SMS / Text Message", Icon: MessageCircle },
    { label: "WhatsApp", Icon: MessageCircle },
    { label: "In-App Notification", Icon: Bell },
  ];
  return <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><h2 className="text-sm font-bold text-slate-800 sm:text-base">Announcement Summary</h2><div className="mt-4 space-y-3 text-xs">{summaryRows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-3"><span className="font-medium text-slate-500">{label}</span><span className="max-w-[210px] text-right font-semibold text-slate-700">{value}</span></div>)}</div><div className="mt-5 flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-600">Delivery Medium</span><div className="flex items-center gap-2">{channelIcons.slice(0, 3).map(({ label, Icon }) => <span key={label} className={`flex h-9 w-9 items-center justify-center rounded-full ${channels.includes(label) ? "bg-cyan-50 text-cyan-600" : "bg-slate-100 text-slate-400"}`}><Icon size={17} /></span>)}<span className="ml-1 text-[10px] font-semibold text-slate-500">{channels.length} channels selected</span></div></div><div className="mt-5 flex gap-2 rounded-md border border-amber-100 bg-amber-50 p-3 text-[10px] leading-relaxed text-amber-800 sm:text-xs"><Info size={16} className="mt-0.5 shrink-0 text-amber-500" /><span>Please review the announcement details before sending. Once sent, it will be delivered through the selected channels.</span></div></section>;
}
