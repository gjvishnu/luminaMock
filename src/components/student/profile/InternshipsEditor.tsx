import { useRef, useState } from "react";
import { BriefcaseBusiness, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { toast } from "material-react-toastify";
import {
  type InternshipRecord,
  type InternshipRequest,
  useCreateInternshipMutation,
  useDeleteInternshipMutation,
  useUpdateInternshipMutation,
} from "../../../redux/api";
import { FieldError, InputField } from "../../formFields";
import { getApiErrorMessage } from "../../formHelpers";
import { DetailCard } from "../shared/DetailCard";
import { SectionSaveFooter } from "./SectionSaveFooter";
import { saveRows } from "./saveRows";

type Row = {
  key: string;
  id?: string;
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  isVerified: boolean;
};

const toRow = (internship: InternshipRecord): Row => ({
  key: internship.id,
  id: internship.id,
  title: internship.title,
  companyName: internship.companyName,
  startDate: internship.startDate.slice(0, 10),
  endDate: internship.endDate?.slice(0, 10) ?? "",
  description: internship.description,
  isVerified: internship.isVerified,
});

const toBody = (row: Row): InternshipRequest => ({
  title: row.title.trim(),
  companyName: row.companyName.trim(),
  startDate: row.startDate,
  endDate: row.endDate || null,
  description: row.description.trim(),
});

function validate(row: Row) {
  const errors: Record<string, string> = {};
  if (!row.title.trim()) errors.title = "Role is required.";
  if (!row.companyName.trim()) errors.companyName = "Company is required.";
  if (!row.startDate) errors.startDate = "Start date is required.";
  if (row.endDate && row.endDate < row.startDate) errors.endDate = "End date cannot be before the start date.";
  if (!row.description.trim()) errors.description = "Description is required.";
  return errors;
}

export function InternshipsEditor({ initialInternships, studentId }: { initialInternships: InternshipRecord[]; studentId: string | null }) {
  const [createInternship] = useCreateInternshipMutation();
  const [updateInternship] = useUpdateInternshipMutation();
  const [deleteInternship] = useDeleteInternshipMutation();
  const [rows, setRows] = useState(() => initialInternships.map(toRow));
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const savedBodiesRef = useRef(new Map(rows.map((row) => [row.key, toBody(row)])));

  const updateRow = (key: string, patch: Partial<Row>) => {
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  };

  const handleAdd = () => {
    const key = `new-${Date.now()}-${Math.random()}`;
    setRows((current) => [{ key, title: "", companyName: "", startDate: "", endDate: "", description: "", isVerified: false }, ...current]);
  };

  const handleDelete = (row: Row) => {
    const { id } = row;
    if (id) setRemovedIds((current) => [...current, id]);
    setRows((current) => current.filter((item) => item.key !== row.key));
  };

  const handleSave = async () => {
    if (!studentId) return;

    const nextErrors = Object.fromEntries(rows.map((row) => [row.key, validate(row)]).filter(([, rowErrors]) => Object.keys(rowErrors).length > 0));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    setIsSaving(true);
    try {
      // Only changed rows are sent: a student's edit clears an internship's verified status.
      const changes = await saveRows({
        rows,
        removedIds,
        savedBodies: savedBodiesRef.current,
        toBody,
        create: (body) => createInternship({ studentId, body }).unwrap(),
        update: (id, body) => updateInternship({ studentId, id, body }).unwrap(),
        remove: (id) => deleteInternship({ studentId, id }).unwrap(),
        onCreated: (key, id) => updateRow(key, { id }),
        onUpdated: (key) => updateRow(key, { isVerified: false }),
        onRemoved: (id) => setRemovedIds((current) => current.filter((item) => item !== id)),
      });
      if (changes > 0) toast.success("Internships saved.");
      else toast.info("No changes to save.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save your internships. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Internships</h2>
            <p className="mt-1 text-[10px] text-slate-500">Add or edit your internship experience.</p>
          </div>
        </div>
        <button type="button" onClick={handleAdd} className="inline-flex shrink-0 items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50">
          <Plus size={12} /> Add Internship
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {rows.map((row) => {
          const rowErrors = errors[row.key] ?? {};
          return (
            <div key={row.key} data-testid="internship-row" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-2">
                {row.isVerified ? (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    <CheckCircle2 size={11} /> Verified. Editing removes this until it is checked again.
                  </span>
                ) : <span />}
                <button type="button" aria-label="Delete internship" onClick={() => handleDelete(row)} className="text-rose-500 hover:text-rose-700">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField label="Role" required placeholder="Frontend Developer Intern" maxLength={150} value={row.title} onChange={(title) => updateRow(row.key, { title })} error={rowErrors.title} />
                <InputField label="Company" required placeholder="Company name" maxLength={150} value={row.companyName} onChange={(companyName) => updateRow(row.key, { companyName })} error={rowErrors.companyName} />
                <InputField label="Start Date" required type="date" placeholder="" value={row.startDate} onChange={(startDate) => updateRow(row.key, { startDate })} error={rowErrors.startDate} />
                <InputField label="End Date" type="date" placeholder="" value={row.endDate} onChange={(endDate) => updateRow(row.key, { endDate })} error={rowErrors.endDate} />
              </div>
              <label className="mt-3 block">
                <span className="mb-1.5 block text-xs font-bold text-slate-800">Description <span className="ml-1 font-bold text-red-500">*</span></span>
                <textarea
                  value={row.description}
                  onChange={(event) => updateRow(row.key, { description: event.target.value })}
                  placeholder="What did you work on?"
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <FieldError message={rowErrors.description} />
              </label>
            </div>
          );
        })}
      </div>

      <SectionSaveFooter label="Save Internships" isSaving={isSaving} isLocked={!studentId} onSave={handleSave} />
    </DetailCard>
  );
}
