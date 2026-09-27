import type { ProfileData } from "../shared/types";
import { PageHeader } from "../shared/PageHeader";
import { ProfileChip } from "../shared/ProfileChip";
import { studentProfileData } from "../shared/data";
import { getProfileCompletion } from "../shared/helpers";
import { AcademicPerformanceCard } from "./AcademicPerformanceCard";
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
import { AlertTriangle, BriefcaseBusiness, Building2, CheckCircle2, Clock3, Eye, FileText, GraduationCap, Info, Pencil, Trophy } from "lucide-react";
import { useState } from "react";

export function StudentProfile() {
  const [profile, setProfile] = useState<ProfileData>(studentProfileData);
  const [draftProfile, setDraftProfile] = useState<ProfileData>(studentProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const handleStartEditing = () => {
    setDraftProfile(profile);
    setIsEditing(true);
    setNotice("Editing mode active. Make your changes and click 'Save Changes'.");
  };

  const handleSaveChanges = () => {
    setProfile(draftProfile);
    setIsEditing(false);
    setNotice("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setDraftProfile(profile);
    setIsEditing(false);
    setNotice("Edit mode closed. Changes were not saved.");
  };

  const handlePreview = () => {
    setIsEditing(false);
    setNotice("Previewing profile.");
  };

  const activeProfile = isEditing ? draftProfile : profile;
  const currentCompletion = getProfileCompletion(profile);

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      {/* Top Header / Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title={isEditing ? "Placement Profile" : "My Profile"}
          description={
            isEditing
              ? "Build a stronger profile with the skills, experience, and documents recruiters look for."
              : "Keep your personal, academic, and placement details up to date."
          }
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handlePreview}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-300 bg-white px-3.5 py-2 text-xs font-semibold text-cyan-600 shadow-sm transition hover:bg-cyan-50"
              >
                <Eye size={15} /> Preview Profile
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
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
                <Pencil size={14} /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {notice && (
        <p role="status" className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700">
          {notice}
        </p>
      )}

      {/* View Mode Only Avatar & Cards */}
      {!isEditing && (
        <>
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xl font-bold text-cyan-600">
                  {profile.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
                  <p className="mt-1 text-xs text-slate-600">
                    {profile.program} · {profile.batch} Batch
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <ProfileChip icon={Building2} text={profile.department} />
                    <ProfileChip icon={FileText} text={`Reg. No. ${profile.registrationNumber}`} />
                    <ProfileChip icon={Clock3} text={profile.semester} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid items-stretch gap-4 lg:grid-cols-2">
            <ProfileCompletionCard profile={profile} onComplete={handleStartEditing} />
            <PlacementReadinessCard />
          </div>
        </>
      )}

      {/* Edit Mode Notice Banner */}
      {isEditing && (
        <div className="flex items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50/80 px-4 py-3 text-xs font-medium text-cyan-700 shadow-sm">
          <Info size={16} className="shrink-0 text-cyan-500" />
          You are in edit mode. Make your changes and save to update your profile.
        </div>
      )}

      {/* Group 1: Basic Information & Academic Performance */}
      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Keep your personal details and academic progress current for placement eligibility."
        icon={GraduationCap}
        badge={isEditing ? "Editing enabled" : undefined}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <BasicDetailsCard
              profile={activeProfile}
              onProfileChange={setDraftProfile}
              isEditing={isEditing}
              onSave={handleSaveChanges}
              onCancel={handleCancelEdit}
            />
            <ResumeCard
              profile={activeProfile}
              onProfileChange={setDraftProfile}
              isEditing={isEditing}
              onNotice={setNotice}
            />
          </div>
          <AcademicPerformanceCard
            profile={activeProfile}
            onProfileChange={setDraftProfile}
            isEditing={isEditing}
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
            <SkillsCard
              profile={activeProfile}
              onProfileChange={setDraftProfile}
              isEditing={isEditing}
              onNotice={setNotice}
            />
            <InternshipsCard
              profile={activeProfile}
              onProfileChange={setDraftProfile}
              isEditing={isEditing}
              onNotice={setNotice}
            />
          </div>
          <ProjectsCard
            profile={activeProfile}
            onProfileChange={setDraftProfile}
            isEditing={isEditing}
            onNotice={setNotice}
          />
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
            profile={activeProfile}
            onProfileChange={setDraftProfile}
            isEditing={isEditing}
            onNotice={setNotice}
          />
          <SportsPrizesCard
            profile={activeProfile}
            onProfileChange={setDraftProfile}
            isEditing={isEditing}
            onNotice={setNotice}
          />
          <AwardsCard
            profile={activeProfile}
            onProfileChange={setDraftProfile}
            isEditing={isEditing}
            onNotice={setNotice}
          />
        </div>
      </ProfileGroup>
    </div>
  );
}
