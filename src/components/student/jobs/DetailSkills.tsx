import { DetailCard } from "../shared/DetailCard";

export function DetailSkills() {
  const skills = [
    "Data Structures",
    "Algorithms",
    "Problem Solving",
    "Java / Python",
    "SQL",
    "OOPs Concepts",
    "DBMS",
    "Computer Networks",
    "Operating Systems",
    "Git",
    "Communication",
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Skills They Are Looking For
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-600 sm:text-[11px]"
          >
            {skill}
          </span>
        ))}
      </div>
    </DetailCard>
  );
}
