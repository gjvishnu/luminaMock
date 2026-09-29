import type { ProfileData } from "../shared/types";
import { CustomSelect } from "../shared/CustomSelect";
import { DetailCard } from "../shared/DetailCard";
import { CalendarDays, ChevronRight, FileText, Link, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef } from "react";

export function ProjectsCard({
  profile,
  onProfileChange,
  isEditing,
  onNotice,
}: {
  profile: ProfileData;
  onProfileChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing?: boolean;
  onNotice: (msg: string) => void;
}) {
  const reportInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: "New Project Title",
      type: "Personal Project",
      dates: "2026",
      description: "Project description and features...",
      technologies: ["React", "JavaScript"],
      githubUrl: "https://github.com/arjun/new-project",
      reportFile: "",
    };
    onProfileChange((prev) => ({ ...prev, projects: [newProj, ...prev.projects] }));
    onNotice("Added new project card.");
  };

  const handleDeleteProject = (id: string) => {
    onProfileChange((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    onNotice("Project deleted.");
  };

  const handleUpdateProject = (id: string, field: string, value: any) => {
    onProfileChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleRemoveTech = (projId: string, tech: string) => {
    onProfileChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projId ? { ...p, technologies: p.technologies.filter((t) => t !== tech) } : p
      ),
    }));
  };

  const handleAddTech = (projId: string, tech: string) => {
    if (!tech) return;
    onProfileChange((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projId && !p.technologies.includes(tech) ? { ...p, technologies: [...p.technologies, tech] } : p
      ),
    }));
  };

  const handleReportUpload = (projId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpdateProject(projId, "reportFile", file.name);
      onNotice(`Uploaded report: ${file.name}`);
    }
  };

  if (isEditing) {
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
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500">{profile.projects.length} projects</span>
            <button
              type="button"
              onClick={handleAddProject}
              className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Plus size={12} /> Add Project
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {profile.projects.map((project, idx) => (
            <div key={project.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <input
                    value={project.title}
                    onChange={(e) => handleUpdateProject(project.id, "title", e.target.value)}
                    className="text-xs font-bold text-slate-800 outline-none border-b border-transparent focus:border-cyan-400 w-full"
                  />
                  <Pencil size={13} className="shrink-0 text-slate-400" />
                </div>
                <div className="flex items-center gap-2 text-[11px] shrink-0">
                  <div className="relative">
                    <input
                      value={project.dates}
                      onChange={(e) => handleUpdateProject(project.id, "dates", e.target.value)}
                      className="w-36 rounded border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-600 outline-none"
                    />
                    <CalendarDays size={13} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <input
                value={project.type}
                onChange={(e) => handleUpdateProject(project.id, "type", e.target.value)}
                className="mt-1 w-full rounded border border-slate-200 px-2.5 py-1 text-xs text-slate-600 outline-none focus:border-cyan-400"
              />
              <textarea
                value={project.description}
                onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                className="mt-2 w-full rounded border border-slate-200 p-2 text-xs text-slate-600 outline-none focus:border-cyan-400"
                rows={2}
              />

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {project.technologies.map((tech) => (
                  <span key={tech} className="inline-flex items-center gap-1 rounded-md bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
                    {tech}
                    <X size={11} className="cursor-pointer hover:text-rose-500" onClick={() => handleRemoveTech(project.id, tech)} />
                  </span>
                ))}
                <CustomSelect
                  value=""
                  onChange={(val) => handleAddTech(project.id, val)}
                  options={["React", "Node.js", "MongoDB", "Python", "Flask", "MySQL", "JavaScript", "Express", "PostgreSQL", "TypeScript", "Docker", "AWS"]}
                  placeholder="Add technology..."
                  className="w-36 text-[10px]"
                />
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_140px]">
                <div className="relative">
                  <Link size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={project.githubUrl}
                    onChange={(e) => handleUpdateProject(project.id, "githubUrl", e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="h-9 w-full rounded-lg border border-slate-200 pl-8 pr-2 text-[11px] text-slate-600 outline-none focus:border-cyan-400"
                  />
                </div>
                <input
                  type="file"
                  ref={(el) => { reportInputRefs.current[idx] = el; }}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleReportUpload(project.id, e)}
                />
                <button
                  type="button"
                  onClick={() => reportInputRefs.current[idx]?.click()}
                  className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-1.5 text-center hover:border-cyan-400"
                >
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700">
                    <Upload size={12} className="text-cyan-500" /> {project.reportFile ? project.reportFile : "Add Report / Cert"}
                  </div>
                  <span className="text-[8px] text-slate-400">PDF, JPG or PNG (Max 5MB)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </DetailCard>
    );
  }

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
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-semibold text-cyan-600 hover:underline"
              >
                View details <ChevronRight size={12} className="inline" />
              </a>
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
