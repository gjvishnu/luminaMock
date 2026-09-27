import type { ApplicationRow } from "../shared/types";
import { ApplicationLogo } from "./ApplicationLogo";
import { ApplicationStatus } from "./ApplicationStatus";
import { AlertTriangle, CalendarDays, CheckCircle2, CircleMinus, MapPin } from "lucide-react";

export function ApplicationMobileCard({
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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <ApplicationLogo application={application} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">
            {application.companyName}
          </p>
          <p className="mt-1 text-xs text-slate-600">{application.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {application.location}
            </span>
            <span>{application.ctc}</span>
          </div>
        </div>
        <ApplicationStatus status={application.status} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px]">
        <div>
          <p className="text-[10px] text-slate-500">Applied On</p>
          <p className="mt-1 font-semibold text-slate-700">
            {application.appliedOn}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500">Updated</p>
          <p className="mt-1 font-semibold text-slate-700">
            {application.updated.replace("Updated on ", "")}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-slate-500">Next Step / Update</p>
          <p
            className={`mt-1 flex items-center gap-1.5 font-semibold ${nextTone}`}
          >
            <NextIcon size={14} />
            {application.nextStep}
          </p>
          <p className="mt-1 text-slate-600">{application.nextDate}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onView(application.id)}
        className="mt-4 h-9 w-full rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
      >
        {application.status === "Offer" ? "View Offer" : "View Details"}
      </button>
    </section>
  );
}
