export function DetailMeta({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
      <Icon size={14} className="text-slate-500" />
      {children}
    </span>
  );
}
