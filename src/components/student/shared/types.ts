import { studentProfileData } from "./data";

export type JobListing = {
  id: string;
  company: string;
  companyName: string;
  logo: string;
  role: string;
  skills: string[];
  location: string;
  ctc: string;
  applyBy: string;
  daysLeft: number;
  match: number;
  matchLabel: string;
};

export type StudentProfileSnapshot = {
  branch: string;
  cgpa: string;
  skills: string[];
  projectCount: number;
};

export type PlacementFeedbackInsight = {
  reviewedStudents: number;
  averageRating: number;
  focusStage: string;
  commonChallenge: string;
  toughRoundShare: number;
  copingStrategies: string[];
  improvementSkills: string[];
  successfulPattern: string;
  nextAction: string;
};

export type ProfileData = typeof studentProfileData;

export type ProfileChecklistItem = {
  label: string;
  status: "done" | "warning";
};

export type ApplicationStatus =
  | "Shortlisted"
  | "In Process"
  | "Rejected"
  | "Offer"
  | "Withdrawn";

export type ApplicationRow = {
  id: string;
  company: string;
  companyName: string;
  logo: string;
  role: string;
  location: string;
  ctc: string;
  appliedOn: string;
  status: ApplicationStatus;
  updated: string;
  nextStep: string;
  nextDate: string;
};

export type WorkflowStepStatus =
  | "done"
  | "current"
  | "pending"
  | "rejected"
  | "withdrawn";

export type WorkflowStep = {
  label: string;
  date: string;
  status: WorkflowStepStatus;
};

export type ApplicationDocument = {
  name: string;
  size: string;
};

export type ApplicationDetailInfo = {
  jobDescription: string;
  responsibilities: string[];
  eligibility: string[];
  workflow: WorkflowStep[];
  documents: ApplicationDocument[];
};
