import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  FileText,
  Sparkles,
  Megaphone,
  Target,
  TrendingUp,
} from "lucide-react";

type ChecklistItem = {
  label: string;
  status: "done" | "warning";
};

const profileChecklist: ChecklistItem[] = [
  { label: "Personal Details", status: "done" },
  { label: "Internship Details", status: "warning" },
  { label: "Academic Details", status: "done" },
  { label: "Resume", status: "warning" },
  { label: "Skills", status: "done" },
  { label: "Projects", status: "done" },
];

const readinessChecklist: ChecklistItem[] = [
  { label: "CGPA", status: "done" },
  { label: "Certificates", status: "done" },
  { label: "Resume", status: "done" },
  { label: "Add 1 more project", status: "warning" },
  { label: "Projects", status: "done" },
  { label: "Add internship details", status: "warning" },
  { label: "Skills", status: "done" },
];

const recommendedJobs = [
  { company: "TCS", role: "Software Engineer", logo: "tcs", match: "92% Match", package: "₹7.5 LPA", departments: "CSE, IT", deadline: "Sep 05, 2026" },
  { company: "Infosys", role: "System Engineer", logo: "Infosys", match: "86% Match", package: "₹6.5 LPA", departments: "CSE, IT, ECE", deadline: "Sep 08, 2026" },
  { company: "Zoho", role: "Developer", logo: "zoho", match: "81% Match", package: "₹8.0 LPA", departments: "CSE, IT", deadline: "Sep 12, 2026" },
];

const skillDemand = [
  { name: "React.js", companies: 24, width: "100%" },
  { name: "Python", companies: 21, width: "88%" },
  { name: "Java", companies: 18, width: "75%" },
  { name: "SQL", companies: 16, width: "67%" },
  { name: "Node.js", companies: 12, width: "50%" },
  { name: "AWS", companies: 9, width: "38%" },
];

const missingSkills = ["AWS", "Docker", "TypeScript", "System Design"];

const upcomingDrives = [
  { month: "SEP", day: "05", company: "TCS", role: "Software Engineer", package: "₹7.5 LPA", status: "Applied" },
  { month: "SEP", day: "12", company: "Zoho", role: "Developer", package: "₹8.0 LPA", status: "Apply Now" },
  { month: "SEP", day: "18", company: "Wipro", role: "Project Engineer", package: "₹6.0 LPA", status: "Apply Now" },
];

const announcements = [
  { text: "TCS Campus Drive Registration Open", date: "2 hours ago" },
  { text: "Resume submission deadline extended", date: "Yesterday" },
  { text: "Placement orientation on Friday", date: "2 days ago" },
];

const cardClass = "rounded-2xl border border-slate-200  shadow-sm";

function ProgressRing({ value, label, color = "#06b6d4" }: { value: number; label: string; color?: string }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32" role="img" aria-label={`${label}: ${value} percent`}>
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={radius} fill="none" stroke="#eef2f7" strokeWidth="8" />
        <circle cx="55" cy="55" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold leading-none text-slate-800">{value}{label === "Profile Completion" ? "%" : ""}</span>
        {label !== "Profile Completion" && <span className="mt-1 text-[10px] font-medium text-slate-500">/ 100</span>}
      </div>
    </div>
  );
}

