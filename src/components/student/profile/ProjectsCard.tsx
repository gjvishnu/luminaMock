import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { ChevronRight, FileText } from "lucide-react";

export function ProjectsCard({ profile }: { profile: ProfileData }) {
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
        <span className="rounded-md bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-600">
          {profile.projects.length} projects
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {profile.projects.map((project) => (
          <article key={project.id} className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800">{project.title}</h3>
                <p className="mt-1 text-[10px] text-slate-500">{project.type}</p>
              </div>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-semibold text-cyan-600 hover:underline"
                >
                  View details <ChevronRight size={12} className="inline" />
                </a>
              )}
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-600">{project.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span key={technology} className="rounded bg-white px-2 py-1 text-[9px] font-medium text-slate-600">
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </DetailCard>
  );
}
