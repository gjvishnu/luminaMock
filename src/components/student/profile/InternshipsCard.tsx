import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";

export function InternshipsCard({ profile }: { profile: ProfileData }) {
  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Internships</h2>
            <p className="mt-1 text-[10px] text-slate-500">Your practical industry experience.</p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          {profile.internships.length} completed
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {profile.internships.map((internship) => (
          <article key={internship.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800">{internship.role}</h3>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">{internship.company}</p>
              </div>
              <span className="whitespace-nowrap text-[9px] font-medium text-slate-500">{internship.duration}</span>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-600">{internship.description}</p>
            {internship.isVerified && (
              <span className="mt-3 inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
                <CheckCircle2 size={11} /> Verified experience
              </span>
            )}
          </article>
        ))}
      </div>
    </DetailCard>
  );
}
