import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type SelectOption = string | { value: string; label: string };

export interface CustomSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: readonly SelectOption[] | SelectOption[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
}

export function CustomSelect({
  value = "",
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  buttonClassName = "",
  menuClassName = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label ?? (value || placeholder);

  return (
    <div ref={dropdownRef} className={`relative block min-w-0 ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex h-9 w-full items-center justify-between rounded-lg border bg-white px-2.5 text-xs font-medium outline-none transition ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
            : isOpen
            ? "border-cyan-500 ring-2 ring-cyan-100 text-slate-800"
            : "border-slate-200 text-slate-700 hover:border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        } ${buttonClassName}`}
      >
        <span className={`truncate text-left ${!value && !selectedOption ? "text-slate-400" : ""}`}>
          {displayLabel}
        </span>
        <ChevronDown
          size={14}
          className={`ml-1.5 shrink-0 transition-transform duration-200 ${
            disabled
              ? "text-slate-300"
              : isOpen
              ? "rotate-180 text-cyan-500"
              : "text-slate-400"
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div
          role="listbox"
          className={`absolute left-0 top-full z-50 mt-1 max-h-56 min-w-full w-max max-w-[320px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ${menuClassName}`}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition cursor-pointer ${
                  isSelected
                    ? "bg-cyan-50 font-bold text-cyan-700"
                    : "font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check size={13} className="ml-2 shrink-0 text-cyan-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
