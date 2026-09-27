import { DetailCard } from "../shared/DetailCard";
import { BriefcaseBusiness, Building2, Clock3, FileText, Megaphone, UserRound } from "lucide-react";

export function SelectionProcess() {
  const stages = [
    {
      title: "Online Test",
      description: "Aptitude, Coding & Technical",
      icon: FileText,
    },
    {
      title: "Technical Interview",
      description: "Core CS & Problem Solving",
      icon: BriefcaseBusiness,
    },
    {
      title: "HR Interview",
      description: "Communication & Behavioral",
      icon: UserRound,
    },
    {
      title: "Group Discussion",
      description: "Topics on Current Trends",
      icon: Megaphone,
    },
    {
      title: "Final Interview",
      description: "Managerial Round",
      icon: Building2,
    },
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Selection Process
      </h2>
      <div className="relative mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-2">
        <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-cyan-100 sm:block" />
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.title}
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
              <p className="mt-1 max-w-[110px] text-[10px] leading-4 text-slate-500">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[10px] leading-4 text-cyan-700 sm:text-xs">
        <Clock3 size={15} className="mt-0.5 shrink-0" />
        The selection process may vary slightly depending on the role and
        location.
      </div>
    </DetailCard>
  );
}
