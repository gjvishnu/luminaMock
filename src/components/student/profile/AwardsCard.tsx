import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { CalendarDays, CheckCircle2, FileText, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

export function AwardsCard({
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
  const awardInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddAward = () => {
    const newAward = {
      id: Date.now().toString(),
      title: "New Award / Recognition",
      detail: "Details of award and issuing organization.",
      year: "2026",
      certificateFile: "award_certificate.pdf",
    };
    onProfileChange((prev) => ({ ...prev, awards: [...prev.awards, newAward] }));
    onNotice("Added award.");
  };

  const handleDeleteAward = (id: string) => {
    onProfileChange((prev) => ({
      ...prev,
      awards: prev.awards.filter((a) => a.id !== id),
    }));
    onNotice("Deleted award.");
  };

  const handleUpdateAward = (id: string, field: string, value: any) => {
    onProfileChange((prev) => ({
      ...prev,
      awards: prev.awards.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const handleCertUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdateAward(id, "certificateFile", file.name);
      onNotice(`Uploaded certificate: ${file.name}`);
    }
  };

  if (isEditing) {
    return (
      <DetailCard className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">Awards &amp; Recognition</h2>
              <p className="mt-1 text-[10px] text-slate-500">Honours that strengthen your placement profile.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddAward}
            className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            <Plus size={12} /> Add Award
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {profile.awards.map((award, idx) => (
            <div key={award.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <input
                    value={award.title}
                    onChange={(e) => handleUpdateAward(award.id, "title", e.target.value)}
                    className="text-xs font-bold text-slate-800 outline-none border-b border-transparent focus:border-cyan-400 w-full"
                  />
                  <Pencil size={12} className="shrink-0 text-slate-400" />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative">
                    <input
                      value={award.year}
                      onChange={(e) => handleUpdateAward(award.id, "year", e.target.value)}
                      className="w-16 rounded border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-500 outline-none"
                    />
                    <CalendarDays size={11} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <Trash2 size={13} className="cursor-pointer text-rose-500 hover:text-rose-700" onClick={() => handleDeleteAward(award.id)} />
                </div>
              </div>
              <input
                value={award.detail}
                onChange={(e) => handleUpdateAward(award.id, "detail", e.target.value)}
                className="mt-1.5 w-full rounded border border-slate-200 p-1.5 text-[10px] text-slate-600 outline-none"
              />

              <input
                type="file"
                ref={(el) => { awardInputRefs.current[idx] = el; }}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleCertUpload(award.id, e)}
              />
              <div className="mt-2.5 flex items-center justify-between rounded border border-slate-200 bg-white p-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <FileText size={15} className="shrink-0 text-rose-500" />
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold text-slate-800">{award.certificateFile || "No certificate uploaded"}</p>
                    <p className="text-[8px] text-slate-400">PDF / Image</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Upload size={12} className="cursor-pointer text-slate-400 hover:text-cyan-600" onClick={() => awardInputRefs.current[idx]?.click()} />
                  {award.certificateFile && (
                    <Trash2 size={12} className="cursor-pointer text-rose-500 hover:text-rose-700" onClick={() => handleUpdateAward(award.id, "certificateFile", "")} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DetailCard>
    );
  }

  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Awards &amp; Recognition</h2>
            <p className="mt-1 text-[10px] text-slate-500">Honours that strengthen your placement profile.</p>
          </div>
        </div>
        <span className="rounded-md bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-600">
          {profile.awards.length} awards
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {profile.awards.map((award) => (
          <div key={award.id} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <span className="mt-0.5 text-cyan-500">
              <CheckCircle2 size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-800">{award.title}</p>
                <span className="text-[9px] font-medium text-slate-500">{award.year}</span>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">{award.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
