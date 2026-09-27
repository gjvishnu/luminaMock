import { CheckCircle2, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}) {
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

  return (
    <div ref={dropdownRef} className={`relative block min-w-0 ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs outline-none transition ${
          isOpen
            ? "border-cyan-400 ring-2 ring-cyan-100"
            : "border-slate-200 hover:border-cyan-300"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={15}
          className={`ml-1 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-500" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-56 overflow-y-auto rounded-xl border border-slate-100 bg-white p-1 shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  isSelected
                    ? "bg-cyan-50/80 font-bold text-cyan-700"
                    : "font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="truncate">{option}</span>
                {isSelected && <CheckCircle2 size={13} className="ml-2 shrink-0 text-cyan-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
