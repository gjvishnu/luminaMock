import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { CheckCircle2, FileText, Trash2, Upload } from "lucide-react";
import { useRef } from "react";

export function ResumeCard({
  profile,
  onProfileChange,
  isEditing,
  onNotice,
}: {
  profile: ProfileData;
  onProfileChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing?: boolean;
  onNotice: (message: string) => void;
}) {
  const resumeInputRef = useRef<HTMLInputElement | null>(null);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onProfileChange((prev) => ({
        ...prev,
        resume: {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          updated: "Just now",
        },
      }));
      onNotice(`Uploaded resume: ${file.name}`);
    }
  };

  const handleDeleteResume = () => {
    onProfileChange((prev) => ({
      ...prev,
      resume: {
        name: "No resume uploaded",
        size: "0 MB",
        updated: "-",
      },
    }));
    onNotice("Resume deleted.");
  };

  if (isEditing) {
    return (
      <DetailCard>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
              <FileText size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">Resume</h2>
              <p className="mt-1 text-[10px] text-slate-500">Your latest resume shared with recruiters.</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
            Editing enabled
          </span>
        </div>
        <input
          type="file"
          ref={resumeInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
              <FileText size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-800">{profile.resume.name}</p>
              <p className="mt-1 text-[10px] text-slate-500">
                PDF - {profile.resume.size} · Updated {profile.resume.updated}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              className="inline-flex items-center gap-1 rounded-md border border-cyan-300 bg-white px-2.5 py-1 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Upload size={13} /> Replace
            </button>
            <button
              type="button"
              onClick={handleDeleteResume}
              className="rounded-md border border-rose-200 bg-white p-1.5 text-rose-500 hover:bg-rose-50"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNotice(`Opening ${profile.resume.name}.`)}
            className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            View Resume
          </button>
          <button
            type="button"
            onClick={() => resumeInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600"
          >
            <Upload size={14} /> Update Resume
          </button>
          <button
            type="button"
            onClick={() => onNotice(`Downloading ${profile.resume.name}.`)}
            className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            Download Resume
          </button>
        </div>
      </DetailCard>
    );
  }

  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <FileText size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Resume</h2>
            <p className="mt-1 text-[10px] text-slate-500">Your latest resume shared with recruiters.</p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">Ready to share</span>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
          <FileText size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">{profile.resume.name}</p>
          <p className="mt-1 text-[10px] text-slate-500">
            PDF · {profile.resume.size} · Updated {profile.resume.updated}
          </p>
        </div>
        <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onNotice(`Opening ${profile.resume.name}.`)}
          className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
        >
          View Resume
        </button>
        <button
          type="button"
          onClick={() => onNotice("Switch to edit mode to update resume.")}
          className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600"
        >
          <Upload size={14} /> Update Resume
        </button>
        <button
          type="button"
          onClick={() => onNotice(`Downloading ${profile.resume.name}.`)}
          className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
        >
          Download Resume
        </button>
      </div>
    </DetailCard>
  );
}
