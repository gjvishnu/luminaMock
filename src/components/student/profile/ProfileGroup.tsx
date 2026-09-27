export function ProfileGroup({
  title,
  description,
  icon: Icon,
  badge,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-sm sm:p-4">
      <div className="flex items-start justify-between gap-3 px-1 sm:px-2">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-600 shadow-sm">
            <Icon size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">{title}</h2>
            <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">{description}</p>
          </div>
        </div>
        {badge && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
