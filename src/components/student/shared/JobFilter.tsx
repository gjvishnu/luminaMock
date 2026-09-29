import { CustomSelect } from "./CustomSelect";

export function JobFilter({ options, value, onChange, className = "" }: { options: string[]; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <CustomSelect
      value={value}
      onChange={onChange}
      options={options}
      className={className}
    />
  );
}
