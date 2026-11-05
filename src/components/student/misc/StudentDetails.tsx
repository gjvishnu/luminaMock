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
import type { ProfileData } from "../shared/types";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { useStudentDetailsData } from "./useStudentDetailsData";
import { ArrowLeft, BriefcaseBusiness, Building2, Clock3, FileText, GraduationCap, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ignoreProfileChange = () => {};
const ignoreNotice = () => {};

export function StudentDetails() {
  const { studentId = "" } = useParams();
  const data = useStudentDetailsData(studentId);

  if (data.isLoading) return <ProfileLoading label="Loading student details..." />;
  if (!data.profile) return <ProfileLoadError message={data.errorMessage} onRetry={data.refetch} />;

  return <StudentDetailsContent profile={data.profile} />;
}

function StudentDetailsContent({ profile }: { profile: ProfileData }) {
  const navigate = useNavigate();
  const academicSummary = [profile.program, profile.batch && `${profile.batch} Batch`].filter(Boolean).join(" · ");

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
            {profile.initials || "—"}
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">
              {profile.name || "Name not added"}
            </h2>

            {academicSummary && <p className="mt-1 text-xs text-slate-600">{academicSummary}</p>}

            <div className="mt-2 flex flex-wrap gap-2">
              {profile.department && <ProfileChip icon={Building2} text={profile.department} />}
              <ProfileChip
                icon={FileText}
                text={`Reg. No. ${profile.registrationNumber}`}
              />
              {profile.semester && <ProfileChip icon={Clock3} text={profile.semester} />}
            </div>
          </div>
        </div>
      </section>

      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <ProfileCompletionCard profile={profile} />
        <PlacementReadinessCard emptyMessage="Readiness score is not available yet." />
      </div>

      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Student personal details and academic progress."
        icon={GraduationCap}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <BasicDetailsCard profile={profile} />
            <ResumeCard profile={profile} onProfileChange={ignoreProfileChange} readOnly onNotice={ignoreNotice} />
          </div>

          <AcademicPerformanceCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={ignoreNotice}
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
            <SkillsCard profile={profile} />
            <InternshipsCard profile={profile} />
          </div>

          <ProjectsCard profile={profile} />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Activities & Recognition"
        description="Achievements and student involvement."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={ignoreNotice}
          />
          <SportsPrizesCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={ignoreNotice}
          />
          <AwardsCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={ignoreNotice}
          />
        </div>
      </ProfileGroup>
    </div>
  );
}
