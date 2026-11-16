import { BriefcaseBusiness, Eye, GraduationCap, Info, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type SkillRecord, useGetSkillsQuery } from "../../../redux/api";
import { getCatalogRecordId, mergeCatalog } from "../../formHelpers";
import { PageHeader } from "../shared/PageHeader";
import { AwardsCard } from "./AwardsCard";
import { BasicDetailsEditor } from "./BasicDetailsEditor";
import { ExtracurricularsCard } from "./ExtracurricularsCard";
import { InternshipsEditor } from "./InternshipsEditor";
import { ProfileGroup } from "./ProfileGroup";
import { ProfileLoadError, ProfileLoading } from "./ProfileStatus";
import { ProjectsEditor } from "./ProjectsEditor";
import { ResumeCard } from "./ResumeCard";
import { SkillsEditor } from "./SkillsEditor";
import { SportsPrizesCard } from "./SportsPrizesCard";
import { useStudentProfileData } from "./useStudentProfileData";

type ProfileResult = NonNullable<ReturnType<typeof useStudentProfileData>["result"]>;

export function StudentProfileEdit() {
  const data = useStudentProfileData();

  if (data.isLoading) return <ProfileLoading />;
  if (data.errorMessage || !data.result) return <ProfileLoadError message={data.errorMessage} onRetry={data.refetch} />;

  return <ProfileEditForm data={data.result} />;
}

function ProfileEditForm({ data }: { data: ProfileResult }) {
  const navigate = useNavigate();
  const skillsQuery = useGetSkillsQuery();
  const [studentId, setStudentId] = useState(data.student?.id ?? null);
  const [draftProfile, setDraftProfile] = useState(data.profile);
  const [notice, setNotice] = useState("");
  const [createdSkills, setCreatedSkills] = useState<SkillRecord[]>([]);

  const skillOptions = useMemo(() => {
    const active = (skillsQuery.data ?? []).filter((skill) => skill.status !== "INACTIVE");
    const selected = [...data.skills, ...data.projects.flatMap((project) => project.technologies), ...createdSkills];
    return mergeCatalog(active, selected).filter((skill) => getCatalogRecordId(skill));
  }, [createdSkills, data.projects, data.skills, skillsQuery.data]);

  const handleSkillCreated = (skill: SkillRecord) => setCreatedSkills((current) => [...current, skill]);

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Placement Profile"
          description="Build a stronger profile with the skills, experience, and documents recruiters look for."
        />
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-cyan-300 bg-white px-3.5 py-2 text-xs font-semibold text-cyan-600 shadow-sm transition hover:bg-cyan-50 sm:self-auto"
        >
          <Eye size={15} /> Preview Profile
        </button>
      </div>

      {notice && (
        <p role="status" className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700">
          {notice}
        </p>
      )}

      <div className="flex items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-xs font-medium text-cyan-700 shadow-sm">
        <Info size={16} className="shrink-0 text-cyan-500" />
        Each section saves on its own. Resume and activities cannot be saved yet.
      </div>

      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Keep your personal details and academic progress current for placement eligibility."
        icon={GraduationCap}
        badge="Editing enabled"
      >
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <BasicDetailsEditor
            userUuid={data.user.userUuid}
            email={data.user.email}
            student={data.student}
            studentId={studentId}
            departments={data.departments}
            degrees={data.degrees}
            onCreated={setStudentId}
          />
          <ResumeCard profile={draftProfile} onProfileChange={setDraftProfile} isEditing onNotice={setNotice} />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Placement Profile"
        description="Build a stronger profile with the skills, experience, and documents recruiters look for."
        icon={BriefcaseBusiness}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SkillsEditor
              initialSkills={data.skills}
              studentId={studentId}
              options={skillOptions}
              isLoadingOptions={skillsQuery.isLoading}
              onSkillCreated={handleSkillCreated}
            />
            <InternshipsEditor initialInternships={data.internships} studentId={studentId} />
          </div>
          <ProjectsEditor
            initialProjects={data.projects}
            studentId={studentId}
            skillOptions={skillOptions}
            isLoadingSkills={skillsQuery.isLoading}
            onSkillCreated={handleSkillCreated}
          />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Activities & Recognition"
        description="Showcase the achievements and involvement that make your profile stand out."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard profile={draftProfile} onProfileChange={setDraftProfile} isEditing onNotice={setNotice} />
          <SportsPrizesCard profile={draftProfile} onProfileChange={setDraftProfile} isEditing onNotice={setNotice} />
          <AwardsCard profile={draftProfile} onProfileChange={setDraftProfile} isEditing onNotice={setNotice} />
        </div>
      </ProfileGroup>
    </div>
  );
}
