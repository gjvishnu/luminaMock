import type { ProfileChecklistItem, ProfileData } from "./types";

export function getProfileCompletion(profile: ProfileData) {
  // 1. Basic Details (20%)
  const basicFields = [
    profile.name,
    profile.email,
    profile.phone,
    profile.dateOfBirth,
    profile.location,
  ];
  const basicFilledCount = basicFields.filter((f) => Boolean(f && f.trim())).length;
  const basicWeight = (basicFilledCount / basicFields.length) * 20;

  // 2. Academic Performance (20%)
  const hasCgpa = Boolean(profile.cgpa && profile.cgpa.trim() && profile.cgpa !== "0");
  const hasPercentage = Boolean(profile.percentage && profile.percentage.trim() && profile.percentage !== "0%");
  const hasSemScores = Boolean(
    profile.semesterScores &&
      profile.semesterScores.length > 0 &&
      profile.semesterScores.some((s) => s.score && s.score !== "Pending")
  );
  const academicFilledCount = [hasCgpa, hasPercentage, hasSemScores].filter(Boolean).length;
  const academicWeight = (academicFilledCount / 3) * 20;

  // 3. Resume (25%)
  const hasResume = Boolean(
    profile.resume?.name &&
      profile.resume.name.trim() !== "" &&
      profile.resume.name !== "No resume uploaded"
  );
  const resumeWeight = hasResume ? 25 : 0;

  // 4. Placement Profile (25%) - Skills, Internships, Projects
  const hasSkills = Boolean(profile.skillsList && profile.skillsList.length > 0);
  const hasProjects = Boolean(profile.projects && profile.projects.length > 0);
  const hasInternships = Boolean(profile.internships && profile.internships.length > 0);
  const placementFilledCount = [hasSkills, hasProjects, hasInternships].filter(Boolean).length;
  const placementWeight = (placementFilledCount / 3) * 25;

  // 5. Activities & Recognition (10%) - Extracurriculars, Sports, Awards
  const hasExtracurriculars = Boolean(profile.extracurriculars && profile.extracurriculars.length > 0);
  const hasSports = Boolean(profile.sports && profile.sports.length > 0);
  const hasAwards = Boolean(profile.awards && profile.awards.length > 0);
  const activitiesFilledCount = [hasExtracurriculars, hasSports, hasAwards].filter(Boolean).length;
  const activitiesWeight = (activitiesFilledCount / 3) * 10;

  const rawTotal = basicWeight + academicWeight + resumeWeight + placementWeight + activitiesWeight;
  const percentage = Math.min(100, Math.round(rawTotal));

  const checklistItems: ProfileChecklistItem[] = [
    {
      label: "Personal Details",
      status: basicFilledCount === basicFields.length ? "done" : "warning",
    },
    {
      label: "Internship Details",
      status: hasInternships ? "done" : "warning",
    },
    {
      label: "Academic Details",
      status: academicFilledCount === 3 ? "done" : "warning",
    },
    {
      label: "Resume",
      status: hasResume ? "done" : "warning",
    },
    {
      label: "Skills",
      status: hasSkills ? "done" : "warning",
    },
    {
      label: "Projects",
      status: hasProjects ? "done" : "warning",
    },
  ];

  return { percentage, checklistItems };
}
