import type { JobRecord, JobSortBy } from "../../../redux/api";
import type { JobListing } from "../shared/types";

export const SORT_OPTIONS: { label: string; value: JobSortBy }[] = [
  { label: "Sort by: Newest", value: "newest" },
  { label: "Sort by: Match", value: "match" },
  { label: "Sort by: Deadline", value: "applyBy" },
];

// FULL_TIME -> Full Time
export function formatJobType(value: string) {
  return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

// "Tata Consultancy Services" -> "TCS", "Infosys" -> "Infosys"
export function getLogoText(companyName: string) {
  const words = companyName.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return companyName.trim().slice(0, 9);
  return words.slice(0, 3).map((word) => word[0].toUpperCase()).join("");
}

export function formatCtc(ctc: string | null) {
  if (!ctc) return "—";
  return /^\d/.test(ctc.trim()) ? `₹${ctc.trim()}` : ctc;
}

export function formatDaysLeft(daysLeft: number | null) {
  if (daysLeft === null) return "";
  if (daysLeft === 0) return "Last day";
  return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;
}

export function getMatchTones(matchLabel: string) {
  return matchLabel === "Fair"
    ? { text: "text-amber-500", badge: "bg-amber-50 text-amber-600" }
    : { text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-600" };
}

export function toJobListing(job: Omit<JobRecord, "application">): JobListing {
  return {
    id: job.id,
    company: job.company.name,
    companyName: job.company.name,
    logo: getLogoText(job.company.name),
    role: job.jobRole,
    skills: job.skills.map((skill) => skill.skill),
    location: job.jobLocation || "—",
    ctc: formatCtc(job.ctcPackage),
    applyBy: job.applyBy ? formatDate(job.applyBy) : "—",
    daysLeft: job.daysLeft,
    match: job.match.percentage,
    matchLabel: job.match.label,
  };
}
