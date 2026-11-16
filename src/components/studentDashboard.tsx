import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type StudentDashboardResponse, useGetStudentDashboardQuery } from "../redux/api";
import { getApiErrorMessage } from "./formHelpers";
import { ApplyJobDialog } from "./student/jobs/ApplyJobDialog";
import { formatCtc, formatDate, getLogoText } from "./student/jobs/jobHelpers";
import { ProfileLoadError, ProfileLoading } from "./student/profile/ProfileStatus";
import { RequireStudentRecord } from "./student/shared/RequireStudentRecord";

type DashboardDrive = StudentDashboardResponse["upcomingDrives"]["items"][number];

const cardClass = "rounded-2xl border border-slate-200  shadow-sm";

// Labels for placementOverview.profileCompletion.missingFields
const PROFILE_FIELD_LABELS: Record<string, string> = {
  name: "Name",
  departmentId: "Department",
  degreeId: "Program",
  batch: "Batch",
  semester: "Semester",
  cgpa: "CGPA",
  backlogs: "Backlogs",
  phone: "Phone",
  dateOfBirth: "Date of birth",
  location: "Location",
  skills: "Skills",
  projects: "Projects",
};

function getDriveDateParts(value: string | null) {
  if (!value) return { month: "TBA", day: "—" };
  const date = new Date(value);
  return {
    month: new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" }).format(date).toUpperCase(),
    day: new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "UTC" }).format(date),
  };
}

