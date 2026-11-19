import type { SelectionProcess as SelectionProcessValue } from "../../../redux/api";
import { DetailCard } from "../shared/DetailCard";
import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  CircleDot,
  ClipboardCheck,
  Clock3,
  Code,
  FileText,
  Lightbulb,
  UserRound,
  Users,
} from "lucide-react";

const STAGE_DETAILS: Record<SelectionProcessValue, { title: string; description: string; icon: React.ElementType }> = {
  ONLINE_ASSESSMENT: { title: "Online Assessment", description: "Aptitude, coding & technical", icon: FileText },
  APTITUDE_TEST: { title: "Aptitude Test", description: "Quantitative, logical & verbal", icon: Calculator },
  TECHNICAL_TEST: { title: "Technical Test", description: "Core subjects & role skills", icon: ClipboardCheck },
  GROUP_DISCUSSION: { title: "Group Discussion", description: "Communication & teamwork", icon: Users },
  TECHNICAL_INTERVIEW: { title: "Technical Interview", description: "Core CS & problem solving", icon: BriefcaseBusiness },
  HR_INTERVIEW: { title: "HR Interview", description: "Communication & behavioural", icon: UserRound },
  MANAGERIAL_INTERVIEW: { title: "Managerial Interview", description: "Leadership & situational", icon: Building2 },
  CASE_STUDY: { title: "Case Study", description: "Analyse & present a solution", icon: Lightbulb },
  CODING_ROUND: { title: "Coding Round", description: "Solve programming problems", icon: Code },
  OTHER: { title: "Other Round", description: "Details shared by the placement cell", icon: CircleDot },
};

// Static class names so Tailwind keeps them; more than 5 stages wrap onto a new row.
const GRID_COLUMNS = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4", "sm:grid-cols-5"];

function getStageDetails(process: string) {
  return (
    STAGE_DETAILS[process as SelectionProcessValue] ?? {
      // Unknown values from a newer backend: FOO_BAR -> Foo Bar
      title: process.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      description: "",
      icon: CircleDot,
    }
  );
}

export function SelectionProcess({ processes }: { processes: string[] }) {
  const columns = Math.min(processes.length, 5);

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Selection Process
      </h2>
      {processes.length === 0 ? (
        <p className="mt-4 text-xs text-slate-500">
          The placement cell has not shared the selection process for this role yet.
        </p>
      ) : (
        <div className={`relative mt-6 grid grid-cols-2 gap-6 sm:gap-2 ${GRID_COLUMNS[columns]}`}>
          {/* Connector line only makes sense when every stage is on one row */}
          {processes.length > 1 && processes.length <= 5 && (
            <div
              className="absolute top-6 hidden h-px bg-cyan-100 sm:block"
              style={{ left: `${50 / columns}%`, right: `${50 / columns}%` }}
            />
          )}
          {processes.map((process, index) => {
            const stage = getStageDetails(process);
            const Icon = stage.icon;

            return (
              <div
                key={`${process}-${index}`}
                className="relative z-10 flex min-w-0 flex-col items-center text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 ring-8 ring-white">
                  <Icon size={19} />
                </span>
                <span className="mt-3 text-[11px] font-bold text-slate-700">
                  {index + 1}
                </span>
                <h3 className="mt-2 text-[11px] font-bold leading-4 text-slate-800">
                  {stage.title}
                </h3>
                {stage.description && (
                  <p className="mt-1 max-w-[120px] text-[10px] leading-4 text-slate-500">
                    {stage.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[10px] leading-4 text-cyan-700 sm:text-xs">
        <Clock3 size={15} className="mt-0.5 shrink-0" />
        The selection process may vary slightly depending on the role and
        location.
      </div>
    </DetailCard>
  );
}
