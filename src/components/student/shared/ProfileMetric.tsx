export function ProfileMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-2.5">
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
      <p
        className={`mt-1 text-sm font-bold ${tone
          .split(" ")
          .filter((className) => className.startsWith("text-"))
          .join(" ")}`}
      >
        {value}
      </p>
    </div>
  );
}
