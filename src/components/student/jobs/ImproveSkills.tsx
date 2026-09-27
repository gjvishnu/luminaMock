import type { JobListing } from "../shared/types";
import { defaultPlacementFeedback, placementFeedbackByCompany } from "../shared/data";
import { BrainCircuit, ChevronRight } from "lucide-react";

export function ImproveSkills({ job }: { job: JobListing }) {
  const feedback =
    placementFeedbackByCompany[job.company] ?? defaultPlacementFeedback;

  return (
    <div className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            Skills You May Want to Improve
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            AI-selected focus areas for the {job.role} role.
          </p>
        </div>
        <span className="rounded-md bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-500">
          {feedback.toughRoundShare}% found this round tough
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {feedback.improvementSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-start gap-2 rounded-md border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-700"
          >
            <span className="rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
              Focus
            </span>
            <span className="leading-4">{skill}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-start gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-600">
            <BrainCircuit size={16} />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">
              Technical round: ways to cope
            </p>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              {feedback.toughRoundShare}% of students in previous drives found
              the {feedback.focusStage.toLowerCase()} challenging. These habits
              helped them stay composed.
            </p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {feedback.copingStrategies.map((strategy, index) => (
            <div
              key={strategy}
              className="flex items-start gap-2 rounded-md bg-violet-50/60 px-3 py-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                {index + 1}
              </span>
              <p className="text-[10px] leading-4 text-slate-700">{strategy}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Explore Courses to Improve <ChevronRight size={14} />
      </button>
    </div>
  );
}
