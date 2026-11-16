import type { JobRecord } from "../../../redux/api";
import { DetailCard } from "../shared/DetailCard";
import { CheckCircle2 } from "lucide-react";

export function DetailSkills({ skills }: { skills: JobRecord["skills"] }) {
  const matchedCount = skills.filter((skill) => skill.matched).length;

  return (
    <DetailCard>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
          Skills They Are Looking For
        </h2>
        {skills.length > 0 && (
          <span className="text-[10px] font-semibold text-slate-500 sm:text-xs">
            You have <span className="text-emerald-600">{matchedCount}</span> of {skills.length}
          </span>
        )}
      </div>
      {skills.length === 0 ? (
        <p className="mt-4 text-xs text-slate-500">No specific skills are listed for this role.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              title={skill.matched ? "You have this skill" : "Not in your profile yet"}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-semibold sm:text-[11px] ${
                skill.matched ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
              }`}
            >
              {skill.matched && <CheckCircle2 size={12} aria-hidden="true" />}
              {skill.skill}
            </span>
          ))}
        </div>
      )}
    </DetailCard>
  );
}
