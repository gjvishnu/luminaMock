import type { ApplicationRow } from "../shared/types";
import { applicationDetails } from "../shared/data";
import { ApplicationLogo } from "./ApplicationLogo";
import { ApplicationStatus } from "./ApplicationStatus";
import { WorkflowStepIndicator } from "./WorkflowStepIndicator";
import { ArrowLeft, BriefcaseBusiness, Download, FileText, MapPin } from "lucide-react";
import { useState } from "react";

export function ApplicationDetailsView({
  application,
  onBack,
  backLabel = "Back to Applications",
  readOnly = false,
}: {
  application: ApplicationRow;
  onBack: () => void;
  backLabel?: string;
  readOnly?: boolean;
}) {
  const detail = applicationDetails[application.id] ?? applicationDetails.tcs;
  const [notes, setNotes] = useState<{ text: string; date: string }[]>([]);
  const [noteDraft, setNoteDraft] = useState("");

  const saveNote = () => {
    if (!noteDraft.trim()) {
      return;
    }

    setNotes((current) => [
      { text: noteDraft.trim(), date: "Just now" },
      ...current,
    ]);
    setNoteDraft("");
  };

  return (
    <div className="space-y-3 pb-5 text-slate-800">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-500"
        >
          <ArrowLeft size={15} />
          {backLabel}
        </button>
        {!readOnly && (
          <button
            type="button"
            className="h-9 shrink-0 rounded-md border border-rose-200 px-4 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
          >
            Withdraw Application
          </button>
        )}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <ApplicationLogo application={application} />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                {application.companyName}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{application.role}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {application.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness size={14} className="text-slate-400" />
                  Full Time
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" />
                  {application.ctc}
                </span>
              </div>
            </div>
          </div>
          <ApplicationStatus status={application.status} />
        </div>
        <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          Applied on {application.appliedOn} · Last{" "}
          {application.updated.toLowerCase()}
        </p>
      </section>

      <section className="rounded-lg border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-xs text-cyan-800 sm:px-5">
        <p className="font-semibold">Next step: {application.nextStep}</p>
        <p className="mt-1 text-cyan-700">{application.nextDate}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
          Job Description
        </h2>
        <p className="mt-3 text-xs leading-5 text-slate-600">
          {detail.jobDescription}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold text-cyan-600">
              Responsibilities
            </h3>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
              {detail.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-cyan-600">
              Eligibility &amp; Skills
            </h3>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
              {detail.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
          Hiring Workflow
        </h2>
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="flex min-w-[560px] items-start justify-between gap-1 px-1">
            {detail.workflow.map((step, index) => (
              <WorkflowStepIndicator
                key={step.label}
                step={step}
                isLast={index === detail.workflow.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            Documents
          </h2>
          <div className="mt-3 divide-y divide-slate-100">
            {detail.documents.map((document) => (
              <div
                key={document.name}
                className="flex items-center gap-2.5 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
                  <FileText size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-slate-700">
                    {document.name}
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    {document.size}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={`Download ${document.name}`}
                  title={`Download ${document.name}`}
                  className="text-slate-400 transition hover:text-cyan-600"
                >
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {!readOnly && (
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Notes
            </h2>
            <div className="mt-3 space-y-2">
              {notes.length === 0 && (
                <p className="text-[11px] text-slate-400">
                  No notes added yet.
                </p>
              )}
              {notes.map((note, index) => (
                <div
                  key={`${note.date}-${index}`}
                  className="rounded-md bg-slate-50/80 px-3 py-2 text-[11px] text-slate-600"
                >
                  <p>{note.text}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{note.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Add a personal note..."
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
              />
              <button
                type="button"
                onClick={saveNote}
                className="h-9 shrink-0 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                Save
              </button>
            </div>
          </section>
        )}

        {readOnly && (
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Placement Cell Notes
            </h2>
            <p className="mt-3 text-[11px] text-slate-400">
              No notes recorded for this application yet.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
