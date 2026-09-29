import type { JobListing } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";

export function MatchCard({ job }: { job: JobListing }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (job.match / 100) * circumference;

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Your Match
      </h2>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#e2f6ef"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#16b979"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">
            {job.match}%
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-600">Great Match! 🎉</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-600">
            Your profile aligns very well with this job.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2.5 text-[11px] text-slate-700">
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          Your CGPA (8.72) is eligible (Min. 7.0)
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          Your branch (CSE) is eligible
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          You have 8 out of 10 required skills
        </p>
        <p className="flex items-start gap-2">
          <AlertTriangle size={15} className="shrink-0 text-rose-500" />
          You are missing 2 preferred skills
        </p>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Improve Your Match <ChevronRight size={14} />
      </button>
    </DetailCard>
  );
}
