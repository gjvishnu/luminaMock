import type { ProfileData } from "../shared/types";
import { getPlacementReadiness } from "../shared/helpers";
import { ProfileChecklist } from "./ProfileChecklist";
import { ProfileProgressRing } from "./ProfileProgressRing";
import { BriefcaseBusiness } from "lucide-react";

function getReadinessMessage(score: number) {
  if (score >= 80) return { text: "Good — you are doing great!", tone: "text-emerald-600" };
  if (score >= 50) return { text: "Getting there — finish the remaining items to be placement ready.", tone: "text-amber-600" };
  return { text: "Complete the items below to improve your placement readiness.", tone: "text-amber-600" };
}

export function PlacementReadinessCard({ profile, emptyMessage }: { profile?: ProfileData; emptyMessage?: string }) {
  const readiness = profile && !emptyMessage ? getPlacementReadiness(profile) : null;
  const score = readiness?.score ?? 0;
  const checklist =
    readiness?.checklistItems ??
    ["CGPA", "Resume", "Skills", "Projects", "Internships"].map((label) => ({ label, status: "warning" as const }));
  const message = emptyMessage ? { text: emptyMessage, tone: "text-slate-500" } : getReadinessMessage(score);

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Placement Readiness</h2>
          <p className="mt-1 text-[10px] text-slate-500">See how prepared you are for placement drives.</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><BriefcaseBusiness size={16} /></span>
      </div>
      <div className="mt-5 flex items-center gap-4 sm:gap-5">
        <ProfileProgressRing value={score} label="Placement Readiness" color="#45c484" />
        <p className={`min-w-0 text-[10px] font-semibold leading-4 ${message.tone}`}>{message.text}</p>
      </div>
      <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">Readiness checklist</h3>
          <span className="text-[10px] font-semibold text-emerald-600">{score} / 100</span>
        </div>
        <ProfileChecklist items={checklist} />
      </div>
    </section>
  );
}
