import { Check, ChevronDown, LoaderCircle, MapPin, Plus, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { DepartmentRecord, SkillRecord } from "../redux/api";
import { getCatalogRecordId, getCatalogRecordLabel } from "./formHelpers";

export type CatalogModalKind = "skill" | "department" | "degree";

export type DropdownOption = {
  value: string;
  label: string;
  hint?: string | null;
};

const catalogLabels: Record<CatalogModalKind, string> = {
  skill: "Skill",
  department: "Department",
  degree: "Degree",
};
const DEGREE_NAME_MAX_LENGTH = 150;

export function CatalogModal({
  kind,
  name,
  category,
  domain,
  error,
  isLoading,
  onNameChange,
  onCategoryChange,
  onDomainChange,
  onClose,
  onSubmit,
}: {
  kind: CatalogModalKind;
  name: string;
  category: string;
  domain: string;
  error: string | null;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isSkill = kind === "skill";
  const kindLabel = catalogLabels[kind];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Add {kindLabel}</h2>
            <p className="mt-1 text-xs text-slate-500">Create a new catalog item for campus drive eligibility.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close catalog dialog" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {error && <p role="alert" className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-xs font-medium text-rose-600">{error}</p>}
          <InputField label={isSkill ? "Skill" : `${kindLabel} Name`} required uppercase maxLength={kind === "degree" ? DEGREE_NAME_MAX_LENGTH : undefined} placeholder={`Enter ${kindLabel.toLowerCase()} name`} value={name} onChange={onNameChange} />
          {isSkill && <InputField label="Category" required uppercase placeholder="Enter skill category" value={category} onChange={onCategoryChange} />}
          {isSkill && <InputField label="Domain" required uppercase placeholder="Enter skill domain" value={domain} onChange={onDomainChange} />}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading && <LoaderCircle size={14} className="animate-spin" />}
              {isLoading ? "Adding..." : `Add ${kindLabel}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-bold text-slate-800">
      {label}
      {required && <span className="ml-1 font-bold text-red-500">*</span>}
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] font-medium leading-4 text-red-500">{message}</p>;
}

export function InputField({
  label, placeholder, required = false, uppercase = false, maxLength, type = "text", disabled = false, value, onChange, error,
}: {
  label: string; placeholder: string; required?: boolean; uppercase?: boolean; maxLength?: number;
  type?: string; disabled?: boolean;
  value?: string; onChange?: (value: string) => void;
  error?: string;
}) {
  const handleChange = (input: HTMLInputElement) => {
    if (uppercase) {
      // Writing the value back here keeps the caret in place when editing mid-text.
      const caret = input.selectionStart;
      input.value = input.value.toUpperCase();
      input.setSelectionRange(caret, caret);
    }
    onChange?.(input.value);
  };

  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => handleChange(e.target)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 disabled:bg-slate-100 disabled:text-slate-500"
      />
      <FieldError message={error} />
    </label>
  );
}

export function SearchableDropdown({
  label,
  noun,
  placeholder,
  addLabel,
  options,
  value,
  selectedLabel,
  isLoading,
  onSelect,
  onAdd,
  error,
}: {
  label: string;
  noun: string;
  placeholder: string;
  addLabel?: string;
  options: DropdownOption[];
  value: string;
  // Shown when the saved value is missing from the options, such as an old or inactive record.
  selectedLabel: string;
  isLoading: boolean;
  onSelect: (value: string) => void;
  onAdd?: () => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter((option) => {
    const query = searchQuery.trim().toLowerCase();
    return !query || [option.label, option.hint ?? ""].some((field) => field.toLowerCase().includes(query));
  });

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const openDropdown = () => {
    setSearchQuery("");
    setIsOpen((open) => !open);
  };

  const handleAdd = () => {
    setIsOpen(false);
    setSearchQuery("");
    onAdd?.();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <FieldLabel label={label} required />
      <button
        type="button"
        onClick={openDropdown}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-xs outline-none transition ${isOpen ? "border-cyan-500 ring-2 ring-cyan-100" : "border-slate-200 hover:border-slate-300"}`}
      >
        <span className={`truncate ${value ? "font-medium text-slate-700" : "text-slate-400"}`}>
          {selectedOption?.label ?? (value ? selectedLabel : isLoading ? `Loading ${noun}...` : placeholder)}
        </span>
        <ChevronDown size={14} className={`ml-2 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-cyan-500" : ""}`} />
      </button>
      <FieldError message={error} />

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={`Search ${noun}...`}
                className="h-8 w-full rounded-md border border-slate-200 pl-8 pr-2 text-xs text-slate-700 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100"
              />
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto p-1.5">
            {isLoading ? (
              <p className="px-2.5 py-3 text-xs text-slate-400">Loading {noun}...</p>
            ) : filteredOptions.length === 0 ? (
              <p className="px-2.5 py-3 text-xs text-slate-400">No {noun} found.</p>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value || option.label}
                  type="button"
                  onClick={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left transition ${option.value === value ? "bg-cyan-50 text-cyan-700" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold">{option.label}</span>
                    {option.hint && <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400"><MapPin size={10} />{option.hint}</span>}
                  </span>
                  {option.value === value && <Check size={14} className="shrink-0 text-cyan-500" />}
                </button>
              ))
            )}
          </div>

          {onAdd && (
            <button type="button" onClick={handleAdd} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50">
              <Plus size={14} /> {addLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function SkillsPicker({
  label,
  value,
  onChange,
  options,
  isLoading,
  onAddOption,
  addLabel,
  required = false,
  error,
}: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
  options: (SkillRecord | DepartmentRecord)[];
  isLoading: boolean;
  onAddOption?: () => void;
  addLabel?: string;
  required?: boolean;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredOptions = options.filter((option) => {
    const optionId = getCatalogRecordId(option);
    return optionId && getCatalogRecordLabel(option).toLowerCase().includes(searchQuery.trim().toLowerCase());
  });
  const selectedLabels = value.map((selectedId) => {
    const option = options.find((item) => getCatalogRecordId(item) === selectedId);
    return option ? getCatalogRecordLabel(option) : selectedId;
  });
  const toggle = (option: SkillRecord | DepartmentRecord) => {
    const optionId = getCatalogRecordId(option);
    onChange(value.includes(optionId) ? value.filter((item) => item !== optionId) : [...value, optionId]);
  };
  const handleAddOption = () => {
    setIsOpen(false);
    setSearchQuery("");
    onAddOption?.();
  };

  return (
    <div ref={ref}>
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            setIsOpen((p) => !p);
          }}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-cyan-500"
        >
          {value.length === 0
            ? <span className="text-slate-400">{isLoading ? "Loading..." : `Select ${label.toLowerCase()}`}</span>
            : <span className="truncate font-medium text-slate-700">{selectedLabels.join(", ")}</span>}
          <ChevronDown size={14} className="pointer-events-none ml-1 shrink-0 text-slate-500" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 p-2">
              <div className="relative">
                <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="h-8 w-full rounded-md border border-slate-200 pl-8 pr-2 text-xs text-slate-700 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100"
                />
              </div>
            </div>
            <div className="max-h-52 overflow-y-auto p-1.5">
            {isLoading ? <p className="px-2.5 py-3 text-xs text-slate-400">Loading...</p> : filteredOptions.length === 0 ? <p className="px-2.5 py-3 text-xs text-slate-400">No options found.</p> : filteredOptions.map((option) => {
              const name = getCatalogRecordLabel(option);
              const optionId = getCatalogRecordId(option);
              const sel = value.includes(optionId);
              return (
                <button key={optionId} type="button" onClick={() => toggle(option)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-cyan-50"
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-300"}`}>
                    {sel && <Check size={11} />}
                  </span>
                  {name}
                </button>
              );
            })}
            </div>
            <button type="button" onClick={handleAddOption} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50">
              <Plus size={14} /> {addLabel}
            </button>
          </div>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}
