import type { ProfileData } from "../shared/types";
import { ProfileMetric } from "../shared/ProfileMetric";
import { ProfileSection } from "../shared/ProfileSection";
import { CheckCircle2, FileText, GraduationCap, Info, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

export function AcademicPerformanceCard({
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
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onProfileChange((prev) => ({
        ...prev,
        semesterScores: prev.semesterScores.map((sem, i) =>
          i === index
            ? { ...sem, file: file.name, score: sem.score === "Pending" ? "8.8" : sem.score, percentage: sem.percentage === 0 ? 88 : sem.percentage }
            : sem
        ),
      }));
      onNotice(`Uploaded markcard: ${file.name}`);
    }
  };

  const handleRemoveFile = (index: number) => {
    onProfileChange((prev) => ({
      ...prev,
      semesterScores: prev.semesterScores.map((sem, i) =>
        i === index ? { ...sem, file: "" } : sem
      ),
    }));
    onNotice(`Removed markcard for ${profile.semesterScores[index]?.label || "semester"}`);
  };

  if (isEditing) {
    return (
      <ProfileSection title="Academic Performance" icon={GraduationCap} className="h-full">
        <p className="text-[11px] text-slate-500">
          Upload your semester markcards. Your CGPA, attendance and backlog details will be automatically updated.
        </p>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-cyan-100 bg-cyan-50/70 p-3 text-xs text-cyan-800">
          <Info size={16} className="mt-0.5 shrink-0 text-cyan-500" />
          <span>Only upload official markcards (PDF, JPG or PNG). Marks, CGPA, attendance and backlog details cannot be edited manually.</span>
        </div>

        <div className="mt-4 space-y-2">
          {profile.semesterScores.map((sem, idx) => (
            <div key={sem.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 text-xs">
              <span className="font-bold text-slate-800 w-24">{sem.label}</span>
              <input
                type="file"
                ref={(el) => { fileInputRefs.current[idx] = el; }}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(idx, e)}
              />

              {sem.file ? (
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <FileText size={15} className="shrink-0 text-cyan-600" />
                  <span className="truncate text-xs font-semibold text-slate-700">{sem.file}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 size={12} /> Uploaded
                  </span>
                </div>
              ) : (
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-xs text-slate-400 italic">No markcard uploaded</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[idx]?.click()}
                  className="inline-flex items-center gap-1 rounded-md border border-cyan-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
                >
                  <Upload size={12} /> {sem.file ? "Replace" : "Upload"}
                </button>
                {sem.file && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="rounded-md border border-rose-200 bg-white p-1 text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ProfileSection>
    );
  }

  return (
    <ProfileSection title="Academic Performance" icon={GraduationCap} className="h-full">
      <div className="grid grid-cols-3 gap-2">
        <ProfileMetric label="CGPA" value={`${profile.cgpa} / 10`} tone="bg-cyan-50 text-cyan-600" />
        <ProfileMetric label="Attendance" value={profile.attendance} tone="bg-emerald-50 text-emerald-600" />
        <ProfileMetric label="Backlogs" value={profile.backlogs} tone="bg-amber-50 text-amber-600" />
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold text-slate-800">Semester performance</p>
            <p className="mt-1 text-[10px] text-slate-500">Academic performance and backlog history by semester</p>
          </div>
          <span className="text-[10px] font-medium text-emerald-600">Improving trend</span>
        </div>
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
          {profile.semesterScores.map((semester) => (
            <div key={semester.label} className="rounded-lg bg-slate-50/80 p-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-700">{semester.label}</span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)_30px] sm:items-center">
                <span className="text-[9px] font-medium text-slate-500">Academic</span>
                <div className="h-1.5 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${semester.percentage}%` }} />
                </div>
                <span className="text-right text-[10px] font-bold text-slate-700">{semester.score}</span>
              </div>
              <div className="mt-1.5 grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)_30px] sm:items-center">
                <span className="text-[9px] font-medium text-slate-500">Backlogs</span>
                <div className="flex min-w-0 items-center">
                  <span className={`text-[10px] font-semibold ${semester.backlogs === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                    {semester.backlogs === 0 ? "No backlogs" : `${semester.backlogs} backlog${semester.backlogs === 1 ? "" : "s"}`}
                  </span>
                </div>
                <span className="text-right text-[10px] font-bold text-amber-600">{semester.backlogs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileSection>
  );
}
