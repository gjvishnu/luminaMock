import type { ProfileData } from "../shared/types";
import { getProfileCompletion } from "../shared/helpers";
import { ProfileChecklist } from "./ProfileChecklist";
import { ProfileProgressRing } from "./ProfileProgressRing";
import { ChevronRight, UserRound } from "lucide-react";

export function ProfileCompletionCard({ profile, onComplete }: { profile: ProfileData; onComplete: () => void }) {
  const { percentage, checklistItems } = getProfileCompletion(profile);

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Profile Completion</h2>
          <p className="mt-1 text-[10px] text-slate-500">Complete your profile to improve job matches.</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600"><UserRound size={16} /></span>
      </div>
      <div className="mt-5 flex items-center gap-4 sm:gap-5">
        <ProfileProgressRing value={percentage} label="Profile Completion" />
        <p className="min-w-0 text-[10px] leading-4 text-slate-600">
          {percentage === 100
            ? "Your profile is 100% complete and ready for placement drives."
            : `Your profile is ${percentage}% complete. Update missing details to improve job matches.`}
        </p>
      </div>
      <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">Profile checklist</h3>
          <span className="text-[10px] font-semibold text-cyan-600">{percentage}% complete</span>
        </div>
        <ProfileChecklist items={checklistItems} />
      </div>
      <button type="button" onClick={onComplete} className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 self-start rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600">
        Complete Profile
        <ChevronRight size={14} />
      </button>
    </section>
  );
}
