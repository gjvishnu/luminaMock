export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{description}</p>
    </div>
  );
}
