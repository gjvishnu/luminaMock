import { useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { toast } from "material-react-toastify";
import { type SkillRecord, useReplaceStudentSkillsMutation } from "../../../redux/api";
import { SkillsPicker } from "../../formFields";
import { getApiErrorMessage, getCatalogRecordId } from "../../formHelpers";
import { DetailCard } from "../shared/DetailCard";
import { AddSkillModal } from "./AddSkillModal";
import { SectionSaveFooter } from "./SectionSaveFooter";

export function SkillsEditor({
  initialSkills,
  studentId,
  options,
  isLoadingOptions,
  onSkillCreated,
}: {
  initialSkills: SkillRecord[];
  studentId: string | null;
  options: SkillRecord[];
  isLoadingOptions: boolean;
  onSkillCreated: (skill: SkillRecord) => void;
}) {
  const [replaceSkills, { isLoading: isSaving }] = useReplaceStudentSkillsMutation();
  const [skillIds, setSkillIds] = useState(() => initialSkills.map(getCatalogRecordId));
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const savedIdsRef = useRef(skillIds);

  const getLabel = (id: string) => options.find((option) => getCatalogRecordId(option) === id)?.skill ?? id;

  const handleSave = async () => {
    if (!studentId) return;

    try {
      await replaceSkills({ studentId, skillIds }).unwrap();
      savedIdsRef.current = skillIds;
      toast.success("Skills saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save your skills. Please try again."));
    }
  };

  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">Skills</h2>
            <p className="mt-1 text-[10px] text-slate-500">Add and manage your technical and soft skills.</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-slate-500">{skillIds.length} skills added</span>
      </div>

      <div className="mt-4">
        <SkillsPicker
          label="Skills"
          value={skillIds}
          onChange={setSkillIds}
          options={options}
          isLoading={isLoadingOptions}
          onAddOption={() => setIsAddingSkill(true)}
          addLabel="Add skill"
        />
      </div>

      {skillIds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skillIds.map((id) => (
            <span key={id} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
              {getLabel(id)}
              <button type="button" aria-label={`Remove ${getLabel(id)}`} onClick={() => setSkillIds((current) => current.filter((item) => item !== id))} className="text-violet-400 hover:text-violet-700">
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}

      <SectionSaveFooter label="Save Skills" isSaving={isSaving} isLocked={!studentId} onSave={handleSave} />

      {isAddingSkill && (
        <AddSkillModal
          onClose={() => setIsAddingSkill(false)}
          onCreated={(skill) => {
            onSkillCreated(skill);
            setSkillIds((current) => [...current, getCatalogRecordId(skill)]);
            toast.success("Skill added and selected.");
          }}
        />
      )}
    </DetailCard>
  );
}
