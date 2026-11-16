import { useState, type FormEvent } from "react";
import { type SkillRecord, useCreateSkillMutation } from "../../../redux/api";
import { CatalogModal } from "../../formFields";
import { getApiErrorMessage } from "../../formHelpers";

export function AddSkillModal({ onClose, onCreated }: { onClose: () => void; onCreated: (skill: SkillRecord) => void }) {
  const [createSkill, { isLoading }] = useCreateSkillMutation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      onCreated(await createSkill({ skill: name.trim(), category: category.trim(), domain: domain.trim() }).unwrap());
      onClose();
    } catch (createError) {
      setError(getApiErrorMessage(createError, "Unable to add this skill. Please try again."));
    }
  };

  return (
    <CatalogModal
      kind="skill"
      name={name}
      category={category}
      domain={domain}
      error={error}
      isLoading={isLoading}
      onNameChange={setName}
      onCategoryChange={setCategory}
      onDomainChange={setDomain}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
