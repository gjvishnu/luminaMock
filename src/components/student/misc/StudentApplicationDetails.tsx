import { ApplicationsBoard } from "../applications/ApplicationsBoard";
import { PageHeader } from "../shared/PageHeader";
import { studentProfileData } from "../shared/data";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StudentApplicationDetails() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/students")}
            title="Back to students list"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 transition hover:text-cyan-700"
          >
            <ArrowLeft size={15} />
            Back to Students
          </button>

          <PageHeader
            title="Application Details"
            description="View placement applications submitted by this student."
          />
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-600">
            {studentProfileData.initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {studentProfileData.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {studentProfileData.program}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">
                Reg. No. {studentProfileData.registrationNumber}
              </span>
              <span className="rounded-md bg-cyan-50 px-2.5 py-1.5 text-[10px] font-semibold text-cyan-600">
                {studentProfileData.department}
              </span>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600">
                {studentProfileData.batch} Batch
              </span>
            </div>
          </div>
        </div>
      </section>

      <ApplicationsBoard />
    </div>
  );
}
