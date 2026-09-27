import type { JobListing } from "./types";

export function CompanyLogo({
  job,
  large = false,
}: {
  job: JobListing;
  large?: boolean;
}) {
  const tone =
    job.company === "TCS"
      ? "text-pink-500"
      : job.company === "Infosys"
        ? "text-blue-500"
        : job.company === "Zoho"
          ? "text-emerald-500"
          : job.company === "Wipro"
            ? "text-blue-700"
            : job.company === "Accenture"
              ? "text-slate-800"
              : job.company === "Cognizant"
                ? "text-slate-500"
                : "text-blue-700";
  const size = large ? "h-28 w-28 text-3xl" : "h-16 w-16 text-[11px]";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white font-bold ${size} ${tone}`}
    >
      {job.logo}
    </div>
  );
}
