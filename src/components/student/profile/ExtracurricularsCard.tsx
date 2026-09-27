import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { CalendarDays, FileText, Megaphone, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

export function ExtracurricularsCard({
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
  const extraInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddActivity = () => {
    const newAct = {
      id: Date.now().toString(),
      title: "New Activity",
      detail: "Details of responsibility and contributions.",
      period: "2026",
      certificateFile: "activity_certificate.pdf",
    };
    onProfileChange((prev) => ({ ...prev, extracurriculars: [...prev.extracurriculars, newAct] }));
    onNotice("Added activity.");
  };

  const handleDeleteActivity = (id: string) => {
    onProfileChange((prev) => ({
      ...prev,
      extracurriculars: prev.extracurriculars.filter((a) => a.id !== id),
    }));
    onNotice("Deleted activity.");
  };

  const handleUpdateActivity = (id: string, field: string, value: any) => {
    onProfileChange((prev) => ({
      ...prev,
      extracurriculars: prev.extracurriculars.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const handleCertUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdateActivity(id, "certificateFile", file.name);
      onNotice(`Uploaded certificate: ${file.name}`);
    }
  };

  if (isEditing) {
    return (
      <DetailCard className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Megaphone size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">Extra-curricular Activities</h2>
              <p className="mt-1 text-[10px] text-slate-500">Leadership, volunteering, and campus involvement.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddActivity}
            className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            <Plus size={12} /> Add Activity
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {profile.extracurriculars.map((activity, idx) => (
            <div key={activity.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <input
                    value={activity.title}
                    onChange={(e) => handleUpdateActivity(activity.id, "title", e.target.value)}
                    className="text-xs font-bold text-slate-800 outline-none border-b border-transparent focus:border-cyan-400 w-full"
                  />
                  <Pencil size={12} className="shrink-0 text-slate-400" />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative">
                    <input
                      value={activity.period}
                      onChange={(e) => handleUpdateActivity(activity.id, "period", e.target.value)}
                      className="w-24 rounded border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-500 outline-none"
                    />
                    <CalendarDays size={11} className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <Trash2 size={13} className="cursor-pointer text-rose-500 hover:text-rose-700" onClick={() => handleDeleteActivity(activity.id)} />
                </div>
              </div>
              <textarea
                value={activity.detail}
                onChange={(e) => handleUpdateActivity(activity.id, "detail", e.target.value)}
                className="mt-1.5 w-full rounded border border-slate-200 p-1.5 text-[10px] text-slate-600 outline-none"
                rows={2}
              />

              <input
                type="file"
                ref={(el) => { extraInputRefs.current[idx] = el; }}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleCertUpload(activity.id, e)}
              />
              <div className="mt-2.5">
                <p className="text-[9px] font-bold text-slate-500 mb-1">Add Certificate (Optional)</p>
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white p-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <FileText size={15} className="shrink-0 text-rose-500" />
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-slate-800">{activity.certificateFile || "No certificate uploaded"}</p>
                      <p className="text-[8px] text-slate-400">PDF / Image</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Upload size={12} className="cursor-pointer text-slate-400 hover:text-cyan-600" onClick={() => extraInputRefs.current[idx]?.click()} />
                    {activity.certificateFile && (
                      <Trash2 size={12} className="cursor-pointer text-rose-500 hover:text-rose-700" onClick={() => handleUpdateActivity(activity.id, "certificateFile", "")} />
                    )}
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
    <DetailCard className="h-full">
      <div className="flex items-start gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <Megaphone size={18} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">Extra-curricular Activities</h2>
          <p className="mt-1 text-[10px] text-slate-500">Leadership, volunteering, and campus involvement.</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {profile.extracurriculars.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <span className="mt-0.5 text-violet-500">
              <Megaphone size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">{activity.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
