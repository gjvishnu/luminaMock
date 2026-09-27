import type { ApplicationRow } from "../shared/types";

export function ApplicationLogo({ application }: { application: ApplicationRow }) {
  const tone =
    application.company === "TCS"
      ? "text-pink-500"
      : application.company === "Infosys"
        ? "text-blue-500"
        : application.company === "Zoho"
          ? "text-emerald-500"
          : application.company === "Wipro"
            ? "text-blue-700"
            : application.company === "Accenture"
              ? "text-slate-800"
              : "text-slate-500";

  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white text-[11px] font-bold ${tone}`}
    >
      {application.logo}
    </div>
  );
}