function Checklist({ items }: { items: ChecklistItem[] }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-2 text-[11px] sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.status === "done" ? CheckCircle2 : AlertTriangle;

        return (
          <div key={item.label} className="flex min-w-0 items-center gap-2">
            <Icon size={15} className={item.status === "done" ? "shrink-0 text-emerald-500" : "shrink-0 text-amber-500"} />
            <span className="truncate text-slate-700">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({ title, action = "View All" }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-bold tracking-tight text-slate-800 sm:text-base">{title}</h2>
      <button type="button" className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-cyan-500 transition hover:text-cyan-700 sm:text-xs">
        {action}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}

function ProfileCompletionCard() {
  return (
    <section className={`${cardClass} bg-white p-4 sm:p-5`}>
      <h2 className="text-base font-bold text-slate-800">Profile Completion</h2>
      <div className="mt-4 flex items-center gap-4 sm:gap-6">
        <ProgressRing value={78} label="Profile Completion" />
        <div className="min-w-0">
          <p className="text-sm leading-5 text-slate-700">Your profile is<br />almost complete</p>
          <button type="button" className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600">
            Complete Profile
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <Checklist items={profileChecklist} />
      </div>
    </section>
  );
}

function PlacementReadinessCard() {
  return (
    <section className={`${cardClass} bg-white p-4 sm:p-5`}>
      <h2 className="text-base font-bold text-slate-800">Placement Readiness</h2>
      <div className="mt-4 flex items-center gap-4 sm:gap-6">
        <ProgressRing value={82} label="Placement Readiness" color="#45c484" />
        <div>
          <p className="text-base font-bold text-emerald-600">Good</p>
          <p className="mt-1 text-sm text-slate-700">You are doing great!</p>
        </div>
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <Checklist items={readinessChecklist} />
      </div>
    </section>
  );
}

function ApplicationsCard() {
  const applicationCounts = [
    ["Applied", "12", "text-blue-500"],
    ["Shortlisted", "6", "text-emerald-500"],
    ["Interviews", "4", "text-amber-500"],
    ["Offers", "1", "text-violet-500"],
    ["Rejected", "3", "text-rose-500"],
  ];

  return (
    <section className={`${cardClass} bg-white p-4 sm:p-5`}>
      <h2 className="text-base font-bold text-slate-800">My Applications</h2>
      <div className="mt-4 grid grid-cols-[120px_minmax(0,1fr)] gap-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
        <div className="flex flex-col items-center border-r border-slate-100 pr-4 sm:pr-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-500 sm:h-24 sm:w-24">
            <FileText size={40} strokeWidth={1.8} />
          </div>
          <p className="mt-3 text-3xl font-bold leading-none text-slate-800">12</p>
          <p className="mt-1 text-[11px] text-slate-600">Total Applications</p>
        </div>
        <div className="space-y-0.5">
          {applicationCounts.map(([label, count, tone]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-100 py-1.5 text-xs last:border-b-0">
              <span className="text-slate-700">{label}</span>
              <span className={`font-bold ${tone}`}>{count}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700">
        View All Applications
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function RecommendedJobsCard() {
  return (
    <section className={`${cardClass} min-h-[280px] max-h-[360px] overflow-x-hidden overflow-y-auto bg-white xl:col-span-4`}>
      <div className="border-b border-slate-100 p-4 sm:px-5">
        <SectionHeading title="Recommended For You" />
      </div>
      <div>
        {recommendedJobs.map((job) => (
          <div key={job.company} className="grid gap-3 border-b border-slate-100 p-3.5 last:border-b-0 sm:grid-cols-[74px_minmax(0,1fr)_104px] sm:items-center sm:px-5">
            <div className={`flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold ${job.logo === "tcs" ? "text-pink-500" : job.logo === "zoho" ? "text-orange-500" : "text-blue-500"}`}>
              {job.logo === "tcs" ? "tcs" : job.company}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-bold text-slate-800">{job.company}</p>
                <span className="text-xs font-semibold text-emerald-600">{job.match}</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600">{job.role}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600 sm:text-[11px]">
                <span>{job.package}</span>
                <span>{job.departments}</span>
                <span>2026 Batch</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 sm:block sm:text-right">
              <p className="text-[10px] text-slate-500">Apply by<br /><span className="font-medium text-slate-700">{job.deadline}</span></p>
              <button type="button" className="inline-flex h-8 items-center justify-center rounded-md bg-cyan-500 px-3 text-[10px] font-semibold text-white transition hover:bg-cyan-600 sm:mt-2">
                View Drive
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillDemandCard() {
  return (
    <section className={`${cardClass} min-h-[280px] max-h-[360px] p-4 sm:p-5 xl:col-span-4`}>
      <SectionHeading title="Skills Companies Are Looking For" />
      <div className="mt-5 space-y-3.5">
        {skillDemand.map((skill) => (
          <div key={skill.name} className="grid grid-cols-[74px_minmax(0,1fr)_72px] items-center gap-2 text-[11px]">
            <span className="font-medium text-slate-700">{skill.name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full rounded-full bg-cyan-400" style={{ width: skill.width }} />
            </span>
            <span className="text-right text-slate-500"><b className="text-cyan-500">{skill.companies}</b> companies</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MissingSkillsCard() {
  return (
    <section className={` rounded-lg min-h-[280px] max-h-[360px] bg-red-50 border border-red-300 p-4 sm:p-5 xl:col-span-4`}>
      <h2 className="text-sm text-red-500 font-bold  sm:text-base">Skills You&apos;re Missing</h2>
      <div className="mt-5 space-y-4">
        {missingSkills.map((skill) => (
          <div key={skill} className="flex items-center gap-3 text-xs font-medium text-slate-700">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400"><AlertTriangle size={14} /></span>
            {skill}
          </div>
        ))}
      </div>
      <button type="button" className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold ">
        Explore Skills
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function UpcomingDrivesCard() {
  return (
    <section className={`${cardClass} min-w-0 bg-white p-4 sm:p-5`}>
      <SectionHeading title="Upcoming Drives" />
      <div className="mt-4 divide-y divide-slate-100">
        {upcomingDrives.map((drive) => (
          <div key={drive.company} className="grid grid-cols-[50px_minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex flex-col items-center rounded-lg bg-cyan-50 px-2 py-1.5 text-center">
              <span className="text-[9px] font-bold text-cyan-500">{drive.month}</span>
              <span className="text-base font-bold leading-none text-slate-800">{drive.day}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-800">{drive.company}</p>
              <p className="truncate text-[11px] text-slate-600">{drive.role}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-medium text-slate-700">{drive.package}</p>
              <button type="button" className={`mt-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${drive.status === "Applied" ? "bg-emerald-50 text-emerald-600" : "bg-cyan-50 text-cyan-600"}`}>{drive.status}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LuminaInsightsCard() {
  return (
    <section className={`${cardClass} relative min-w-0 overflow-hidden border-cyan-200 bg-gradient-to-br from-white via-white to-cyan-50/80 p-4 shadow-md shadow-cyan-100/70 ring-1 ring-cyan-100 sm:p-5 xl:h-full`}>
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-cyan-100/60 blur-2xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-cyan-600"><Sparkles size={15} /><span className="text-[15px] font-bold uppercase tracking-wide">Lumina AI Insights</span></div>
            {/* <h2 className="mt-1 text-sm font-bold text-slate-800 sm:text-base">AI Insights</h2> */}
            <p className="mt-1 text-[10px] leading-4 text-slate-500">Small improvements that can help you convert more applications into offers.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-100 px-2 py-1 text-[9px] font-bold text-cyan-700"><BrainCircuit size={11} /> Personalised</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700"><TrendingUp size={13} /> What&apos;s helping</div>
            <p className="mt-2 text-[10px] leading-4 text-slate-700">8.72 CGPA and 3 projects give you a strong base.</p>
          </div>
          <div className="rounded-lg border border-rose-100 bg-rose-50/70 p-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600"><AlertTriangle size={13} /> What&apos;s holding you back</div>
            <p className="mt-2 text-[10px] leading-4 text-slate-700">AWS, Docker and TypeScript are missing.</p>
          </div>
        </div>

       
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          <div className="rounded-lg border border-cyan-100 bg-cyan-50/60 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-cyan-700">Eligibility</p>
            <p className="mt-1.5 text-[10px] leading-4 text-slate-700">You are currently eligible for <span className="font-bold text-cyan-700">12 of 25 active jobs.</span></p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Skill Improvement</p>
            <p className="mt-1.5 text-[10px] leading-4 text-slate-700">Improve your SQL skills to become eligible for <span className="font-bold text-emerald-700">6 more jobs.</span></p>
          </div>
          <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-rose-600">Missing Skills</p>
            <p className="mt-1.5 text-[10px] leading-4 text-slate-700">You&apos;re missing React and TypeScript skills required by <span className="font-bold text-rose-600">10 active jobs.</span></p>
          </div>
        </div>
         <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-cyan-50/80 p-2.5 text-center">
            <p className="text-sm font-bold text-cyan-700">82/100</p>
            <p className="mt-1 text-[9px] font-medium leading-3 text-slate-500">Placement readiness</p>
          </div>
          <div className="rounded-lg bg-violet-50/80 p-2.5 text-center">
            <p className="text-sm font-bold text-violet-700">6</p>
            <p className="mt-1 text-[9px] font-medium leading-3 text-slate-500">Core skills ready</p>
          </div>
          <div className="rounded-lg bg-amber-50/80 p-2.5 text-center">
            <p className="text-sm font-bold text-amber-700">30 min</p>
            <p className="mt-1 text-[9px] font-medium leading-3 text-slate-500">Daily prep target</p>
          </div>
        </div>


        <div className="mt-3 rounded-lg border border-slate-100 bg-white p-3">
          <div className="flex items-start gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-50 text-violet-600"><Target size={14} /></span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-violet-600">Next Best Action</p>
              <p className="mt-1 text-xs font-bold leading-5 text-slate-800">Learn TypeScript <span className="text-violet-600">→</span> potentially unlock 5 more jobs.</p>
              <p className="mt-1 text-[10px] leading-4 text-slate-500">Start with a small React project, then add it to your profile to strengthen your match score.</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[10px] font-semibold text-slate-700"><CheckCircle2 size={14} className="text-emerald-500" />Keep your CGPA at 8.7+ to stay in the top 30% of opportunities.</div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-cyan-100 bg-cyan-50/60 px-3 py-2.5 text-[10px] leading-4 text-cyan-800">
          <TrendingUp size={14} className="mt-0.5 shrink-0 text-cyan-600" />
          <span><span className="font-bold">Offer tip:</span> Apply early to drives above 80% match and tailor one project story to each role.</span>
        </div>
      </div>
    </section>
  );
}

function AnnouncementsCard() {
  return (
    <section className={`${cardClass} min-w-0 overflow-hidden bg-white`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-bold text-slate-800">Announcements</h2>
        <button type="button" className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-500">View All <ArrowRight size={13} /></button>
      </div>
      <div className="divide-y divide-slate-100 px-4 sm:px-5">
        {announcements.map((announcement) => (
          <div key={announcement.text} className="flex items-start gap-2.5 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-500"><Megaphone size={14} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium leading-4 text-slate-700 sm:truncate">{announcement.text}</p>
              <p className="mt-0.5 text-[9px] text-slate-500">{announcement.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StudentDashboard() {
  return (
    <div className="-m-3 min-h-full space-y-4 bg-slate-50 p-3 pb-5 text-slate-800 sm:p-4">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <ProfileCompletionCard />
        <PlacementReadinessCard />
        <ApplicationsCard />
      </div>

      <div className="grid gap-4 xl:grid-cols-[7fr_3fr]">
        <LuminaInsightsCard />
        <div className="flex min-w-0 flex-col gap-4">
          <UpcomingDrivesCard />
          <AnnouncementsCard />
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-12">
        <RecommendedJobsCard />
        <SkillDemandCard />
        <MissingSkillsCard />
      </div>
    </div>
  );
}