function CardEmptyText({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-8 text-center text-xs text-slate-500">{children}</p>;
}

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

function SectionHeading({ title, action = "View All", onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-bold tracking-tight text-slate-800 sm:text-base">{title}</h2>
      {onAction && (
        <button type="button" onClick={onAction} className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-cyan-500 transition hover:text-cyan-700 sm:text-xs">
          {action}
          <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}

function PlacementOverviewCard({ overview }: { overview: StudentDashboardResponse["placementOverview"] }) {
  const navigate = useNavigate();
  const { profileCompletion, placementReadiness, applicationActivity } = overview;
  const missingFields = profileCompletion.missingFields.map((field) => PROFILE_FIELD_LABELS[field] ?? field);

  const applicationCounts = [
    ["Applied", applicationActivity.applied, "text-blue-500"],
    ["Shortlisted", applicationActivity.shortlisted, "text-emerald-500"],
    ["Interviews", applicationActivity.interviews, "text-amber-500"],
    ["Offers", applicationActivity.offers, "text-violet-500"],
    ["Rejected", applicationActivity.rejected, "text-rose-500"],
  ] as const;

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
        <ProgressBar value={profileCompletion.percentage} label="Profile Completion" color="bg-cyan-500" />
        <ProgressBar value={placementReadiness.percentage} label="Placement Readiness" color="bg-emerald-500" />
      </div>
      {missingFields.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
          >
            Complete profile
            <ArrowRight size={13} />
          </button>
          <p className="mt-1 text-[10px] text-slate-500">Missing: {missingFields.join(", ")}</p>
        </div>
      )}

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold text-slate-800">Application Activity</h3>
          <span className="text-[10px] font-semibold text-slate-500">{applicationActivity.total} total</span>
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

      <button
        type="button"
        onClick={() => navigate("/applications")}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700"
      >
        View Applications
        <ArrowRight size={14} />
      </button>
    </section>
  );
}

function RecommendedJobsCard({ recommended }: { recommended: StudentDashboardResponse["recommendedJobs"] }) {
  const navigate = useNavigate();

  return (
    <section className={`${cardClass} h-full min-h-[280px] max-h-[360px] overflow-x-hidden overflow-y-auto bg-white`}>
      <div className="border-b border-slate-100 p-4 sm:px-5">
        <SectionHeading title="Recommended For You" onAction={recommended.total > 0 ? () => navigate("/jobs") : undefined} />
      </div>
      <div>
        {recommended.items.length === 0 && (
          <CardEmptyText>No new recommendations right now. Jobs you are eligible for and have not applied to will show here.</CardEmptyText>
        )}
        {recommended.items.map((job) => (
          <div key={job.jobId} className="grid gap-3 border-b border-slate-100 p-3.5 last:border-b-0 sm:grid-cols-[74px_minmax(0,1fr)_104px] sm:items-center sm:px-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-white text-center text-sm font-bold text-cyan-600">
              {getLogoText(job.company.name)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-bold text-slate-800">{job.company.name}</p>
                <span className={`text-xs font-semibold ${job.match.label === "Fair" ? "text-amber-600" : "text-emerald-600"}`}>{job.match.percentage}% Match</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600">{job.jobRole}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-600 sm:text-[11px]">
                <span>{formatCtc(job.ctcPackage)}</span>
                {job.departments.length > 0 && <span>{job.departments.map((department) => department.name).join(", ")}</span>}
                {job.graduationYears.length > 0 && <span>{job.graduationYears.join(", ")} Batch</span>}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 sm:block sm:text-right">
              <p className="text-[10px] text-slate-500">Apply by<br /><span className="font-medium text-slate-700">{job.applyBy ? formatDate(job.applyBy) : "—"}</span></p>
              <button
                type="button"
                onClick={() => navigate(`/jobs/${job.jobId}`)}
                className="inline-flex h-8 items-center justify-center rounded-md bg-cyan-500 px-3 text-[10px] font-semibold text-white transition hover:bg-cyan-600 sm:mt-2"
              >
                View Drive
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillDemandCard({ skills }: { skills: StudentDashboardResponse["skillsInDemand"] }) {
  // Bars are drawn against the number of companies with open drives (or the top skill, if that is missing).
  const maxCompanies = skills.totalCompanies || skills.items[0]?.companyCount || 1;

  return (
    <section className={`${cardClass} h-full min-h-[280px] max-h-[360px] overflow-y-auto bg-white p-4 sm:p-5`}>
      <SectionHeading title="Skills Companies Are Looking For" />
      {skills.items.length === 0 ? (
        <CardEmptyText>No open drives are asking for skills right now.</CardEmptyText>
      ) : (
        <div className="mt-5 space-y-3.5">
          {skills.items.map((skill) => (
            <div key={skill.skillId} className="grid grid-cols-[88px_minmax(0,1fr)_80px] items-center gap-2 text-[11px]">
              <span className="flex min-w-0 items-center gap-1 font-medium text-slate-700" title={skill.studentHasSkill ? "You have this skill" : undefined}>
                <span className="truncate">{skill.skill}</span>
                {skill.studentHasSkill && <CheckCircle2 size={12} className="shrink-0 text-emerald-500" aria-label="You have this skill" />}
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, (skill.companyCount / maxCompanies) * 100)}%` }} />
              </span>
              <span className="text-right text-slate-500">
                <b className="text-cyan-500">{skill.companyCount}</b> compan{skill.companyCount === 1 ? "y" : "ies"}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function UpcomingOngoingDrivesCard({ drives, studentId }: { drives: StudentDashboardResponse["upcomingDrives"]; studentId: string }) {
  const navigate = useNavigate();
  const [applyingTo, setApplyingTo] = useState<DashboardDrive | null>(null);

  return (
    <section className={`${cardClass} h-full min-w-0 bg-white p-4 sm:p-5`}>
      <SectionHeading title="Upcoming & Ongoing Drives" onAction={() => navigate("/jobs")} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{drives.counts.ongoing} Ongoing</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-600"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />{drives.counts.upcoming} Upcoming</span>
      </div>
      {drives.items.length === 0 ? (
        <CardEmptyText>No upcoming or ongoing drives you are eligible for right now.</CardEmptyText>
      ) : (
        <div className="mt-4 divide-y divide-slate-100">
          {drives.items.map((drive) => {
            const { month, day } = getDriveDateParts(drive.driveDate);
            const isOngoing = drive.driveStatus === "ONGOING";

            return (
              <div key={drive.jobId} className="grid grid-cols-[50px_minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex flex-col items-center rounded-lg bg-cyan-50 px-2 py-1.5 text-center">
                  <span className="text-[9px] font-bold text-cyan-500">{month}</span>
                  <span className="text-base font-bold leading-none text-slate-800">{day}</span>
                </div>
                <button type="button" onClick={() => navigate(`/jobs/${drive.jobId}`)} className="min-w-0 text-left">
                  <p className="truncate text-xs font-bold text-slate-800 hover:text-cyan-600">{drive.company.name}</p>
                  <p className="truncate text-[11px] text-slate-600">{drive.jobRole}</p>
                  <p className={`mt-1 flex items-center gap-1 text-[9px] font-semibold ${isOngoing ? "text-emerald-600" : "text-cyan-600"}`}><span className={`h-1.5 w-1.5 rounded-full ${isOngoing ? "bg-emerald-500" : "bg-cyan-500"}`} />{isOngoing ? "Ongoing" : "Upcoming"}</p>
                </button>
                <div className="text-right">
                  <p className="text-[11px] font-medium text-slate-700">{formatCtc(drive.ctcPackage)}</p>
                  {drive.application ? (
                    <button
                      type="button"
                      onClick={() => navigate("/applications")}
                      className="mt-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600"
                    >
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setApplyingTo(drive)}
                      className="mt-1 rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-600 hover:bg-cyan-100"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Applying refetches the dashboard, so the row switches to "Applied" on its own. */}
      {applyingTo && (
        <ApplyJobDialog
          studentId={studentId}
          roleId={applyingTo.jobId}
          companyName={applyingTo.company.name}
          role={applyingTo.jobRole}
          applyBy={applyingTo.applyBy}
          daysLeft={applyingTo.daysLeft}
          onClose={() => setApplyingTo(null)}
        />
      )}
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

export function StudentDashboard() {
  return (
    <div className="-m-3 min-h-full space-y-4 bg-slate-50 p-3 pb-5 text-slate-800 sm:p-4">
      <RequireStudentRecord
        loadingLabel="Loading your dashboard..."
        emptyTitle="Complete your profile to get started"
        emptyDescription="Add your details to see your placement readiness, the drives you are eligible for and jobs recommended for you."
      >
        {(studentId) => <DashboardContent studentId={studentId} />}
      </RequireStudentRecord>
    </div>
  );
}

function DashboardContent({ studentId }: { studentId: string }) {
  const { data, isLoading, error, refetch } = useGetStudentDashboardQuery({ studentId }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <ProfileLoading label="Loading your dashboard..." />;
  if (error || !data) {
    return <ProfileLoadError message={getApiErrorMessage(error, "Unable to load your dashboard.")} onRetry={() => void refetch()} />;
  }

  return (
    <>
      <div className="grid items-stretch gap-4 lg:grid-cols-2">
        <PlacementOverviewCard overview={data.placementOverview} />
        <UpcomingOngoingDrivesCard drives={data.upcomingDrives} studentId={studentId} />
      </div>

      <div>
        <LuminaInsightsCard />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
        <RecommendedJobsCard recommended={data.recommendedJobs} />
        <SkillDemandCard skills={data.skillsInDemand} />
      </div>
    </>
  );
}
