import type { JobListing } from "../shared/types";
import { CompanyLogo } from "../shared/CompanyLogo";
import { SkillChips } from "../shared/SkillChips";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";

export function JobMobileCard({
  job,
  onOpen,
}: {
  job: JobListing;
  onOpen: () => void;
}) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone =
    job.match >= 78
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  return (
    <section
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      tabIndex={0}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 focus:border-cyan-400 focus:outline-none"
    >
      <div className="flex items-start gap-3">
        <CompanyLogo job={job} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-slate-500">
            {job.companyName}
          </p>
          <h2 className="mt-1 text-sm font-bold text-slate-800">{job.role}</h2>
          <SkillChips skills={job.skills} />
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold leading-none ${matchTone}`}>
            {job.match}%
          </p>
          <span
            className={`mt-2 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${badgeTone}`}
          >
            {job.matchLabel}
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {job.location}
        </span>
        <span className="font-semibold text-slate-800">{job.ctc}</span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} />
          {job.applyBy}
        </span>
        <span className="font-semibold text-rose-500">
          {job.daysLeft} days left
        </span>
      </div>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-cyan-500 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
      >
        View Job <ChevronRight size={15} />
      </button>
    </section>
  );
}
