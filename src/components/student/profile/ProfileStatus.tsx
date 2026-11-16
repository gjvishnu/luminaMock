import { LoaderCircle } from "lucide-react";

export function ProfileLoading({ label = "Loading your profile..." }: { label?: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
      <LoaderCircle size={16} className="animate-spin" />
      {label}
    </div>
  );
}

export function ProfileLoadError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="px-4 py-12 text-center">
      <p className="text-sm font-semibold text-rose-600">{message || "Unable to load your profile."}</p>
      <button type="button" onClick={onRetry} className="mt-3 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">Try again</button>
    </div>
  );
}
