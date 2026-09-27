import type { JobListing } from "../shared/types";
import { CompanyLogo } from "../shared/CompanyLogo";
import { SkillChips } from "../shared/SkillChips";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";

export function JobTableRow({ job, onOpen }: { job: JobListing; onOpen: () => void }) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone =
    job.match >= 78
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  return (
    <div
      role="row"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      className="grid min-w-[1050px] cursor-pointer grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs transition hover:bg-cyan-50/30 focus:bg-cyan-50/30 focus:outline-none sm:px-5"
    >
      <div role="cell" className="flex min-w-0 items-center gap-4">
        <CompanyLogo job={job} />
        <span className="min-w-0 font-semibold leading-5 text-slate-800">
          {job.companyName}
        </span>
      </div>
      <div role="cell" className="min-w-0">
        <p className="truncate font-semibold text-slate-800">{job.role}</p>
        <SkillChips skills={job.skills} />
      </div>
      <div role="cell" className="flex items-center gap-2 text-slate-700">
        <MapPin size={15} className="shrink-0 text-slate-500" />
        {job.location}
      </div>
      <div role="cell" className="font-medium text-slate-800">
        {job.ctc}
      </div>
      <div role="cell">
        <p className="flex items-center gap-2 whitespace-nowrap font-medium text-slate-700">
          <CalendarDays size={15} className="text-slate-500" />
          {job.applyBy}
        </p>
        <p className="mt-2 text-[10px] font-semibold text-rose-500">
          {job.daysLeft} days left
        </p>
      </div>
      <div role="cell">
        <p className={`text-lg font-bold leading-none ${matchTone}`}>
          {job.match}%
        </p>
        <span
          className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${badgeTone}`}
        >
          {job.matchLabel}
        </span>
      </div>
      <button
        type="button"
        aria-label={`View ${job.companyName} ${job.role}`}
        title={`View ${job.companyName} ${job.role}`}
        className="flex items-center justify-end text-cyan-500 transition hover:text-cyan-700"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
