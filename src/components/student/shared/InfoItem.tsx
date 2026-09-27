export function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 text-slate-400">
        {Icon && <Icon size={15} />}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-xs font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TPO / PLACEMENT OFFICER - STUDENT DETAILS
   Read-only version of the student profile.
========================================================= */
