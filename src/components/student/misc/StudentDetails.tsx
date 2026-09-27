import { AcademicPerformanceCard } from "../profile/AcademicPerformanceCard";
import { AwardsCard } from "../profile/AwardsCard";
import { BasicDetailsCard } from "../profile/BasicDetailsCard";
import { ExtracurricularsCard } from "../profile/ExtracurricularsCard";
import { InternshipsCard } from "../profile/InternshipsCard";
import { PlacementReadinessCard } from "../profile/PlacementReadinessCard";
import { ProfileCompletionCard } from "../profile/ProfileCompletionCard";
import { ProfileGroup } from "../profile/ProfileGroup";
import { ProjectsCard } from "../profile/ProjectsCard";
import { ResumeCard } from "../profile/ResumeCard";
import { SkillsCard } from "../profile/SkillsCard";
import { SportsPrizesCard } from "../profile/SportsPrizesCard";
import { PageHeader } from "../shared/PageHeader";
import { ProfileChip } from "../shared/ProfileChip";
import { studentProfileData } from "../shared/data";
import { ArrowLeft, BriefcaseBusiness, Building2, Clock3, FileText, GraduationCap, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StudentDetails() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/students")}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-700"
          >
            <ArrowLeft size={15} />
            Back to Students
          </button>

          <PageHeader
            title="Student Details"
            description="View student profile and placement information."
          />
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xl font-bold text-cyan-600">
            {studentProfileData.initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">
              {studentProfileData.name}
            </h2>

            <p className="mt-1 text-xs text-slate-600">
              {studentProfileData.program} · {studentProfileData.batch} Batch
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <ProfileChip
                icon={Building2}
                text={studentProfileData.department}
              />
              <ProfileChip
                icon={FileText}
                text={`Reg. No. ${studentProfileData.registrationNumber}`}
              />
              <ProfileChip icon={Clock3} text={studentProfileData.semester} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <ProfileCompletionCard profile={studentProfileData} onComplete={() => {}} />
        <PlacementReadinessCard />
      </div>

      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Student personal details and academic progress."
        icon={GraduationCap}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <BasicDetailsCard
              profile={studentProfileData}
              onProfileChange={() => {}}
              isEditing={false}
              onSave={() => {}}
              onCancel={() => {}}
            />
            <ResumeCard
              profile={studentProfileData}
              onProfileChange={() => {}}
              isEditing={false}
              onNotice={() => {}}
            />
          </div>

          <AcademicPerformanceCard
            profile={studentProfileData}
            onProfileChange={() => {}}
            isEditing={false}
            onNotice={() => {}}
          />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Placement Profile"
        description="Skills, projects, internships and resume information."
        icon={BriefcaseBusiness}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SkillsCard
              profile={studentProfileData}
              onProfileChange={() => {}}
              isEditing={false}
              onNotice={() => {}}
            />
            <InternshipsCard
              profile={studentProfileData}
              onProfileChange={() => {}}
              isEditing={false}
              onNotice={() => {}}
            />
          </div>

          <ProjectsCard
            profile={studentProfileData}
            onProfileChange={() => {}}
            isEditing={false}
            onNotice={() => {}}
          />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Activities & Recognition"
        description="Achievements and student involvement."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard
            profile={studentProfileData}
            onProfileChange={() => {}}
            isEditing={false}
            onNotice={() => {}}
          />
          <SportsPrizesCard
            profile={studentProfileData}
            onProfileChange={() => {}}
            isEditing={false}
            onNotice={() => {}}
          />
          <AwardsCard
            profile={studentProfileData}
            onProfileChange={() => {}}
            isEditing={false}
            onNotice={() => {}}
          />
        </div>
      </ProfileGroup>
    </div>
  );
}
