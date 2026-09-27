export function ProfileChip({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
      <Icon size={12} className="text-slate-400" />
      {text}
    </span>
  );
}
