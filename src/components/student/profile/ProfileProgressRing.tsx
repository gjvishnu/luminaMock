export function ProfileProgressRing({ value, label, color = "#06b6d4" }: { value: number; label: string; color?: string }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28" role="img" aria-label={`${label}: ${value} percent`}>
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#eef2f7" strokeWidth="8" />
        <circle cx="55" cy="55" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-slate-800">{value}%</span>
        <span className="mt-1 text-[10px] font-medium text-slate-500">complete</span>
      </div>
    </div>
  );
}
