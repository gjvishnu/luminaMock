import { useRef, useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { toast } from "material-react-toastify";
import {
  type ProjectRecord,
  type ProjectRequest,
  type SkillRecord,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../../redux/api";
import { FieldError, InputField, SkillsPicker } from "../../formFields";
import { getApiErrorMessage, getCatalogRecordId } from "../../formHelpers";
import { DetailCard } from "../shared/DetailCard";
import { AddSkillModal } from "./AddSkillModal";
import { SectionSaveFooter } from "./SectionSaveFooter";
import { saveRows } from "./saveRows";

type Row = {
  key: string;
  id?: string;
  title: string;
  projectType: string;
  description: string;
  technologies: string[];
};

const toRow = (project: ProjectRecord): Row => ({
  key: project.id,
  id: project.id,
  title: project.title,
  projectType: project.projectType,
  description: project.description,
  technologies: project.technologies.map(getCatalogRecordId),
});

const toBody = (row: Row): ProjectRequest => ({
  title: row.title.trim(),
  projectType: row.projectType.trim(),
  description: row.description.trim(),
  technologies: row.technologies,
});

function validate(row: Row) {
  const errors: Record<string, string> = {};
  if (!row.title.trim()) errors.title = "Project title is required.";
  if (!row.projectType.trim()) errors.projectType = "Project type is required.";
  if (!row.description.trim()) errors.description = "Description is required.";
  return errors;
}

export function ProjectsEditor({
  initialProjects,
  studentId,
  skillOptions,
  isLoadingSkills,
  onSkillCreated,
}: {
  initialProjects: ProjectRecord[];
  studentId: string | null;
  skillOptions: SkillRecord[];
  isLoadingSkills: boolean;
  onSkillCreated: (skill: SkillRecord) => void;
}) {
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [rows, setRows] = useState(() => initialProjects.map(toRow));
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [skillTargetKey, setSkillTargetKey] = useState<string | null>(null);
  const savedBodiesRef = useRef(new Map(rows.map((row) => [row.key, toBody(row)])));

  const updateRow = (key: string, patch: Partial<Row>) => {
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));
  };

  const handleAdd = () => {
    const key = `new-${Date.now()}-${Math.random()}`;
    setRows((current) => [{ key, title: "", projectType: "", description: "", technologies: [] }, ...current]);
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
      const changes = await saveRows({
        rows,
        removedIds,
        savedBodies: savedBodiesRef.current,
        toBody,
        create: (body) => createProject({ studentId, body }).unwrap(),
        update: (id, body) => updateProject({ studentId, id, body }).unwrap(),
        remove: (id) => deleteProject({ studentId, id }).unwrap(),
        onCreated: (key, id) => updateRow(key, { id }),
        onRemoved: (id) => setRemovedIds((current) => current.filter((item) => item !== id)),
      });
      if (changes > 0) toast.success("Projects saved.");
      else toast.info("No changes to save.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save your projects. Please try again."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <FileText size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Projects</h2>
            <p className="mt-1 text-[10px] text-slate-500">Work that demonstrates your technical experience.</p>
          </div>
        </div>
        <button type="button" onClick={handleAdd} className="inline-flex shrink-0 items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50">
          <Plus size={12} /> Add Project
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {rows.map((row) => {
          const rowErrors = errors[row.key] ?? {};
          return (
            <div key={row.key} data-testid="project-row" className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex justify-end">
                <button type="button" aria-label="Delete project" onClick={() => handleDelete(row)} className="text-rose-500 hover:text-rose-700">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField label="Project Title" required placeholder="Project title" maxLength={150} value={row.title} onChange={(title) => updateRow(row.key, { title })} error={rowErrors.title} />
                <InputField label="Project Type" required placeholder="Academic project" maxLength={100} value={row.projectType} onChange={(projectType) => updateRow(row.key, { projectType })} error={rowErrors.projectType} />
              </div>
              <label className="mt-3 block">
                <span className="mb-1.5 block text-xs font-bold text-slate-800">Description <span className="ml-1 font-bold text-red-500">*</span></span>
                <textarea
                  value={row.description}
                  onChange={(event) => updateRow(row.key, { description: event.target.value })}
                  placeholder="What does this project do?"
                  rows={2}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                <FieldError message={rowErrors.description} />
              </label>
              <div className="mt-3">
                <SkillsPicker
                  label="Technologies"
                  value={row.technologies}
                  onChange={(technologies) => updateRow(row.key, { technologies })}
                  options={skillOptions}
                  isLoading={isLoadingSkills}
                  onAddOption={() => setSkillTargetKey(row.key)}
                  addLabel="Add skill"
                />
              </div>
            </div>
          );
        })}
      </div>

      <SectionSaveFooter label="Save Projects" isSaving={isSaving} isLocked={!studentId} onSave={handleSave} />

      {skillTargetKey && (
        <AddSkillModal
          onClose={() => setSkillTargetKey(null)}
          onCreated={(skill) => {
            onSkillCreated(skill);
            const skillId = getCatalogRecordId(skill);
            setRows((current) => current.map((row) => (row.key === skillTargetKey ? { ...row, technologies: [...row.technologies, skillId] } : row)));
            toast.success("Skill added and selected.");
          }}
        />
      )}
    </DetailCard>
  );
}
