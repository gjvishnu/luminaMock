import type { WorkflowStep } from "../shared/types";
import { workflowStepStyles } from "../shared/data";
import { AlertTriangle, ArrowRight, CheckCircle2, CircleMinus, Clock3 } from "lucide-react";

export function WorkflowStepIndicator({
  step,
  isLast,
}: {
  step: WorkflowStep;
  isLast: boolean;
}) {
  const style = workflowStepStyles[step.status];
  const Icon =
    step.status === "done"
      ? CheckCircle2
      : step.status === "rejected"
        ? AlertTriangle
        : step.status === "withdrawn"
          ? CircleMinus
          : Clock3;

  return (
    <div className="flex min-w-0 flex-1 items-start">
      <div className="flex min-w-[92px] flex-1 flex-col items-center text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ${style.ring}`}
        >
          <Icon size={18} />
        </div>
        <p className={`mt-2 text-[11px] font-bold ${style.label}`}>
          {step.label}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-500">
          {step.date}
        </p>
      </div>
      {!isLast && (
        <ArrowRight size={18} className="mt-4 shrink-0 text-slate-300" />
      )}
    </div>
  );
}
