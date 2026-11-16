import { BriefcaseBusiness } from "lucide-react";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = BriefcaseBusiness,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-4 py-12 text-center shadow-sm">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
        <Icon size={22} />
      </span>
      <h2 className="mt-3 text-sm font-bold text-slate-800">{title}</h2>
      <p className="mt-1 max-w-md text-xs text-slate-500">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
