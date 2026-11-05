import type { DegreeRecord, DepartmentRecord, InternshipRecord, ProjectRecord, SkillRecord, StudentProfileRecord } from "../../../redux/api";
import { emptyStudentProfile } from "./data";
import type { ProfileChecklistItem, ProfileData } from "./types";

const SEMESTER_SUFFIXES = ["th", "st", "nd", "rd"];

export function formatSemester(semester: number) {
  return `${semester}${SEMESTER_SUFFIXES[semester] ?? "th"} Semester`;
}

function formatDateOfBirth(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

function formatMonth(value: string) {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

// Used until the student has saved their name.
function getNameFromEmail(email: string) {
  return email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()).trim();
}

export function toProfileData({
  email,
  student,
  departments,
  degrees,
  skills,
  internships,
  projects,
}: {
  email: string;
  student: StudentProfileRecord | null;
  departments: DepartmentRecord[];
  degrees: DegreeRecord[];
  skills: SkillRecord[];
  internships: InternshipRecord[];
  projects: ProjectRecord[];
}): ProfileData {
  const name = student?.name || getNameFromEmail(email);
  const initials = name.split(" ").slice(0, 2).map((part) => part[0]).join("");
  const profile = { ...emptyStudentProfile, name, initials, email };

  if (!student) return profile;

  return {
    ...profile,
    registrationNumber: student.registrationNumber,
    department: departments.find((department) => department.id === student.departmentId)?.name ?? "",
    program: degrees.find((degree) => degree.id === student.degreeId)?.degreeName ?? "",
    batch: student.batch === null ? "" : String(student.batch),
    semester: student.semester === null ? "" : formatSemester(student.semester),
    phone: student.phone ?? "",
    location: student.location ?? "",
    dateOfBirth: student.dateOfBirth ? formatDateOfBirth(student.dateOfBirth) : "",
    skillsList: skills.map((skill) => skill.skill),
    internships: internships.map((internship) => ({
      id: internship.id,
      isVerified: internship.isVerified,
      role: internship.title,
      company: internship.companyName,
      duration: `${formatMonth(internship.startDate)} – ${internship.endDate ? formatMonth(internship.endDate) : "Present"}`,
      description: internship.description,
      certificateFile: "",
      certificateSize: "",
    })),
    projects: projects.map((project) => ({
      id: project.id,
      title: project.title,
      type: project.projectType,
      dates: "",
      description: project.description,
      technologies: project.technologies.map((technology) => technology.skill),
      githubUrl: "",
      reportFile: "",
    })),
  };
}

export function getProfileCompletion(profile: ProfileData) {
  // 1. Basic Details (20%)
  // Email is left out: every account has one, and officers cannot read it.
  const basicFields = [
    profile.name,
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
