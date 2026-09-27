import { placementReadinessChecklist } from "../shared/data";
import { ProfileChecklist } from "./ProfileChecklist";
import { ProfileProgressRing } from "./ProfileProgressRing";
import { BriefcaseBusiness } from "lucide-react";

export function PlacementReadinessCard() {
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
        <ProfileProgressRing value={82} label="Placement Readiness" color="#45c484" />
        <p className="min-w-0 text-[10px] font-semibold leading-4 text-emerald-600">Good — you are doing great!</p>
      </div>
      <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">Readiness checklist</h3>
          <span className="text-[10px] font-semibold text-emerald-600">82 / 100</span>
        </div>
        <ProfileChecklist items={placementReadinessChecklist} />
      </div>
    </section>
  );
}
