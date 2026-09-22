import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Sparkles,
  Megaphone,
  Target,
  TrendingUp,
} from "lucide-react";
import { getProfileCompletion, studentProfileData } from "./studentPages";

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

// const missingSkills = ["AWS", "Docker", "TypeScript", "System Design"];

const upcomingDrives = [
  { month: "SEP", day: "05", company: "TCS", role: "Software Engineer", package: "₹7.5 LPA", type: "ongoing", status: "Applied" },
  { month: "SEP", day: "12", company: "Zoho", role: "Developer", package: "₹8.0 LPA", type: "upcoming", status: "Apply Now" },
  { month: "SEP", day: "18", company: "Wipro", role: "Project Engineer", package: "₹6.0 LPA", type: "upcoming", status: "Apply Now" },
];

const announcements = [
  { text: "TCS Campus Drive Registration Open", date: "2 hours ago" },
  { text: "Resume submission deadline extended", date: "Yesterday" },
  { text: "Placement orientation on Friday", date: "2 days ago" },
];

const cardClass = "rounded-2xl border border-slate-200  shadow-sm";

function ProgressBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className="flex items-center justify-between gap-3 text-[10px] font-semibold">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-800">{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
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

function PlacementOverviewCard() {
  const profileCompletion = getProfileCompletion(studentProfileData).percentage;

  const applicationCounts = [
    ["Applied", "12", "text-blue-500"],
    ["Shortlisted", "6", "text-emerald-500"],
    ["Interviews", "4", "text-amber-500"],
    ["Offers", "1", "text-violet-500"],
    ["Rejected", "3", "text-rose-500"],
  ];

  return (
    <section className={`${cardClass} h-full bg-white p-4 sm:p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800">Placement Overview</h2>
          <p className="mt-1 text-[10px] text-slate-500">Your readiness, profile, and application activity.</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500"><FileText size={17} /></span>
      </div>
      <div className="mt-4 space-y-3 border-b border-slate-100 pb-4">
        <ProgressBar value={profileCompletion} label="Profile Completion" color="bg-cyan-500" />
        <ProgressBar value={82} label="Placement Readiness" color="bg-emerald-500" />
      </div>
      <span className="text-cyan-400 border-b text-xs cursor-pointer mt-2">Complete profile</span>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">Application Activity</h3>
          <span className="text-[10px] font-semibold text-slate-500">12 total</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {applicationCounts.map(([label, count, tone]) => (
            <div key={label} className="rounded-lg bg-slate-50 px-2 py-2 text-center">
              <p className={`text-lg font-bold leading-none ${tone}`}>{count}</p>
              <p className="mt-1 truncate text-[9px] font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <button type="button" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700">
        View Applications
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function RecommendedJobsCard() {
  return (
    <section className={`${cardClass} h-full min-h-[280px] max-h-[360px] overflow-x-hidden overflow-y-auto bg-white`}>
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
    <section className={`${cardClass} h-full min-h-[280px] max-h-[360px] bg-white p-4 sm:p-5`}>
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

// function MissingSkillsCard() {
//   return (
//     <section className={` rounded-lg min-h-[280px] max-h-[360px] bg-red-50 border border-red-300 p-4 sm:p-5 xl:col-span-4`}>
//       <h2 className="text-sm text-red-500 font-bold  sm:text-base">Skills You&apos;re Missing</h2>
//       <div className="mt-5 space-y-4">
//         {missingSkills.map((skill) => (
//           <div key={skill} className="flex items-center gap-3 text-xs font-medium text-slate-700">
//             <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400"><AlertTriangle size={14} /></span>
//             {skill}
//           </div>
//         ))}
//       </div>
//       <button type="button" className="mt-7 inline-flex items-center gap-1.5 text-xs font-semibold ">
//         Explore Skills
//         <ArrowRight size={14} />
//       </button>
//     </section>
//   );
// }

function UpcomingOngoingDrivesCard() {
  const ongoingCount = upcomingDrives.filter((drive) => drive.type === "ongoing").length;
  const upcomingCount = upcomingDrives.filter((drive) => drive.type === "upcoming").length;

  return (
    <section className={`${cardClass} h-full min-w-0 bg-white p-4 sm:p-5`}>
      <SectionHeading title="Upcoming & Ongoing Drives" />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{ongoingCount} Ongoing</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-600"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />{upcomingCount} Upcoming</span>
      </div>
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
              <p className={`mt-1 flex items-center gap-1 text-[9px] font-semibold ${drive.type === "ongoing" ? "text-emerald-600" : "text-cyan-600"}`}><span className={`h-1.5 w-1.5 rounded-full ${drive.type === "ongoing" ? "bg-emerald-500" : "bg-cyan-500"}`} />{drive.type === "ongoing" ? "Ongoing" : "Upcoming"}</p>
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
            <div className="flex items-center gap-1.5 text-cyan-600"><Sparkles size={15} /><span className="text-[15px] font-bold uppercase tracking-wide">Lumina's AI Insights</span></div>
            {/* <h2 className="mt-1 text-sm font-bold text-slate-800 sm:text-base">AI Insights</h2> */}
            <p className="mt-1 text-[10px] leading-4 text-slate-500">Small improvements that can help you convert more applications into offers.</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-100 px-2 py-1 text-[9px] font-bold text-cyan-700"><BrainCircuit size={11} /> Personalised</span>
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

        <div className="mt-3 space-y-1.5 text-[10px] leading-4 text-slate-700">
          <p><span className="font-bold text-emerald-700">What&apos;s helping:</span> 8.72 CGPA and 3 projects give you a strong base.</p>
          <p><span className="font-bold text-rose-600">What&apos;s holding you back:</span> AWS, Docker and TypeScript are missing.</p>
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
    <section className={`${cardClass} h-full min-w-0 overflow-hidden bg-white`}>
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
        <h2 className="text font-bold text-slate-800">Announcements</h2>
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
      <div className="grid items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <PlacementOverviewCard />
        <UpcomingOngoingDrivesCard />
        <AnnouncementsCard />
      </div>

      <div>
        <LuminaInsightsCard />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        <RecommendedJobsCard />
        <SkillDemandCard />
        {/* <MissingSkillsCard /> */}
      </div>
    </div>
  );
}
