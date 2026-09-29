import type { JobListing } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { DetailMeta } from "../shared/DetailMeta";
import { BriefcaseBusiness, Building2, Clock3, FileText, UserRound } from "lucide-react";

export function AboutRole({ job }: { job: JobListing }) {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        About the Role
      </h2>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        You will be part of a fast-paced team at {job.companyName} working on
        real-world problems. You will get opportunities to work with new
        technologies and build scalable software solutions.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-5">
        <DetailMeta icon={BriefcaseBusiness}>Software Engineer</DetailMeta>
        <DetailMeta icon={Building2}>Work from Office</DetailMeta>
        <DetailMeta icon={Clock3}>Fresher</DetailMeta>
        <DetailMeta icon={FileText}>{job.ctc}</DetailMeta>
        <DetailMeta icon={UserRound}>2 Years</DetailMeta>
      </div>
    </DetailCard>
  );
}
