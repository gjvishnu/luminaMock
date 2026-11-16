import type { ProfileData } from "../shared/types";
import { PageHeader } from "../shared/PageHeader";
import { ProfileChip } from "../shared/ProfileChip";
import { getProfileCompletion } from "../shared/helpers";
import { AwardsCard } from "./AwardsCard";
import { BasicDetailsCard } from "./BasicDetailsCard";
import { ExtracurricularsCard } from "./ExtracurricularsCard";
import { InternshipsCard } from "./InternshipsCard";
import { PlacementReadinessCard } from "./PlacementReadinessCard";
import { ProfileCompletionCard } from "./ProfileCompletionCard";
import { ProfileGroup } from "./ProfileGroup";
import { ProjectsCard } from "./ProjectsCard";
import { ResumeCard } from "./ResumeCard";
import { SkillsCard } from "./SkillsCard";
import { SportsPrizesCard } from "./SportsPrizesCard";
import { ProfileLoadError, ProfileLoading } from "./ProfileStatus";
import { useStudentProfileData } from "./useStudentProfileData";
import { AlertTriangle, BriefcaseBusiness, Building2, CheckCircle2, Clock3, FileText, GraduationCap, Pencil, Plus, Trophy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ignoreProfileChange = () => {};

export function StudentProfile() {
  const data = useStudentProfileData();

  if (data.isLoading) return <ProfileLoading />;
  if (data.errorMessage || !data.result) return <ProfileLoadError message={data.errorMessage} onRetry={data.refetch} />;

  return <ProfileContent profile={data.result.profile} isFreshUser={data.result.freshUser} />;
}

function ProfileContent({ profile, isFreshUser }: { profile: ProfileData; isFreshUser: boolean }) {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const handleStartEditing = () => navigate("/profile/edit");
  const currentCompletion = getProfileCompletion(profile);
  const academicSummary = [profile.program, profile.batch && `${profile.batch} Batch`].filter(Boolean).join(" · ");

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      {/* Top Header / Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="My Profile"
          description="Keep your personal, academic, and placement details up to date."
        />
        <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[10px] font-bold ${
                currentCompletion.percentage === 100 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"
              }`}>
                {currentCompletion.percentage === 100 ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                {currentCompletion.percentage}% complete
              </span>
              <button
                type="button"
                onClick={handleStartEditing}
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                {isFreshUser ? <Plus size={14} /> : <Pencil size={14} />}
                {isFreshUser ? "Add Details" : "Edit Profile"}
              </button>
        </div>
      </div>

      {notice && (
        <p role="status" className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700">
          {notice}
        </p>
      )}

      {/* Avatar & Cards */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xl font-bold text-cyan-600">
                  {profile.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
                  <p className="mt-1 text-xs text-slate-600">
                    {academicSummary || "Add your details to complete your profile."}
                  </p>
                  {!isFreshUser && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.department && <ProfileChip icon={Building2} text={profile.department} />}
                      <ProfileChip icon={FileText} text={`Reg. No. ${profile.registrationNumber}`} />
                      {profile.semester && <ProfileChip icon={Clock3} text={profile.semester} />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="grid items-stretch gap-4 lg:grid-cols-2">
            <ProfileCompletionCard profile={profile} onComplete={handleStartEditing} />
            <PlacementReadinessCard profile={profile} emptyMessage={isFreshUser ? "Add your details to start building your readiness." : undefined} />
          </div>

      {/* Group 1: Basic Information & Academic Performance */}
      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Keep your personal details and academic progress current for placement eligibility."
        icon={GraduationCap}
      >
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <BasicDetailsCard profile={profile} />
          <ResumeCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={setNotice}
          />
        </div>
      </ProfileGroup>

      {/* Group 2: Placement Profile */}
      <ProfileGroup
        title="Placement Profile"
        description="Build a stronger profile with the skills, experience, and documents recruiters look for."
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

      {/* Group 3: Activities & Recognition */}
      <ProfileGroup
        title="Activities & Recognition"
        description="Showcase the achievements and involvement that make your profile stand out."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={setNotice}
          />
          <SportsPrizesCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={setNotice}
          />
          <AwardsCard
            profile={profile}
            onProfileChange={ignoreProfileChange}
            onNotice={setNotice}
          />
        </div>
      </ProfileGroup>
    </div>
  );
}
