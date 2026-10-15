export const PageFallback = () => {
  return (
    <div
      role="status"
      aria-label="Loading page"
      aria-live="polite"
      className="w-full animate-pulse space-y-4"
    >
      <div className="h-8 w-48 rounded-lg bg-slate-200" />
      <div className="h-4 w-72 rounded bg-slate-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="h-32 rounded-xl border border-slate-100 bg-white p-4">
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        </div>
        <div className="h-32 rounded-xl border border-slate-100 bg-white p-4">
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        </div>
        <div className="hidden h-32 rounded-xl border border-slate-100 bg-white p-4 sm:block">
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        </div>
      </div>
      <div className="h-64 rounded-xl border border-slate-100 bg-white p-4">
        <div className="h-4 w-1/3 rounded bg-slate-200" />
        <div className="mt-4 space-y-3">
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-full rounded bg-slate-100" />
          <div className="h-3 w-5/6 rounded bg-slate-100" />
        </div>
      </div>
      <span className="sr-only">Loading page…</span>
    </div>
  );
};
