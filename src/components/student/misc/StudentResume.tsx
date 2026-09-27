import { PageHeader } from "../shared/PageHeader";
import { CheckCircle2, FileText, Upload } from "lucide-react";

export function StudentResume() {
  return (
    <div className="space-y-4 pb-5">
      <PageHeader
        title="Resume"
        description="Your resume is shared with eligible placement drives."
      />
      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
            <FileText size={25} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Resume_2026.pdf
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              PDF · Last updated Aug 28, 2026
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Ready to share with recruiters
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            View Resume
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
          >
            <Upload size={14} /> Update Resume
          </button>
        </div>
      </section>
    </div>
  );
}
