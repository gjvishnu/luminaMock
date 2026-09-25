import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleMinus,
  Clock3,
  Download,
  FileText,
  Filter,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  Upload,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type JobListing = {
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

const jobListings: JobListing[] = [
  {
    id: "tcs",
    company: "TCS",
    companyName: "Tata Consultancy Services",
    logo: "tcs",
    role: "Software Engineer",
    skills: ["C, C++, Java", "SQL", "OOPs", "+2"],
    location: "Bangalore",
    ctc: "₹7.5 LPA",
    applyBy: "05 Sep 2026",
    daysLeft: 5,
    match: 92,
    matchLabel: "Excellent",
  },
  {
    id: "infosys",
    company: "Infosys",
    companyName: "Infosys",
    logo: "Infosys",
    role: "System Engineer",
    skills: ["Python", "SQL", "Linux", "+1"],
    location: "Pune",
    ctc: "₹6.5 LPA",
    applyBy: "08 Sep 2026",
    daysLeft: 8,
    match: 87,
    matchLabel: "Great",
  },
  {
    id: "zoho",
    company: "Zoho",
    companyName: "Zoho Corporation",
    logo: "ZOHO",
    role: "Software Developer",
    skills: ["JavaScript", "React", "Node.js", "+1"],
    location: "Chennai",
    ctc: "₹8.0 LPA",
    applyBy: "12 Sep 2026",
    daysLeft: 12,
    match: 82,
    matchLabel: "Good",
  },
  {
    id: "wipro",
    company: "Wipro",
    companyName: "Wipro",
    logo: "wipro",
    role: "Project Engineer",
    skills: ["Java", "SQL", "DSA", "+1"],
    location: "Hyderabad",
    ctc: "₹6.0 LPA",
    applyBy: "18 Sep 2026",
    daysLeft: 18,
    match: 78,
    matchLabel: "Good",
  },
  {
    id: "accenture",
    company: "Accenture",
    companyName: "Accenture",
    logo: "accenture",
    role: "Associate Software Engineer",
    skills: ["Python", "SQL", "OOPs", "+2"],
    location: "Bangalore",
    ctc: "₹7.0 LPA",
    applyBy: "20 Sep 2026",
    daysLeft: 20,
    match: 74,
    matchLabel: "Good",
  },
  {
    id: "cognizant",
    company: "Cognizant",
    companyName: "Cognizant",
    logo: "cognizant",
    role: "Graduate Engineer Trainee",
    skills: ["C#", ".NET", "SQL", "+1"],
    location: "Kolkata",
    ctc: "₹6.5 LPA",
    applyBy: "22 Sep 2026",
    daysLeft: 22,
    match: 72,
    matchLabel: "Fair",
  },
  {
    id: "lti-mindtree",
    company: "LTI Mindtree",
    companyName: "LTI Mindtree",
    logo: "LTI",
    role: "Software Engineer",
    skills: ["Java", "Spring", "SQL", "+1"],
    location: "Mumbai",
    ctc: "₹6.8 LPA",
    applyBy: "25 Sep 2026",
    daysLeft: 25,
    match: 69,
    matchLabel: "Fair",
  },
  {
    id: "capgemini",
    company: "Capgemini",
    companyName: "Capgemini",
    logo: "Capgemini",
    role: "Analyst",
    skills: ["Python", "SQL", "Excel", "+1"],
    location: "Bangalore",
    ctc: "₹5.5 LPA",
    applyBy: "28 Sep 2026",
    daysLeft: 28,
    match: 65,
    matchLabel: "Fair",
  },
];

const jobFilterOptions = {
  company: ["All Companies", "TCS", "Infosys", "Zoho", "Wipro", "Accenture"],
  role: [
    "All Roles",
    "Software Engineer",
    "System Engineer",
    "Developer",
    "Analyst",
  ],
  location: [
    "All Locations",
    "Bangalore",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Mumbai",
  ],
  type: ["All Job Types", "Full-time", "Internship", "Contract"],
};

type StudentProfileSnapshot = {
  branch: string;
  cgpa: string;
  skills: string[];
  projectCount: number;
};

type PlacementFeedbackInsight = {
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

const studentProfileSnapshot: StudentProfileSnapshot = {
  branch: "CSE",
  cgpa: "8.72",
  skills: ["Java", "SQL", "OOPs", "DSA", "Python", "React"],
  projectCount: 3,
};

const studentProfileData = {
  name: "Arjun Mehta",
  initials: "AM",
  registrationNumber: "CSE2026-014",
  department: "Computer Science & Engineering",
  program: "B.E. Computer Science",
  batch: "2026",
  semester: "7th Semester",
  email: "arjun.mehta@lumina.edu",
  phone: "+91 98765 43210",
  location: "Bengaluru, Karnataka",
  dateOfBirth: "14 May 2004",
  gender: "Male",
  cgpa: "8.72",
  percentage: "82.4%",
  attendance: "91%",
  backlogs: "0",
  profileCompletion: 92,
  semesterScores: [
    {
      label: "Sem 1",
      score: "8.1",
      percentage: 81,
      attendance: 88,
      backlogs: 0,
    },
    {
      label: "Sem 2",
      score: "8.4",
      percentage: 84,
      attendance: 90,
      backlogs: 0,
    },
    {
      label: "Sem 3",
      score: "8.6",
      percentage: 86,
      attendance: 89,
      backlogs: 0,
    },
    {
      label: "Sem 4",
      score: "8.8",
      percentage: 88,
      attendance: 92,
      backlogs: 0,
    },
    {
      label: "Sem 5",
      score: "8.9",
      percentage: 89,
      attendance: 93,
      backlogs: 0,
    },
    {
      label: "Sem 6",
      score: "9.1",
      percentage: 91,
      attendance: 94,
      backlogs: 0,
    },
  ],
  skillGroups: [
    { label: "Programming", skills: ["Java", "Python", "C++", "JavaScript"] },
    { label: "Core CS", skills: ["DSA", "OOPs", "DBMS", "Computer Networks"] },
    { label: "Tools & Frameworks", skills: ["React", "Node.js", "Git", "SQL"] },
  ],
  projects: [
    {
      title: "Placement Prep AI",
      type: "Full-stack web application",
      description:
        "Personalized placement preparation dashboard with job matching and interview insights.",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Smart Attendance System",
      type: "Academic project",
      description:
        "Automated attendance tracking system with reports for students and faculty.",
      technologies: ["Python", "Flask", "MySQL"],
    },
    {
      title: "Campus Connect Portal",
      type: "Team project",
      description:
        "Student community platform for events, announcements, and peer collaboration.",
      technologies: ["JavaScript", "Express", "PostgreSQL"],
    },
  ],
  internships: [
    {
      role: "Frontend Developer Intern",
      company: "BlueOrbit Technologies",
      duration: "May 2025 – Jul 2025",
      description:
        "Built responsive dashboard screens and reusable React components.",
    },
    {
      role: "Software Engineering Intern",
      company: "Lumina Labs",
      duration: "Jan 2025 – Mar 2025",
      description:
        "Worked on REST APIs, database queries, and automated testing.",
    },
  ],
  resume: {
    name: "Arjun_Mehta_Resume_2026.pdf",
    size: "1.2 MB",
    updated: "28 Aug 2026",
  },
  sports: [
    {
      title: "University Cricket Team",
      detail: "Vice Captain · Inter-college runner-up",
      period: "2024 – 2026",
    },
    {
      title: "100m Athletics",
      detail: "Department sports meet · Gold medal",
      period: "2025",
    },
  ],
  extracurriculars: [
    {
      title: "Coding Club Lead",
      detail: "Organised weekly problem-solving sessions for 60+ students.",
    },
    {
      title: "Placement Cell Volunteer",
      detail: "Supported employer events and student interview coordination.",
    },
  ],
  awards: [
    {
      title: "Hackathon Winner",
      detail: "1st place · Lumina Buildathon 2025",
      year: "2025",
    },
    {
      title: "Academic Excellence Award",
      detail: "Top 10% of the department",
      year: "2024",
    },
  ],
};

type ProfileChecklistItem = {
  label: string;
  status: "done" | "warning";
};

const profileCompletionChecklist: ProfileChecklistItem[] = [
  { label: "Personal Details", status: "done" },
  { label: "Internship Details", status: "warning" },
  { label: "Academic Details", status: "done" },
  { label: "Resume", status: "warning" },
  { label: "Skills", status: "done" },
  { label: "Projects", status: "done" },
];

const placementReadinessChecklist: ProfileChecklistItem[] = [
  { label: "CGPA", status: "done" },
  { label: "Certificates", status: "done" },
  { label: "Resume", status: "done" },
  { label: "Add 1 more project", status: "warning" },
  { label: "Projects", status: "done" },
  { label: "Add internship details", status: "warning" },
  { label: "Skills", status: "done" },
];

const placementFeedbackByCompany: Record<string, PlacementFeedbackInsight> = {
  TCS: {
    reviewedStudents: 320,
    averageRating: 4.2,
    focusStage: "Technical interview",
    commonChallenge: "DSA under time pressure",
    toughRoundShare: 38,
    copingStrategies: [
      "Clarify the approach before coding.",
      "Think aloud while comparing solutions.",
      "Test edge cases before optimising.",
    ],
    improvementSkills: [
      "Timed DSA practice",
      "Complexity analysis",
      "Project explanation",
    ],
    successfulPattern:
      "Students who practised timed problems and explained their approach clearly progressed more often.",
    nextAction:
      "Complete two timed DSA problems and rehearse one project walkthrough before the technical round.",
  },
  Infosys: {
    reviewedStudents: 246,
    averageRating: 4.1,
    focusStage: "Online assessment",
    commonChallenge: "Aptitude speed and accuracy",
    toughRoundShare: 34,
    copingStrategies: [
      "Use a fixed time limit per question.",
      "Skip and return instead of getting stuck.",
      "Review SQL and Python patterns daily.",
    ],
    improvementSkills: ["Aptitude speed", "SQL joins", "Python fundamentals"],
    successfulPattern:
      "Recent candidates found a short daily aptitude routine more useful than last-minute preparation.",
    nextAction:
      "Set aside 30 minutes for aptitude practice, then revise Python and SQL fundamentals.",
  },
  Zoho: {
    reviewedStudents: 184,
    averageRating: 4.4,
    focusStage: "Problem-solving round",
    commonChallenge: "Turning ideas into working code",
    toughRoundShare: 46,
    copingStrategies: [
      "Start with a simple working solution.",
      "Explain trade-offs as you improve it.",
      "Practise coding without autocomplete.",
    ],
    improvementSkills: [
      "Problem decomposition",
      "JavaScript fundamentals",
      "Debugging",
    ],
    successfulPattern:
      "Candidates who built and discussed one complete project stood out in the later rounds.",
    nextAction:
      "Prepare a concise demo of your strongest project and practise coding it from a blank file.",
  },
};

const defaultPlacementFeedback: PlacementFeedbackInsight = {
  reviewedStudents: 120,
  averageRating: 4.0,
  focusStage: "Technical interview",
  commonChallenge: "Explaining the reasoning behind solutions",
  toughRoundShare: 31,
  copingStrategies: [
    "Restate the problem in your own words.",
    "Talk through trade-offs before committing.",
    "Finish with a quick test and recap.",
  ],
  improvementSkills: [
    "Problem solving",
    "Technical communication",
    "Core role skills",
  ],
  successfulPattern:
    "Candidates who connected their projects to the role and explained trade-offs made stronger impressions.",
  nextAction:
    "Review the core requirements and prepare one project story that demonstrates them.",
};

type ApplicationStatus =
  | "Shortlisted"
  | "In Process"
  | "Rejected"
  | "Offer"
  | "Withdrawn";

type ApplicationRow = {
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

const applicationRows: ApplicationRow[] = [
  {
    id: "tcs",
    company: "TCS",
    companyName: "Tata Consultancy Services",
    logo: "tcs",
    role: "Software Engineer",
    location: "Bangalore",
    ctc: "₹7.5 LPA",
    appliedOn: "05 Sep 2026",
    status: "Shortlisted",
    updated: "Updated on 10 Sep 2026",
    nextStep: "Technical Interview",
    nextDate: "On 18 Sep 2026",
  },
  {
    id: "infosys",
    company: "Infosys",
    companyName: "Infosys",
    logo: "Infosys",
    role: "System Engineer",
    location: "Pune",
    ctc: "₹6.5 LPA",
    appliedOn: "08 Sep 2026",
    status: "In Process",
    updated: "Updated on 12 Sep 2026",
    nextStep: "HR Interview",
    nextDate: "On 20 Sep 2026",
  },
  {
    id: "zoho",
    company: "Zoho",
    companyName: "Zoho Corporation",
    logo: "ZOHO",
    role: "Software Developer",
    location: "Chennai",
    ctc: "₹8.0 LPA",
    appliedOn: "12 Sep 2026",
    status: "In Process",
    updated: "Updated on 14 Sep 2026",
    nextStep: "Group Discussion",
    nextDate: "On 16 Sep 2026",
  },
  {
    id: "wipro",
    company: "Wipro",
    companyName: "Wipro",
    logo: "wipro",
    role: "Project Engineer",
    location: "Hyderabad",
    ctc: "₹6.0 LPA",
    appliedOn: "18 Sep 2026",
    status: "Rejected",
    updated: "Updated on 21 Sep 2026",
    nextStep: "Not Selected",
    nextDate: "Thank you for applying.",
  },
  {
    id: "accenture",
    company: "Accenture",
    companyName: "Accenture",
    logo: "accenture",
    role: "Associate Software Engineer",
    location: "Bangalore",
    ctc: "₹7.0 LPA",
    appliedOn: "20 Sep 2026",
    status: "Offer",
    updated: "Updated on 22 Sep 2026",
    nextStep: "Offer Received",
    nextDate: "On 22 Sep 2026",
  },
  {
    id: "cognizant",
    company: "Cognizant",
    companyName: "Cognizant",
    logo: "cognizant",
    role: "Graduate Engineer Trainee",
    location: "Kolkata",
    ctc: "₹6.5 LPA",
    appliedOn: "22 Sep 2026",
    status: "Withdrawn",
    updated: "Updated on 23 Sep 2026",
    nextStep: "Application Withdrawn",
    nextDate: "By you on 23 Sep 2026",
  },
];

const applicationTabs: {
  label: string;
  status?: ApplicationStatus;
  count: number;
}[] = [
  { label: "All", count: 12 },
  { label: "Shortlisted", status: "Shortlisted", count: 4 },
  { label: "In Process", status: "In Process", count: 3 },
  { label: "Offer", status: "Offer", count: 1 },
  { label: "Rejected", status: "Rejected", count: 3 },
  { label: "Withdrawn", status: "Withdrawn", count: 1 },
];

type WorkflowStepStatus =
  | "done"
  | "current"
  | "pending"
  | "rejected"
  | "withdrawn";

type WorkflowStep = {
  label: string;
  date: string;
  status: WorkflowStepStatus;
};

type ApplicationDocument = {
  name: string;
  size: string;
};

type ApplicationDetailInfo = {
  jobDescription: string;
  responsibilities: string[];
  eligibility: string[];
  workflow: WorkflowStep[];
  documents: ApplicationDocument[];
};

const applicationDetails: Record<string, ApplicationDetailInfo> = {
  tcs: {
    jobDescription:
      "TCS is hiring Software Engineers for its Bangalore delivery center to work on enterprise application development and modernization projects for global clients, as part of the Ninja / Digital hiring track.",
    responsibilities: [
      "Design, develop and unit-test application modules",
      "Participate in code reviews and daily stand-ups",
      "Debug and resolve production support issues",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 6.5+, no active backlogs",
      "Core Java, SQL and OOP fundamentals",
      "Good communication and problem-solving skills",
    ],
    workflow: [
      { label: "Applied", date: "05 Sep", status: "done" },
      { label: "Shortlisted", date: "10 Sep", status: "done" },
      { label: "Technical Interview", date: "18 Sep", status: "current" },
      { label: "HR Interview", date: "Pending", status: "pending" },
      { label: "Offer", date: "Pending", status: "pending" },
    ],
    documents: [{ name: "Job_Description_TCS_SE.pdf", size: "180 KB" }],
  },
  infosys: {
    jobDescription:
      "Infosys is hiring System Engineers for application development, testing and support projects across global client accounts as part of the campus hiring track.",
    responsibilities: [
      "Support design, coding and testing of software modules",
      "Assist in requirement analysis and documentation",
      "Coordinate with senior engineers on delivery timelines",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 6.0+, no active backlogs",
      "Python, SQL and Linux fundamentals",
      "Strong analytical and communication skills",
    ],
    workflow: [
      { label: "Applied", date: "08 Sep", status: "done" },
      { label: "Shortlisted", date: "12 Sep", status: "done" },
      { label: "Technical Interview", date: "15 Sep", status: "done" },
      { label: "HR Interview", date: "20 Sep", status: "current" },
      { label: "Offer", date: "Pending", status: "pending" },
    ],
    documents: [{ name: "Job_Description_Infosys_SE.pdf", size: "165 KB" }],
  },
  zoho: {
    jobDescription:
      "Zoho Corporation is hiring Software Developers to build and maintain features across its suite of SaaS products used by businesses worldwide.",
    responsibilities: [
      "Build and maintain product features end-to-end",
      "Write clean, tested and maintainable code",
      "Collaborate closely with product and QA teams",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 7.0+, no active backlogs",
      "JavaScript, React and Node.js fundamentals",
      "Strong problem-solving ability",
    ],
    workflow: [
      { label: "Applied", date: "12 Sep", status: "done" },
      { label: "Shortlisted", date: "14 Sep", status: "done" },
      { label: "Group Discussion", date: "16 Sep", status: "current" },
      { label: "Technical Interview", date: "Pending", status: "pending" },
      { label: "Offer", date: "Pending", status: "pending" },
    ],
    documents: [{ name: "Job_Description_Zoho_Developer.pdf", size: "150 KB" }],
  },
  wipro: {
    jobDescription:
      "Wipro is hiring Project Engineers to support delivery of client projects across infrastructure and application services.",
    responsibilities: [
      "Assist project leads with planning and execution",
      "Prepare status reports and documentation",
      "Support testing and deployment activities",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 6.0+, no active backlogs",
      "Java, SQL and DSA fundamentals",
      "Good communication skills",
    ],
    workflow: [
      { label: "Applied", date: "18 Sep", status: "done" },
      { label: "Shortlisted", date: "19 Sep", status: "done" },
      { label: "Technical Interview", date: "21 Sep", status: "done" },
      { label: "HR Interview", date: "Not Selected", status: "rejected" },
      { label: "Offer", date: "—", status: "pending" },
    ],
    documents: [{ name: "Job_Description_Wipro_PE.pdf", size: "140 KB" }],
  },
  accenture: {
    jobDescription:
      "Accenture is hiring Associate Software Engineers to work on application development and modernization engagements for global clients.",
    responsibilities: [
      "Develop and test application components",
      "Participate in agile ceremonies and sprint planning",
      "Document technical designs and decisions",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 6.5+, no active backlogs",
      "Python, SQL and OOP fundamentals",
      "Adaptability and teamwork",
    ],
    workflow: [
      { label: "Applied", date: "20 Sep", status: "done" },
      { label: "Shortlisted", date: "20 Sep", status: "done" },
      { label: "Technical Interview", date: "21 Sep", status: "done" },
      { label: "HR Interview", date: "22 Sep", status: "done" },
      { label: "Offer", date: "22 Sep", status: "done" },
    ],
    documents: [{ name: "Job_Description_Accenture_ASE.pdf", size: "155 KB" }],
  },
  cognizant: {
    jobDescription:
      "Cognizant is hiring Graduate Engineer Trainees for its technology services and consulting teams working with global clients.",
    responsibilities: [
      "Support development and testing of client applications",
      "Learn and apply engineering best practices",
      "Participate in structured training programs",
    ],
    eligibility: [
      "B.E. / B.Tech, CGPA 6.0+, no active backlogs",
      "C#, .NET and SQL fundamentals",
      "Willingness to learn and relocate",
    ],
    workflow: [
      { label: "Applied", date: "22 Sep", status: "done" },
      { label: "Shortlisted", date: "Withdrawn", status: "withdrawn" },
      { label: "Technical Interview", date: "Pending", status: "pending" },
      { label: "HR Interview", date: "Pending", status: "pending" },
      { label: "Offer", date: "Pending", status: "pending" },
    ],
    documents: [{ name: "Job_Description_Cognizant_GET.pdf", size: "145 KB" }],
  },
};

const workflowStepStyles: Record<
  WorkflowStepStatus,
  { ring: string; icon: string; label: string }
> = {
  done: {
    ring: "border-emerald-500 text-emerald-600",
    icon: "text-emerald-600",
    label: "text-slate-800",
  },
  current: {
    ring: "border-cyan-500 text-cyan-600",
    icon: "text-cyan-600",
    label: "text-slate-800",
  },
  pending: {
    ring: "border-slate-200 text-slate-300",
    icon: "text-slate-300",
    label: "text-slate-400",
  },
  rejected: {
    ring: "border-rose-500 text-rose-500",
    icon: "text-rose-500",
    label: "text-slate-800",
  },
  withdrawn: {
    ring: "border-slate-300 text-slate-400",
    icon: "text-slate-400",
    label: "text-slate-400",
  },
};

function WorkflowStepIndicator({
  step,
  isLast,
}: {
  step: WorkflowStep;
  isLast: boolean;
}) {
  const style = workflowStepStyles[step.status];
  const Icon =
    step.status === "done"
      ? CheckCircle2
      : step.status === "rejected"
        ? AlertTriangle
        : step.status === "withdrawn"
          ? CircleMinus
          : Clock3;

  return (
    <div className="flex min-w-0 flex-1 items-start">
      <div className="flex min-w-[92px] flex-1 flex-col items-center text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ${style.ring}`}
        >
          <Icon size={18} />
        </div>
        <p className={`mt-2 text-[11px] font-bold ${style.label}`}>
          {step.label}
        </p>
        <p className="mt-0.5 text-[10px] font-medium text-slate-500">
          {step.date}
        </p>
      </div>
      {!isLast && (
        <ArrowRight size={18} className="mt-4 shrink-0 text-slate-300" />
      )}
    </div>
  );
}

function ApplicationDetailsView({
  application,
  onBack,
  backLabel = "Back to Applications",
  readOnly = false,
}: {
  application: ApplicationRow;
  onBack: () => void;
  backLabel?: string;
  readOnly?: boolean;
}) {
  const detail = applicationDetails[application.id] ?? applicationDetails.tcs;
  const [notes, setNotes] = useState<{ text: string; date: string }[]>([]);
  const [noteDraft, setNoteDraft] = useState("");

  const saveNote = () => {
    if (!noteDraft.trim()) {
      return;
    }

    setNotes((current) => [
      { text: noteDraft.trim(), date: "Just now" },
      ...current,
    ]);
    setNoteDraft("");
  };

  return (
    <div className="space-y-3 pb-5 text-slate-800">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-cyan-500"
        >
          <ArrowLeft size={15} />
          {backLabel}
        </button>
        {!readOnly && (
          <button
            type="button"
            className="h-9 shrink-0 rounded-md border border-rose-200 px-4 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
          >
            Withdraw Application
          </button>
        )}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <ApplicationLogo application={application} />
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                {application.companyName}
              </h1>
              <p className="mt-1 text-sm text-slate-600">{application.role}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {application.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BriefcaseBusiness size={14} className="text-slate-400" />
                  Full Time
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" />
                  {application.ctc}
                </span>
              </div>
            </div>
          </div>
          <ApplicationStatus status={application.status} />
        </div>
        <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          Applied on {application.appliedOn} · Last{" "}
          {application.updated.toLowerCase()}
        </p>
      </section>

      <section className="rounded-lg border border-cyan-100 bg-cyan-50/60 px-4 py-3 text-xs text-cyan-800 sm:px-5">
        <p className="font-semibold">Next step: {application.nextStep}</p>
        <p className="mt-1 text-cyan-700">{application.nextDate}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
          Job Description
        </h2>
        <p className="mt-3 text-xs leading-5 text-slate-600">
          {detail.jobDescription}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold text-cyan-600">
              Responsibilities
            </h3>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
              {detail.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-cyan-600">
              Eligibility &amp; Skills
            </h3>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-slate-600">
              {detail.eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-bold text-slate-800 sm:text-base">
          Hiring Workflow
        </h2>
        <div className="mt-5 overflow-x-auto pb-1">
          <div className="flex min-w-[560px] items-start justify-between gap-1 px-1">
            {detail.workflow.map((step, index) => (
              <WorkflowStepIndicator
                key={step.label}
                step={step}
                isLast={index === detail.workflow.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            Documents
          </h2>
          <div className="mt-3 divide-y divide-slate-100">
            {detail.documents.map((document) => (
              <div
                key={document.name}
                className="flex items-center gap-2.5 py-2.5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
                  <FileText size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-slate-700">
                    {document.name}
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    {document.size}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={`Download ${document.name}`}
                  title={`Download ${document.name}`}
                  className="text-slate-400 transition hover:text-cyan-600"
                >
                  <Download size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {!readOnly && (
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Notes
            </h2>
            <div className="mt-3 space-y-2">
              {notes.length === 0 && (
                <p className="text-[11px] text-slate-400">
                  No notes added yet.
                </p>
              )}
              {notes.map((note, index) => (
                <div
                  key={`${note.date}-${index}`}
                  className="rounded-md bg-slate-50/80 px-3 py-2 text-[11px] text-slate-600"
                >
                  <p>{note.text}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{note.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Add a personal note..."
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
              />
              <button
                type="button"
                onClick={saveNote}
                className="h-9 shrink-0 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
              >
                Save
              </button>
            </div>
          </section>
        )}

        {readOnly && (
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Placement Cell Notes
            </h2>
            <p className="mt-3 text-[11px] text-slate-400">
              No notes recorded for this application yet.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{description}</p>
    </div>
  );
}

function JobFilter({
  options,
  value,
  onChange,
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`relative block min-w-0 ${className}`}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-xs font-medium text-slate-700 outline-none transition hover:border-cyan-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </label>
  );
}

function CompanyLogo({
  job,
  large = false,
}: {
  job: JobListing;
  large?: boolean;
}) {
  const tone =
    job.company === "TCS"
      ? "text-pink-500"
      : job.company === "Infosys"
        ? "text-blue-500"
        : job.company === "Zoho"
          ? "text-emerald-500"
          : job.company === "Wipro"
            ? "text-blue-700"
            : job.company === "Accenture"
              ? "text-slate-800"
              : job.company === "Cognizant"
                ? "text-slate-500"
                : "text-blue-700";
  const size = large ? "h-28 w-28 text-3xl" : "h-16 w-16 text-[11px]";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white font-bold ${size} ${tone}`}
    >
      {job.logo}
    </div>
  );
}

function SkillChips({ skills }: { skills: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-medium text-slate-600"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function JobTableRow({ job, onOpen }: { job: JobListing; onOpen: () => void }) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone =
    job.match >= 78
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  return (
    <div
      role="row"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      className="grid min-w-[1050px] cursor-pointer grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs transition hover:bg-cyan-50/30 focus:bg-cyan-50/30 focus:outline-none sm:px-5"
    >
      <div role="cell" className="flex min-w-0 items-center gap-4">
        <CompanyLogo job={job} />
        <span className="min-w-0 font-semibold leading-5 text-slate-800">
          {job.companyName}
        </span>
      </div>
      <div role="cell" className="min-w-0">
        <p className="truncate font-semibold text-slate-800">{job.role}</p>
        <SkillChips skills={job.skills} />
      </div>
      <div role="cell" className="flex items-center gap-2 text-slate-700">
        <MapPin size={15} className="shrink-0 text-slate-500" />
        {job.location}
      </div>
      <div role="cell" className="font-medium text-slate-800">
        {job.ctc}
      </div>
      <div role="cell">
        <p className="flex items-center gap-2 whitespace-nowrap font-medium text-slate-700">
          <CalendarDays size={15} className="text-slate-500" />
          {job.applyBy}
        </p>
        <p className="mt-2 text-[10px] font-semibold text-rose-500">
          {job.daysLeft} days left
        </p>
      </div>
      <div role="cell">
        <p className={`text-lg font-bold leading-none ${matchTone}`}>
          {job.match}%
        </p>
        <span
          className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${badgeTone}`}
        >
          {job.matchLabel}
        </span>
      </div>
      <button
        type="button"
        aria-label={`View ${job.companyName} ${job.role}`}
        title={`View ${job.companyName} ${job.role}`}
        className="flex items-center justify-end text-cyan-500 transition hover:text-cyan-700"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

function JobMobileCard({
  job,
  onOpen,
}: {
  job: JobListing;
  onOpen: () => void;
}) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone =
    job.match >= 78
      ? "bg-emerald-50 text-emerald-600"
      : "bg-amber-50 text-amber-600";

  return (
    <section
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen();
      }}
      tabIndex={0}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 focus:border-cyan-400 focus:outline-none"
    >
      <div className="flex items-start gap-3">
        <CompanyLogo job={job} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-slate-500">
            {job.companyName}
          </p>
          <h2 className="mt-1 text-sm font-bold text-slate-800">{job.role}</h2>
          <SkillChips skills={job.skills} />
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold leading-none ${matchTone}`}>
            {job.match}%
          </p>
          <span
            className={`mt-2 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${badgeTone}`}
          >
            {job.matchLabel}
          </span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {job.location}
        </span>
        <span className="font-semibold text-slate-800">{job.ctc}</span>
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} />
          {job.applyBy}
        </span>
        <span className="font-semibold text-rose-500">
          {job.daysLeft} days left
        </span>
      </div>
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-cyan-500 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
      >
        View Job <ChevronRight size={15} />
      </button>
    </section>
  );
}

export function StudentJobs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    company: "All Companies",
    role: "All Roles",
    location: "All Locations",
    type: "All Job Types",
    sort: "Sort by: Newest",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <JobFilter
            options={jobFilterOptions.company}
            value={filters.company}
            onChange={(value) => updateFilter("company", value)}
          />
          <JobFilter
            options={jobFilterOptions.role}
            value={filters.role}
            onChange={(value) => updateFilter("role", value)}
          />
          <JobFilter
            options={jobFilterOptions.location}
            value={filters.location}
            onChange={(value) => updateFilter("location", value)}
          />
          <JobFilter
            options={jobFilterOptions.type}
            value={filters.type}
            onChange={(value) => updateFilter("type", value)}
          />
        </div>
        <JobFilter
          className="w-full sm:w-44 lg:w-44"
          options={["Sort by: Newest", "Sort by: Match", "Sort by: Deadline"]}
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
        />
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <div
          role="table"
          aria-label="Available jobs"
          className="min-w-[1050px]"
        >
          <div
            role="row"
            className="grid grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] gap-4 rounded-t-xl bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
          >
            <span>Company</span>
            <span>Job Role</span>
            <span>Location</span>
            <span>CTC</span>
            <span>Apply By</span>
            <span>Match</span>
            <span />
          </div>
          {jobListings.map((job) => (
            <JobTableRow
              key={job.company}
              job={job}
              onOpen={() => navigate(`/jobs/${job.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {jobListings.map((job) => (
          <JobMobileCard
            key={job.company}
            job={job}
            onOpen={() => navigate(`/jobs/${job.id}`)}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <span>Showing 1 to 8 of 24 jobs</span>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage(6)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 6 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}
          >
            6
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, 6))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}

function DetailMeta({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
      <Icon size={14} className="text-slate-500" />
      {children}
    </span>
  );
}

function SelectionProcess() {
  const stages = [
    {
      title: "Online Test",
      description: "Aptitude, Coding & Technical",
      icon: FileText,
    },
    {
      title: "Technical Interview",
      description: "Core CS & Problem Solving",
      icon: BriefcaseBusiness,
    },
    {
      title: "HR Interview",
      description: "Communication & Behavioral",
      icon: UserRound,
    },
    {
      title: "Group Discussion",
      description: "Topics on Current Trends",
      icon: Megaphone,
    },
    {
      title: "Final Interview",
      description: "Managerial Round",
      icon: Building2,
    },
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Selection Process
      </h2>
      <div className="relative mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-2">
        <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-cyan-100 sm:block" />
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.title}
              className="relative z-10 flex min-w-0 flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 ring-8 ring-white">
                <Icon size={19} />
              </span>
              <span className="mt-3 text-[11px] font-bold text-slate-700">
                {index + 1}
              </span>
              <h3 className="mt-2 text-[11px] font-bold leading-4 text-slate-800">
                {stage.title}
              </h3>
              <p className="mt-1 max-w-[110px] text-[10px] leading-4 text-slate-500">
                {stage.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[10px] leading-4 text-cyan-700 sm:text-xs">
        <Clock3 size={15} className="mt-0.5 shrink-0" />
        The selection process may vary slightly depending on the role and
        location.
      </div>
    </DetailCard>
  );
}

function DetailSkills() {
  const skills = [
    "Data Structures",
    "Algorithms",
    "Problem Solving",
    "Java / Python",
    "SQL",
    "OOPs Concepts",
    "DBMS",
    "Computer Networks",
    "Operating Systems",
    "Git",
    "Communication",
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Skills They Are Looking For
      </h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-600 sm:text-[11px]"
          >
            {skill}
          </span>
        ))}
      </div>
    </DetailCard>
  );
}

function ImproveSkills({ job }: { job: JobListing }) {
  const feedback =
    placementFeedbackByCompany[job.company] ?? defaultPlacementFeedback;

  return (
    <div className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            Skills You May Want to Improve
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            AI-selected focus areas for the {job.role} role.
          </p>
        </div>
        <span className="rounded-md bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-500">
          {feedback.toughRoundShare}% found this round tough
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {feedback.improvementSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-start gap-2 rounded-md border border-slate-100 bg-slate-50/80 p-2.5 text-xs text-slate-700"
          >
            <span className="rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">
              Focus
            </span>
            <span className="leading-4">{skill}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-start gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-600">
            <BrainCircuit size={16} />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-800">
              Technical round: ways to cope
            </p>
            <p className="mt-1 text-[10px] leading-4 text-slate-500">
              {feedback.toughRoundShare}% of students in previous drives found
              the {feedback.focusStage.toLowerCase()} challenging. These habits
              helped them stay composed.
            </p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {feedback.copingStrategies.map((strategy, index) => (
            <div
              key={strategy}
              className="flex items-start gap-2 rounded-md bg-violet-50/60 px-3 py-2.5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                {index + 1}
              </span>
              <p className="text-[10px] leading-4 text-slate-700">{strategy}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Explore Courses to Improve <ChevronRight size={14} />
      </button>
    </div>
  );
}

function AboutRole({ job }: { job: JobListing }) {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        About the Role
      </h2>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        You will be part of a fast-paced team at {job.companyName} working on
        real-world problems. You will get opportunities to work with new
        technologies and build scalable software solutions.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-5">
        <DetailMeta icon={BriefcaseBusiness}>Software Engineer</DetailMeta>
        <DetailMeta icon={Building2}>Work from Office</DetailMeta>
        <DetailMeta icon={Clock3}>Fresher</DetailMeta>
        <DetailMeta icon={FileText}>{job.ctc}</DetailMeta>
        <DetailMeta icon={UserRound}>2 Years</DetailMeta>
      </div>
    </DetailCard>
  );
}

function MatchCard({ job }: { job: JobListing }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (job.match / 100) * circumference;

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Your Match
      </h2>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#e2f6ef"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#16b979"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">
            {job.match}%
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-600">Great Match! 🎉</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-600">
            Your profile aligns very well with this job.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2.5 text-[11px] text-slate-700">
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          Your CGPA (8.72) is eligible (Min. 7.0)
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          Your branch (CSE) is eligible
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
          You have 8 out of 10 required skills
        </p>
        <p className="flex items-start gap-2">
          <AlertTriangle size={15} className="shrink-0 text-rose-500" />
          You are missing 2 preferred skills
        </p>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Improve Your Match <ChevronRight size={14} />
      </button>
    </DetailCard>
  );
}

function InsightSignal({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md ${tone}`}
      >
        <Icon size={15} />
      </div>
      <p className="mt-2 text-[10px] font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}

function AiPlacementInsights({ job }: { job: JobListing }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const feedback =
    placementFeedbackByCompany[job.company] ?? defaultPlacementFeedback;
  const coreSkills = job.skills.filter((skill) => !skill.startsWith("+"));
  const matchedSkills = coreSkills.filter((skill) =>
    studentProfileSnapshot.skills.some((profileSkill) => {
      const normalizedSkill = skill.toLowerCase();
      const normalizedProfileSkill = profileSkill.toLowerCase();
      return (
        normalizedSkill.includes(normalizedProfileSkill) ||
        normalizedProfileSkill.includes(normalizedSkill)
      );
    }),
  );
  const profileCoverage = Math.round(
    (matchedSkills.length / Math.max(coreSkills.length, 1)) * 100,
  );
  const unmatchedSkill = coreSkills.find(
    (skill) => !matchedSkills.includes(skill),
  );

  const refreshAnalysis = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 650);
  };

  return (
    <DetailCard className="relative overflow-hidden border-cyan-100 bg-gradient-to-br from-white via-white to-cyan-50/70 p-0">
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-cyan-100/50 blur-3xl" />
      <div className="relative p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-700">
                <Sparkles size={12} />
                Lumina's AI Placement Insights
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                <BrainCircuit size={13} className="text-cyan-500" />
                High confidence
              </span>
            </div>
            <h2 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">
              Your preparation plan for {job.company}
            </h2>
            <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-600 sm:text-xs">
              Personalized from your profile, this role&apos;s skill
              requirements, and feedback from students who completed previous{" "}
              {job.company} placement drives.
            </p>
          </div>
          <button
            type="button"
            onClick={refreshAnalysis}
            disabled={isRefreshing}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-md border border-cyan-200 bg-white px-3 py-2 text-[10px] font-semibold text-cyan-700 transition hover:border-cyan-400 hover:bg-cyan-50 disabled:cursor-wait disabled:opacity-70"
          >
            <RefreshCw
              size={13}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Refreshing..." : "Refresh analysis"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 xl:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-lg border border-cyan-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <Lightbulb size={18} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">
                  Personalized recommendation
                </p>
                <p className="mt-1.5 text-xs font-semibold leading-5 text-slate-800">
                  Focus first on {feedback.commonChallenge.toLowerCase()} — it
                  is the most repeated challenge in the previous drive feedback.
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-cyan-50/70 px-3 py-2.5 text-[11px] leading-5 text-cyan-800">
              Your {studentProfileSnapshot.branch} profile and{" "}
              {studentProfileSnapshot.cgpa} CGPA are a strong starting point.
              You already align with {matchedSkills.length} of{" "}
              {coreSkills.length} listed core skills
              {unmatchedSkill ? `; revise ${unmatchedSkill} next.` : "."}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <InsightSignal
                icon={Target}
                label="Profile fit"
                value={`${job.match}%`}
                tone="bg-emerald-50 text-emerald-600"
              />
              <InsightSignal
                icon={CheckCircle2}
                label="Skill coverage"
                value={`${profileCoverage}%`}
                tone="bg-violet-50 text-violet-600"
              />
              <InsightSignal
                icon={TrendingUp}
                label="Projects ready"
                value={`${studentProfileSnapshot.projectCount} projects`}
                tone="bg-amber-50 text-amber-600"
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  What past drives tell us
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  {feedback.reviewedStudents} student reviews analysed
                </p>
              </div>
              <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
                {feedback.averageRating}/5 useful
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2.5">
                <TrendingUp size={15} className="shrink-0 text-cyan-500" />
                <span className="text-[10px] text-slate-500">
                  Highest-impact stage
                </span>
                <span className="ml-auto text-right text-[10px] font-bold text-slate-700">
                  {feedback.focusStage}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2.5">
                <Target size={15} className="shrink-0 text-rose-500" />
                <span className="text-[10px] text-slate-500">Common gap</span>
                <span className="ml-auto text-right text-[10px] font-bold text-slate-700">
                  {feedback.commonChallenge}
                </span>
              </div>
            </div>
            <p className="mt-3 text-[10px] leading-4 text-slate-600">
              <span className="font-bold text-slate-700">
                Successful pattern:{" "}
              </span>
              {feedback.successfulPattern}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-[10px] leading-4 text-amber-800 sm:text-xs">
          <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" />
          <span>
            <span className="font-bold">Best next step: </span>
            {feedback.nextAction}
          </span>
        </div>
        <ImproveSkills job={job} />
      </div>
    </DetailCard>
  );
}

function DocumentsCard() {
  const documents = [
    { name: "Resume (PDF)", uploaded: true },
    { name: "Academic Transcripts", uploaded: true },
    { name: "Government ID Proof", uploaded: true },
    { name: "Passport Size Photo", uploaded: false },
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Documents Required
      </h2>
      <div className="mt-4 space-y-3">
        {documents.map((document) => (
          <div
            key={document.name}
            className="flex items-center gap-2 text-[11px] text-slate-700"
          >
            <span
              className={
                document.uploaded ? "text-emerald-500" : "text-rose-500"
              }
            >
              {document.uploaded ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertTriangle size={15} />
              )}
            </span>
            <span className="min-w-0 flex-1">{document.name}</span>
            <span
              className={`text-[10px] font-semibold ${document.uploaded ? "text-emerald-500" : "text-rose-500"}`}
            >
              {document.uploaded ? "Uploaded" : "Not Uploaded"}
            </span>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

function TipsCard() {
  const tips = [
    "Complete your profile for better match",
    "Add more skills to increase visibility",
    "Practice aptitude and coding questions",
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Tips Before Applying
      </h2>
      <div className="mt-4 space-y-3">
        {tips.map((tip) => (
          <p
            key={tip}
            className="flex items-start gap-2 text-[11px] leading-4 text-slate-700"
          >
            <span className="mt-0.5 text-cyan-500">✧</span>
            {tip}
          </p>
        ))}
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        Go to My Profile <ChevronRight size={14} />
      </button>
    </DetailCard>
  );
}

function ReviewsCard() {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Reviews from Students
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-2xl font-bold text-slate-800">4.2</span>
        <span className="text-sm tracking-wide text-orange-400">
          ★★★★<span className="text-slate-200">★</span>
        </span>
        <span className="text-[10px] text-slate-500">(320 Reviews)</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-600">
        The interview process is smooth and the work culture is great.
      </p>
      <p className="mt-2 text-[10px] font-medium text-slate-500">– Anonymous</p>
    </DetailCard>
  );
}

export function StudentJobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const job = jobListings.find((item) => item.id === jobId) ?? jobListings[0];
  const tabs = [
    "Overview",
    "Job Description",
    "Eligibility",
    "About Company",
    "Reviews",
  ];

  return (
    <div className="space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-cyan-600"
        >
          <ArrowLeft size={15} /> Back to Jobs
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold ${saved ? "border-cyan-300 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-700"}`}
          >
            <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
            {saved ? "Saved" : "Save Job"}
          </button>
          <button
            type="button"
            aria-label="Share job"
            title="Share job"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>

      <section className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="flex items-center gap-5 p-4 sm:p-6">
          <CompanyLogo job={job} large />
          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {job.company} – {job.role}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{job.companyName}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <DetailMeta icon={BriefcaseBusiness}>Full Time</DetailMeta>
              <DetailMeta icon={MapPin}>{job.location}</DetailMeta>
              <DetailMeta icon={FileText}>{job.ctc}</DetailMeta>
              <DetailMeta icon={Clock3}>2026 Batch</DetailMeta>
            </div>
            <span className="mt-4 inline-flex rounded bg-cyan-50 px-2 py-1 text-[10px] font-semibold text-cyan-600">
              Engineering
            </span>
          </div>
        </div>
        <aside className="border-t border-slate-100 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold text-slate-700">
            Application Deadline
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <CalendarDays size={15} className="text-slate-500" />
            {job.applyBy}
          </p>
          <p className="mt-3 text-xs font-bold text-rose-500">
            {job.daysLeft} Days left
          </p>
          <button
            type="button"
            className="mt-4 h-9 w-full rounded-md bg-cyan-500 text-xs font-semibold text-white transition hover:bg-cyan-600"
          >
            Apply Now
          </button>
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            <Bookmark size={14} /> Save for Later
          </button>
        </aside>
      </section>

      <nav
        className="flex overflow-x-auto border-b border-slate-200 bg-white"
        aria-label="Job details sections"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium transition first:pl-2 sm:px-5 ${activeTab === tab ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <AiPlacementInsights job={job} />

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_275px]">
        <main className="space-y-3">
          <SelectionProcess />
          <DetailSkills />
          <AboutRole job={job} />
        </main>
        <aside className="space-y-3">
          <MatchCard job={job} />
          <DocumentsCard />
          <TipsCard />
          <ReviewsCard />
        </aside>
      </div>
    </div>
  );
}

const applicationSummary = [
  {
    label: "Total Applications",
    value: "12",
    icon: BriefcaseBusiness,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    label: "Shortlisted",
    value: "4",
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "In Process",
    value: "3",
    icon: Clock3,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    label: "Rejected",
    value: "3",
    icon: AlertTriangle,
    tone: "bg-rose-50 text-rose-600",
  },
  {
    label: "Offer Received",
    value: "1",
    icon: Trophy,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    label: "Withdrawn",
    value: "1",
    icon: CircleMinus,
    tone: "bg-slate-100 text-slate-600",
  },
];

function ApplicationLogo({ application }: { application: ApplicationRow }) {
  const tone =
    application.company === "TCS"
      ? "text-pink-500"
      : application.company === "Infosys"
        ? "text-blue-500"
        : application.company === "Zoho"
          ? "text-emerald-500"
          : application.company === "Wipro"
            ? "text-blue-700"
            : application.company === "Accenture"
              ? "text-slate-800"
              : "text-slate-500";

  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white text-[11px] font-bold ${tone}`}
    >
      {application.logo}
    </div>
  );
}

function ApplicationStatus({ status }: { status: ApplicationStatus }) {
  const tone = {
    Shortlisted: "bg-emerald-50 text-emerald-600",
    "In Process": "bg-blue-50 text-blue-600",
    Rejected: "bg-rose-50 text-rose-600",
    Offer: "bg-emerald-50 text-emerald-600",
    Withdrawn: "bg-slate-100 text-slate-600",
  }[status];

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${tone}`}
    >
      {status}
    </span>
  );
}

function ApplicationTableRow({
  application,
  onView,
}: {
  application: ApplicationRow;
  onView: (id: string) => void;
}) {
  const NextIcon =
    application.status === "Rejected"
      ? AlertTriangle
      : application.status === "Withdrawn"
        ? CircleMinus
        : application.status === "Offer"
          ? CheckCircle2
          : CalendarDays;
  const nextTone =
    application.status === "Rejected"
      ? "text-rose-500"
      : application.status === "Withdrawn"
        ? "text-slate-400"
        : application.status === "Offer"
          ? "text-emerald-500"
          : "text-blue-500";

  return (
    <div
      role="row"
      className="grid min-w-[1020px] grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs sm:px-5"
    >
      <div role="cell" className="flex min-w-0 items-center gap-4">
        <ApplicationLogo application={application} />
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-800">
            {application.companyName}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700">
            {application.role}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {application.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <BriefcaseBusiness size={12} />
              Full Time
            </span>
            <span className="inline-flex items-center gap-1">
              <FileText size={12} />
              {application.ctc}
            </span>
          </div>
        </div>
      </div>
      <div role="cell" className="font-semibold text-slate-700">
        {application.appliedOn}
      </div>
      <div role="cell">
        <ApplicationStatus status={application.status} />
        <p className="mt-2 text-[10px] text-slate-500">{application.updated}</p>
      </div>
      <div role="cell">
        <p className={`flex items-center gap-2 font-semibold ${nextTone}`}>
          <NextIcon size={15} />
          {application.nextStep}
        </p>
        <p className="mt-1 text-[11px] text-slate-700">
          {application.nextDate}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onView(application.id)}
        className="h-8 rounded-md border border-cyan-300 px-2 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50"
      >
        {application.status === "Offer" ? "View Offer" : "View Details"}
      </button>
    </div>
  );
}

function ApplicationMobileCard({
  application,
  onView,
}: {
  application: ApplicationRow;
  onView: (id: string) => void;
}) {
  const NextIcon =
    application.status === "Rejected"
      ? AlertTriangle
      : application.status === "Withdrawn"
        ? CircleMinus
        : application.status === "Offer"
          ? CheckCircle2
          : CalendarDays;
  const nextTone =
    application.status === "Rejected"
      ? "text-rose-500"
      : application.status === "Withdrawn"
        ? "text-slate-400"
        : application.status === "Offer"
          ? "text-emerald-500"
          : "text-blue-500";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <ApplicationLogo application={application} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">
            {application.companyName}
          </p>
          <p className="mt-1 text-xs text-slate-600">{application.role}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} />
              {application.location}
            </span>
            <span>{application.ctc}</span>
          </div>
        </div>
        <ApplicationStatus status={application.status} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px]">
        <div>
          <p className="text-[10px] text-slate-500">Applied On</p>
          <p className="mt-1 font-semibold text-slate-700">
            {application.appliedOn}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-500">Updated</p>
          <p className="mt-1 font-semibold text-slate-700">
            {application.updated.replace("Updated on ", "")}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] text-slate-500">Next Step / Update</p>
          <p
            className={`mt-1 flex items-center gap-1.5 font-semibold ${nextTone}`}
          >
            <NextIcon size={14} />
            {application.nextStep}
          </p>
          <p className="mt-1 text-slate-600">{application.nextDate}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onView(application.id)}
        className="mt-4 h-9 w-full rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
      >
        {application.status === "Offer" ? "View Offer" : "View Details"}
      </button>
    </section>
  );
}

/**
 * ApplicationsBoard renders the full applications experience: summary cards,
 * status tabs, search, table/cards and the drill-down detail view. It is
 * shared by the student's own "My Applications" page and the TPO's
 * per-student application view so both stay visually identical.
 */
function ApplicationsBoard({ readOnly = false }: { readOnly?: boolean }) {
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);
  const activeTabDetails = applicationTabs.find((tab) =>
    activeTab === "All" ? !tab.status : tab.status === activeTab,
  );
  const filteredApplications = applicationRows.filter((application) => {
    const matchesTab = activeTab === "All" || application.status === activeTab;
    const searchText =
      `${application.companyName} ${application.role}`.toLowerCase();
    return matchesTab && searchText.includes(search.toLowerCase());
  });
  const totalForTab = activeTabDetails?.count ?? filteredApplications.length;
  const selectedApplication = applicationRows.find(
    (application) => application.id === selectedApplicationId,
  );

  if (selectedApplication) {
    return (
      <ApplicationDetailsView
        application={selectedApplication}
        onBack={() => setSelectedApplicationId(null)}
        readOnly={readOnly}
      />
    );
  }

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {applicationSummary.map((summary) => {
          const Icon = summary.icon;

          return (
            <section
              key={summary.label}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${summary.tone}`}
              >
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">
                  {summary.label}
                </p>
                <p className="mt-1 text-2xl font-bold leading-none text-slate-800">
                  {summary.value}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {applicationTabs.map((tab) => {
              const tabKey = tab.status ?? "All";
              const active = activeTab === tabKey;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => {
                    setActiveTab(tabKey);
                    setCurrentPage(1);
                  }}
                  className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold transition sm:px-4 ${active ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <label className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by company or role..."
                className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveTab("All");
                setCurrentPage(1);
              }}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Filter size={15} /> Filters
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <div
            role="table"
            aria-label="Applications"
            className="min-w-[1020px]"
          >
            <div
              role="row"
              className="grid grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] gap-4 bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
            >
              <span>Company &amp; Role</span>
              <span>Applied On</span>
              <span>Current Status</span>
              <span>Next Step / Update</span>
              <span>Action</span>
            </div>
            {filteredApplications.map((application) => (
              <ApplicationTableRow
                key={application.id}
                application={application}
                onView={setSelectedApplicationId}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 p-3 lg:hidden">
          {filteredApplications.map((application) => (
            <ApplicationMobileCard
              key={application.id}
              application={application}
              onView={setSelectedApplicationId}
            />
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <p className="px-4 py-10 text-center text-xs text-slate-500">
            No applications match your filters.
          </p>
        )}
      </section>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <span>
          Showing {filteredApplications.length ? 1 : 0} to{" "}
          {filteredApplications.length} of{" "}
          {search || activeTab !== "All"
            ? filteredApplications.length
            : totalForTab}{" "}
          applications
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 1 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 2 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}
          >
            2
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, 2))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function StudentApplications() {
  return <ApplicationsBoard />;
}

function ProfileProgressRing({
  value,
  label,
  color = "#06b6d4",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
      role="img"
      aria-label={`${label}: ${value} percent`}
    >
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="#eef2f7"
          strokeWidth="8"
        />
        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-slate-800">
          {value}%
        </span>
        <span className="mt-1 text-[10px] font-medium text-slate-500">
          complete
        </span>
      </div>
    </div>
  );
}

function ProfileChecklist({ items }: { items: ProfileChecklistItem[] }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-2 text-[10px] sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.status === "done" ? CheckCircle2 : AlertTriangle;

        return (
          <div key={item.label} className="flex min-w-0 items-center gap-2">
            <Icon
              size={14}
              className={
                item.status === "done"
                  ? "shrink-0 text-emerald-500"
                  : "shrink-0 text-amber-500"
              }
            />
            <span className="truncate text-slate-700">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProfileCompletionCard({ onComplete }: { onComplete: () => void }) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Profile Completion
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            Complete your profile to improve job matches.
          </p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
          <UserRound size={16} />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-4 sm:gap-5">
        <ProfileProgressRing
          value={studentProfileData.profileCompletion}
          label="Profile Completion"
        />
        <p className="min-w-0 text-[10px] leading-4 text-slate-600">
          Your profile is almost complete. Add a certification to reach 100%.
        </p>
      </div>
      <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">
            Profile checklist
          </h3>
          <span className="text-[10px] font-semibold text-cyan-600">
            {studentProfileData.profileCompletion}% complete
          </span>
        </div>
        <ProfileChecklist items={profileCompletionChecklist} />
      </div>
      <button
        type="button"
        onClick={onComplete}
        className="mt-4 inline-flex h-9 items-center justify-center gap-1.5 self-start rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"
      >
        Complete Profile
        <ChevronRight size={14} />
      </button>
    </section>
  );
}

function PlacementReadinessCard() {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">
            Placement Readiness
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            See how prepared you are for placement drives.
          </p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <BriefcaseBusiness size={16} />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-4 sm:gap-5">
        <ProfileProgressRing
          value={82}
          label="Placement Readiness"
          color="#45c484"
        />
        <p className="min-w-0 text-[10px] font-semibold leading-4 text-emerald-600">
          Good — you are doing great!
        </p>
      </div>
      <div className="mt-5 flex-1 border-t border-slate-100 pt-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">
            Readiness checklist
          </h3>
          <span className="text-[10px] font-semibold text-emerald-600">
            82 / 100
          </span>
        </div>
        <ProfileChecklist items={placementReadinessChecklist} />
      </div>
    </section>
  );
}

export function StudentProfile() {
  const [notice, setNotice] = useState("");

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="My Profile"
          description="Keep your personal, academic, and placement details up to date."
        />
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-2 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 size={14} />
            {studentProfileData.profileCompletion}% complete
          </span>
          <button
            type="button"
            onClick={() =>
              setNotice("Profile editing will be available in the next update.")
            }
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            <Pencil size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {notice && (
        <p
          role="status"
          className="rounded-lg border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700"
        >
          {notice}
        </p>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
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
        </div>
      </section>

      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <ProfileCompletionCard
          onComplete={() =>
            setNotice("Profile editing will be available in the next update.")
          }
        />
        <PlacementReadinessCard />
      </div>

      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Keep your personal details and academic progress current for placement eligibility."
        icon={GraduationCap}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <BasicDetailsCard />
            <ResumeCard onNotice={setNotice} />
          </div>
          <AcademicPerformanceCard />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Placement Profile"
        description="Build a stronger profile with the skills, experience, and documents recruiters look for."
        icon={BriefcaseBusiness}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SkillsCard />
            <InternshipsCard />
          </div>
          <ProjectsCard />
        </div>
      </ProfileGroup>

      <ProfileGroup
        title="Activities & Recognition"
        description="Showcase the achievements and involvement that make your profile stand out."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard />
          <SportsPrizesCard />
          <AwardsCard />
        </div>
      </ProfileGroup>
    </div>
  );
}

function ProfileGroup({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-sm sm:p-4">
      <div className="flex items-start gap-3 px-1 sm:px-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-cyan-600 shadow-sm">
          <Icon size={18} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            {title}
          </h2>
          <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function BasicDetailsCard() {
  return (
    <ProfileSection title="Basic Details" icon={UserRound}>
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <InfoItem
          icon={FileText}
          label="Registration Number"
          value={studentProfileData.registrationNumber}
        />
        <InfoItem
          icon={Building2}
          label="Department"
          value={studentProfileData.department}
        />
        <InfoItem
          icon={GraduationCap}
          label="Program"
          value={studentProfileData.program}
        />
        <InfoItem
          icon={CalendarDays}
          label="Batch / Semester"
          value={`${studentProfileData.batch} · ${studentProfileData.semester}`}
        />
        <InfoItem icon={Mail} label="Email" value={studentProfileData.email} />
        <InfoItem icon={Phone} label="Phone" value={studentProfileData.phone} />
        <InfoItem
          icon={CalendarDays}
          label="Date of Birth"
          value={studentProfileData.dateOfBirth}
        />
        <InfoItem
          icon={MapPin}
          label="Location"
          value={studentProfileData.location}
        />
      </div>
    </ProfileSection>
  );
}

function AcademicPerformanceCard() {
  return (
    <ProfileSection
      title="Academic Performance"
      icon={GraduationCap}
      className="h-full"
    >
      <div className="grid grid-cols-3 gap-2">
        <ProfileMetric
          label="CGPA"
          value={`${studentProfileData.cgpa} / 10`}
          tone="bg-cyan-50 text-cyan-600"
        />
        <ProfileMetric
          label="Attendance"
          value={studentProfileData.attendance}
          tone="bg-emerald-50 text-emerald-600"
        />
        <ProfileMetric
          label="Backlogs"
          value={studentProfileData.backlogs}
          tone="bg-amber-50 text-amber-600"
        />
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold text-slate-800">
              Semester performance
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              Academic performance and backlog history by semester
            </p>
          </div>
          <span className="text-[10px] font-medium text-emerald-600">
            Improving trend
          </span>
        </div>
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
          {studentProfileData.semesterScores.map((semester) => (
            <div key={semester.label} className="rounded-lg bg-slate-50/80 p-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-slate-700">
                  {semester.label}
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)_30px] sm:items-center">
                <span className="text-[9px] font-medium text-slate-500">
                  Academic
                </span>
                <div className="h-1.5 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{ width: `${semester.percentage}%` }}
                  />
                </div>
                <span className="text-right text-[10px] font-bold text-slate-700">
                  {semester.score}
                </span>
              </div>
              <div className="mt-1.5 grid gap-2 sm:grid-cols-[64px_minmax(0,1fr)_30px] sm:items-center">
                <span className="text-[9px] font-medium text-slate-500">
                  Backlogs
                </span>
                <div className="flex min-w-0 items-center">
                  <span
                    className={`text-[10px] font-semibold ${semester.backlogs === 0 ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {semester.backlogs === 0
                      ? "No backlogs"
                      : `${semester.backlogs} backlog${semester.backlogs === 1 ? "" : "s"}`}
                  </span>
                </div>
                <span className="text-right text-[10px] font-bold text-amber-600">
                  {semester.backlogs}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileSection>
  );
}

function SkillsCard() {
  const skillCount = studentProfileData.skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  return (
    <ProfileSection
      title="Skills"
      icon={CheckCircle2}
      action={
        <span className="text-[10px] font-medium text-slate-500">
          {skillCount} skills added
        </span>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {studentProfileData.skillGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
              {group.label}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-violet-50 px-2.5 py-1.5 text-[10px] font-semibold text-violet-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
}

function ProjectsCard() {
  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <FileText size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Projects
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Work that demonstrates your technical experience.
            </p>
          </div>
        </div>
        <span className="rounded-md bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-600">
          {studentProfileData.projects.length} projects
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {studentProfileData.projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg border border-slate-100 bg-slate-50/70 p-3"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  {project.title}
                </h3>
                <p className="mt-1 text-[10px] text-slate-500">
                  {project.type}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-cyan-600">
                View details <ChevronRight size={12} className="inline" />
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-600">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded bg-white px-2 py-1 text-[9px] font-medium text-slate-600"
                >
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

function InternshipsCard() {
  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Internships
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Your practical industry experience.
            </p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          {studentProfileData.internships.length} completed
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {studentProfileData.internships.map((internship) => (
          <article
            key={`${internship.company}-${internship.role}`}
            className="rounded-lg border border-slate-100 bg-slate-50/70 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  {internship.role}
                </h3>
                <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                  {internship.company}
                </p>
              </div>
              <span className="whitespace-nowrap text-[9px] font-medium text-slate-500">
                {internship.duration}
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-slate-600">
              {internship.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600">
              <CheckCircle2 size={11} />
              Verified experience
            </span>
          </article>
        ))}
      </div>
    </DetailCard>
  );
}

function ResumeCard({
  onNotice,
  readOnly = false,
}: {
  onNotice: (message: string) => void;
  readOnly?: boolean;
}) {
  return (
    <DetailCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <FileText size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Resume
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Your latest resume shared with recruiters.
            </p>
          </div>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          Ready to share
        </span>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-500">
          <FileText size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-800">
            {studentProfileData.resume.name}
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            PDF · {studentProfileData.resume.size} · Updated{" "}
            {studentProfileData.resume.updated}
          </p>
        </div>
        <CheckCircle2 size={17} className="shrink-0 text-emerald-500" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onNotice(`Opening ${studentProfileData.resume.name}.`)}
          className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
        >
          View Resume
        </button>
        {!readOnly && (
          <button
            type="button"
            onClick={() =>
              onNotice(
                "Resume update flow will be available in the next update.",
              )
            }
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600"
          >
            <Upload size={14} /> Update Resume
          </button>
        )}
        <button
          type="button"
          onClick={() => onNotice(`Opening ${studentProfileData.resume.name}.`)}
          className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
        >
          Download Resume
        </button>
      </div>
    </DetailCard>
  );
}

function SportsPrizesCard() {
  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
            <Trophy size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Sports &amp; Prizes
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Participation and achievements outside academics.
            </p>
          </div>
        </div>
        <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">
          {studentProfileData.sports.length} entries
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {studentProfileData.sports.map((sport) => (
          <div
            key={sport.title}
            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3"
          >
            <span className="mt-0.5 text-amber-500">
              <Trophy size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-800">
                  {sport.title}
                </p>
                <span className="text-[9px] font-medium text-slate-500">
                  {sport.period}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">
                {sport.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

function ExtracurricularsCard() {
  return (
    <DetailCard className="h-full">
      <div className="flex items-start gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
          <Megaphone size={18} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            Extra-curricular Activities
          </h2>
          <p className="mt-1 text-[10px] text-slate-500">
            Leadership, volunteering, and campus involvement.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {studentProfileData.extracurriculars.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3"
          >
            <span className="mt-0.5 text-violet-500">
              <Megaphone size={16} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {activity.title}
              </p>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">
                {activity.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

function AwardsCard() {
  return (
    <DetailCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-800 sm:text-base">
              Awards &amp; Recognition
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Honours that strengthen your placement profile.
            </p>
          </div>
        </div>
        <span className="rounded-md bg-cyan-50 px-2 py-1 text-[10px] font-bold text-cyan-600">
          {studentProfileData.awards.length} awards
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {studentProfileData.awards.map((award) => (
          <div
            key={award.title}
            className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-3"
          >
            <span className="mt-0.5 text-cyan-500">
              <CheckCircle2 size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-xs font-bold text-slate-800">
                  {award.title}
                </p>
                <span className="text-[9px] font-medium text-slate-500">
                  {award.year}
                </span>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">
                {award.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

function ProfileSection({
  title,
  icon: Icon,
  action,
  className = "",
  children,
}: {
  title: string;
  icon: React.ElementType;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <Icon size={16} />
          </span>
          <h2 className="text-sm font-bold text-slate-800 sm:text-base">
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ProfileChip({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600">
      <Icon size={12} className="text-slate-400" />
      {text}
    </span>
  );
}

function ProfileMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 p-2.5">
      <p className="text-[10px] font-medium text-slate-500">{label}</p>
      <p
        className={`mt-1 text-sm font-bold ${tone
          .split(" ")
          .filter((className) => className.startsWith("text-"))
          .join(" ")}`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 text-slate-400">
        {Icon && <Icon size={15} />}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-xs font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   TPO / PLACEMENT OFFICER - STUDENT DETAILS
   Read-only version of the student profile.
========================================================= */
export function StudentDetails() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      {/* Page Header */}
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

      {/* Student Header */}
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

      {/* Profile Completion + Placement Readiness */}
      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Profile Completion
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">
                Current student profile completion status.
              </p>
            </div>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
              <UserRound size={16} />
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4 sm:gap-5">
            <ProfileProgressRing
              value={studentProfileData.profileCompletion}
              label="Profile Completion"
            />

            <p className="text-[10px] leading-4 text-slate-600">
              Profile information available for placement review.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Placement Readiness
              </h2>
              <p className="mt-1 text-[10px] text-slate-500">
                Student readiness based on academic and profile information.
              </p>
            </div>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <BriefcaseBusiness size={16} />
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4 sm:gap-5">
            <ProfileProgressRing
              value={82}
              label="Placement Readiness"
              color="#45c484"
            />

            <p className="text-[10px] font-semibold leading-4 text-emerald-600">
              Current placement readiness
            </p>
          </div>
        </section>
      </div>

      {/* Basic Information & Academic Performance */}
      <ProfileGroup
        title="Basic Information & Academic Performance"
        description="Student personal details and academic progress."
        icon={GraduationCap}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <BasicDetailsCard />
            <ResumeCard onNotice={() => {}} readOnly />
          </div>

          <AcademicPerformanceCard />
        </div>
      </ProfileGroup>
      {/* Placement Profile */}
      <ProfileGroup
        title="Placement Profile"
        description="Skills, projects, internships and resume information."
        icon={BriefcaseBusiness}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-4">
            <SkillsCard />
            <InternshipsCard />
          </div>

          <ProjectsCard />
        </div>
      </ProfileGroup>

      {/* Activities & Recognition */}
      <ProfileGroup
        title="Activities & Recognition"
        description="Achievements and student involvement."
        icon={Trophy}
      >
        <div className="grid items-stretch gap-4 xl:grid-cols-3">
          <ExtracurricularsCard />
          <SportsPrizesCard />
          <AwardsCard />
        </div>
      </ProfileGroup>
    </div>
  );
}

export function StudentResume() {
  return (
    <div className="space-y-4 pb-5">
      <PageHeader
        title="Resume"
        description="Your resume is shared with eligible placement drives."
      />
      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
            <FileText size={25} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Resume_2026.pdf
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              PDF · Last updated Aug 28, 2026
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600">
          <CheckCircle2 size={16} /> Ready to share with recruiters
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            View Resume
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
          >
            <Upload size={14} /> Update Resume
          </button>
        </div>
      </section>
    </div>
  );
}

export function StudentAnnouncements() {
  const announcements = [
    {
      title: "TCS Campus Drive Registration Open",
      text: "Applications are open for eligible 2026 batch students.",
      date: "2 hours ago",
    },
    {
      title: "Resume submission deadline extended",
      text: "Update your resume before the next shortlisting round.",
      date: "Yesterday",
    },
    {
      title: "Placement orientation on Friday",
      text: "Join the placement cell orientation at 10:00 AM in Seminar Hall.",
      date: "2 days ago",
    },
  ];

  return (
    <div className="space-y-4 pb-5">
      <PageHeader
        title="Announcements"
        description="Important updates from your placement cell."
      />
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <section
            key={announcement.title}
            className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
              <Megaphone size={18} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  {announcement.title}
                </h2>
                <span className="text-[10px] text-slate-500">
                  {announcement.date}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {announcement.text}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   TPO / PLACEMENT OFFICER - STUDENT APPLICATION DETAILS
   Reuses the exact same ApplicationsBoard UI as the student's
   own "My Applications" page, in read-only mode. The top-level
   back action returns to the students LIST (not the student's
   detail screen).
========================================================= */
export function StudentApplicationDetails() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/students")}
            title="Back to students list"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 transition hover:text-cyan-700"
          >
            <ArrowLeft size={15} />
            Back to Students
          </button>

          <PageHeader
            title="Application Details"
            description="View placement applications submitted by this student."
          />
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-600">
            {studentProfileData.initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {studentProfileData.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {studentProfileData.program}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">
                Reg. No. {studentProfileData.registrationNumber}
              </span>
              <span className="rounded-md bg-cyan-50 px-2.5 py-1.5 text-[10px] font-semibold text-cyan-600">
                {studentProfileData.department}
              </span>
              <span className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600">
                {studentProfileData.batch} Batch
              </span>
            </div>
          </div>
        </div>
      </section>

      <ApplicationsBoard readOnly />
    </div>
  );
}
