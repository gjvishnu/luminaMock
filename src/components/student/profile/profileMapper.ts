import type {
  CreateStudentPayload,
  StudentRecord,
  UpdateStudentPayload,
} from "../../../api/studentApi";
import type { ProfileData } from "../shared/types";

/** What a brand-new student sees: an empty profile. */
export const emptyProfile: ProfileData = {
  name: "",
  initials: "",
  registrationNumber: "",
  department: "",
  program: "",
  batch: "",
  semester: "",
  email: "",
  phone: "",
  location: "",
  dateOfBirth: "",
  gender: "",
  cgpa: "0",
  percentage: "",
  attendance: "-",
  backlogs: "0",
  profileCompletion: 0,
  semesterScores: [],
  skillGroups: [],
  skillsList: [],
  projects: [],
  internships: [],
  resume: { name: "No resume uploaded", size: "0 MB", updated: "-" },
  sports: [],
  extracurriculars: [],
  awards: [],
};

const ORDINALS = ["th", "st", "nd", "rd"];

export function semesterToLabel(semester: number | null | undefined): string {
  if (!semester) return "";
  const mod = semester % 100;
  const suffix = ORDINALS[(mod - 20) % 10] || ORDINALS[mod] || ORDINALS[0];
  return `${semester}${suffix} Semester`;
}

export function labelToSemester(label: string): number | null {
  const parsed = parseInt(label, 10);
  return Number.isInteger(parsed) ? parsed : null;
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** "2004-05-20" -> "20 May 2004" for the read-only view. */
export function formatDateOfBirth(value: string): string {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatUpdated(value?: string): string {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

/**
 * Overlays the backend student record on top of a base profile.
 * Parts of the profile that have no backend API yet (internships, projects,
 * skills, awards...) are kept from `base`.
 */
export function applyStudentRecord(
  base: ProfileData,
  student: StudentRecord,
): ProfileData {
  const cgpa =
    student.cgpa === null || student.cgpa === undefined
      ? "0"
      : String(Number(student.cgpa));

  return {
    ...base,
    name: student.name ?? "",
    initials: getInitials(student.name ?? ""),
    registrationNumber: student.registrationNumber ?? "",
    email: student.email ?? "",
    phone: student.phone ?? "",
    location: student.location ?? "",
    dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : "",
    program: student.program ?? "",
    batch: student.batch ? String(student.batch) : "",
    semester: semesterToLabel(student.semester),
    cgpa,
    backlogs: String(student.backlogs ?? 0),
    resume: student.resume
      ? {
          name: student.resume,
          size: "-",
          updated: formatUpdated(student.updatedAt),
        }
      : { name: "No resume uploaded", size: "0 MB", updated: "-" },
    // NOTE: `department` is a UUID in the backend and there is no departments API,
    // so the dropdown value stays local and is not sent/loaded.
  };
}

export type RequiredField = "name" | "email" | "registration_number";

/** Client-side check of the three fields the backend requires. */
export function validateRequired(
  profile: ProfileData,
): Partial<Record<RequiredField, string>> {
  const errors: Partial<Record<RequiredField, string>> = {};
  if (!profile.name.trim()) errors.name = "Full name is required.";
  if (!profile.email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(profile.email.trim()))
    errors.email = "Enter a valid email.";
  if (!profile.registrationNumber.trim())
    errors.registration_number = "Registration number is required.";
  return errors;
}

function sharedFields(profile: ProfileData): UpdateStudentPayload {
  const hasResume =
    profile.resume.name && profile.resume.name !== "No resume uploaded";
  const batch = parseInt(profile.batch, 10);

  return {
    name: profile.name.trim(),
    email: profile.email.trim(),
    phone: profile.phone.trim() || null,
    date_of_birth: profile.dateOfBirth || null,
    location: profile.location.trim() || null,
    program: profile.program.trim() || null,
    batch: Number.isInteger(batch) ? batch : null,
    semester: labelToSemester(profile.semester),
    resume: hasResume ? profile.resume.name : null,
  };
}

/** POST /students body. */
export function toCreatePayload(profile: ProfileData): CreateStudentPayload {
  return {
    ...sharedFields(profile),
    registration_number: profile.registrationNumber.trim(),
  } as CreateStudentPayload;
}

/** PATCH /students/:id body (registration number is locked once created). */
export function toUpdatePayload(profile: ProfileData): UpdateStudentPayload {
  return sharedFields(profile);
}
