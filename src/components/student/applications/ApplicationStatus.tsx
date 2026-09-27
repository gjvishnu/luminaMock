import type { ApplicationStatus as ApplicationStatusValue } from "../shared/types";

export function ApplicationStatus({ status }: { status: ApplicationStatusValue }) {
  const tone = {
    Shortlisted: "bg-emerald-50 text-emerald-600",
    "In Process": "bg-blue-50 text-blue-600",
    Rejected: "bg-rose-50 text-rose-600",
    Offer: "bg-emerald-50 text-emerald-600",
    Withdrawn: "bg-slate-100 text-slate-600",
  }[status];

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${tone}`}
    >
      {status}
    </span>
  );
}
