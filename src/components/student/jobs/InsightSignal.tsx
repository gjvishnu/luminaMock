export function InsightSignal({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md ${tone}`}
      >
        <Icon size={15} />
      </div>
      <p className="mt-2 text-[10px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}
