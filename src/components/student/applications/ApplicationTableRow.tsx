import type { ApplicationRow } from "../shared/types";
import { ApplicationLogo } from "./ApplicationLogo";
import { ApplicationStatus } from "./ApplicationStatus";
import { AlertTriangle, BriefcaseBusiness, CalendarDays, CheckCircle2, CircleMinus, FileText, MapPin } from "lucide-react";

export function ApplicationTableRow({
  application,
  onView,
}: {
  application: ApplicationRow;
  onView: (id: string) => void;
}) {
  const NextIcon =
    application.status === "Rejected"
      ? AlertTriangle
      : application.status === "Withdrawn"
        ? CircleMinus
        : application.status === "Offer"
          ? CheckCircle2
          : CalendarDays;
  const nextTone =
    application.status === "Rejected"
      ? "text-rose-500"
      : application.status === "Withdrawn"
        ? "text-slate-400"
        : application.status === "Offer"
          ? "text-emerald-500"
          : "text-blue-500";

  return (
    <div
      role="row"
      className="grid min-w-[1020px] grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs sm:px-5"
    >
      <div role="cell" className="flex min-w-0 items-center gap-4">
        <ApplicationLogo application={application} />
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-800">
            {application.companyName}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700">
            {application.role}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {application.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <BriefcaseBusiness size={12} />
              Full Time
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText size={12} />
              {application.ctc}
            </span>
          </div>
        </div>
      </div>
      <div role="cell" className="font-semibold text-slate-700">
        {application.appliedOn}
      </div>
      <div role="cell">
        <ApplicationStatus status={application.status} />
        <p className="mt-2 text-[10px] text-slate-500">{application.updated}</p>
      </div>
      <div role="cell">
        <p className={`flex items-center gap-2 font-semibold ${nextTone}`}>
          <NextIcon size={15} />
          {application.nextStep}
        </p>
        <p className="mt-1 text-[11px] text-slate-700">
          {application.nextDate}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onView(application.id)}
        className="h-8 rounded-md border border-cyan-300 px-2 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50"
      >
        {application.status === "Offer" ? "View Offer" : "View Details"}
      </button>
    </div>
  );
}
