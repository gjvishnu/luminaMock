import { DetailCard } from "../shared/DetailCard";
import { ChevronRight } from "lucide-react";

export function TipsCard() {
  const tips = [
    "Complete your profile for better match",
    "Add more skills to increase visibility",
    "Practice aptitude and coding questions",
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Tips Before Applying
      </h2>
      <div className="mt-4 space-y-3">
        {tips.map((tip) => (
          <p
            key={tip}
            className="flex items-start gap-2 text-[11px] leading-4 text-slate-700"
          >
            <span className="mt-0.5 text-cyan-500">✧</span>
            {tip}
          </p>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Go to My Profile <ChevronRight size={14} />
      </button>
    </DetailCard>
  );
}
