import { LoaderCircle } from "lucide-react";

export function SectionSaveFooter({
  label,
  isSaving,
  isLocked = false,
  onSave,
  onCancel,
}: {
  label: string;
  isSaving: boolean;
  isLocked?: boolean;
  onSave: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-3">
      {isLocked && <p className="mr-auto text-[11px] font-medium text-amber-700">Save your Basic Details first to enable this section.</p>}
      {onCancel && (
        <button type="button" onClick={onCancel} disabled={isSaving} className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 disabled:opacity-60">
          Cancel
        </button>
      )}
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving || isLocked}
        className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving && <LoaderCircle size={14} className="animate-spin" />}
        {isSaving ? "Saving..." : label}
      </button>
    </div>
  );
}
