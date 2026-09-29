import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { BriefcaseBusiness, CalendarDays, CheckCircle2, FileText, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

export function InternshipsCard({
  profile,
  onProfileChange,
  isEditing,
  onNotice,
}: {
  profile: ProfileData;
  onProfileChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing?: boolean;
  onNotice: (msg: string) => void;
}) {
  const certInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddInternship = () => {
    const newIntern = {
      id: Date.now().toString(),
      role: "Software Development Intern",
      company: "InnovateTech",
      duration: "Jun 2026 – Aug 2026",
      description: "Assisted development team with UI components and backend integration.",
      certificateFile: "Internship_Certificate.pdf",
      certificateSize: "1.0 MB",
    };
    onProfileChange((prev) => ({ ...prev, internships: [newIntern, ...prev.internships] }));
    onNotice("Added new internship.");
  };

  const handleDeleteInternship = (id: string) => {
    onProfileChange((prev) => ({
      ...prev,
      internships: prev.internships.filter((i) => i.id !== id),
    }));
    onNotice("Internship deleted.");
  };

  const handleUpdateInternship = (id: string, field: string, value: any) => {
    onProfileChange((prev) => ({
      ...prev,
      internships: prev.internships.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    }));
  };

  const handleCertUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onProfileChange((prev) => ({
        ...prev,
        internships: prev.internships.map((item) =>
          item.id === id
            ? { ...item, certificateFile: file.name, certificateSize: `${(file.size / 1024 / 1024).toFixed(1)} MB` }
            : item
        ),
      }));
      onNotice(`Uploaded certificate: ${file.name}`);
    }
  };

  const handleRemoveCert = (id: string) => {
    onProfileChange((prev) => ({
      ...prev,
      internships: prev.internships.map((item) =>
        item.id === id ? { ...item, certificateFile: "", certificateSize: "" } : item
      ),
    }));
    onNotice("Removed internship certificate.");
  };

  if (isEditing) {
    return (
      <DetailCard>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <BriefcaseBusiness size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">Internships</h2>
              <p className="mt-1 text-[10px] text-slate-500">Add or edit your internship experience.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-emerald-600 font-bold">{profile.internships.length} completed</span>
            <button
              type="button"
              onClick={handleAddInternship}
              className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Plus size={12} /> Add Internship
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {profile.internships.map((internship, idx) => (
            <div key={internship.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    value={internship.role}
                    onChange={(e) => handleUpdateInternship(internship.id, "role", e.target.value)}
                    className="text-xs font-bold text-slate-800 outline-none border-b border-transparent focus:border-cyan-400 w-full"
                  />
                  <Pencil size={13} className="shrink-0 text-slate-400" />
                </div>
                <div className="flex items-center gap-2 text-[11px] shrink-0">
                  <div className="relative">
                    <input
                      value={internship.duration}
                      onChange={(e) => handleUpdateInternship(internship.id, "duration", e.target.value)}
                      className="w-36 rounded border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600 outline-none"
                    />
                    <CalendarDays size={13} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteInternship(internship.id)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <input
                value={internship.company}
                onChange={(e) => handleUpdateInternship(internship.id, "company", e.target.value)}
                className="mt-1 text-xs font-semibold text-emerald-600 outline-none border-b border-transparent focus:border-cyan-400 w-full"
              />
              <input
                value={internship.description}
                onChange={(e) => handleUpdateInternship(internship.id, "description", e.target.value)}
                className="mt-2 w-full rounded border border-slate-200 p-2 text-xs text-slate-600 outline-none focus:border-cyan-400"
              />

              <div className="mt-3">
                <p className="text-[10px] font-bold text-slate-500 mb-1">Internship Certificate</p>
                <input
                  type="file"
                  ref={(el) => { certInputRefs.current[idx] = el; }}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleCertUpload(internship.id, e)}
                />
                <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={18} className="shrink-0 text-rose-500" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {internship.certificateFile || "No certificate uploaded"}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {internship.certificateSize ? `PDF • ${internship.certificateSize}` : "Upload PDF or Image"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => certInputRefs.current[idx]?.click()}
                      className="rounded p-1 text-slate-500 hover:text-cyan-600"
                    >
                      <Upload size={14} />
                    </button>
                    {internship.certificateFile && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(internship.id)}
                        className="rounded p-1 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DetailCard>
    );
  }

  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Internships</h2>
            <p className="mt-1 text-[10px] text-slate-500">Your practical industry experience.</p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          {profile.internships.length} completed
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {profile.internships.map((internship) => (
          <article key={internship.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800">{internship.role}</h3>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">{internship.company}</p>
              </div>
              <span className="whitespace-nowrap text-[9px] font-medium text-slate-500">{internship.duration}</span>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-600">{internship.description}</p>
            <span className="mt-3 inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
              <CheckCircle2 size={11} /> Verified experience
            </span>
          </article>
        ))}
      </div>
    </DetailCard>
  );
}
