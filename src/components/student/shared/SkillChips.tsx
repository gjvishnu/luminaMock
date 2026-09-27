export function SkillChips({ skills }: { skills: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-medium text-slate-600"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
