import type { ProfileChecklistItem } from "../shared/types";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ProfileChecklist({ items }: { items: ProfileChecklistItem[] }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-2 text-[10px] sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.status === "done" ? CheckCircle2 : AlertTriangle;

        return <div key={item.label} className="flex min-w-0 items-center gap-2"><Icon size={14} className={item.status === "done" ? "shrink-0 text-emerald-500" : "shrink-0 text-amber-500"} /><span className="truncate text-slate-700">{item.label}</span></div>;
      })}
    </div>
  );
}
