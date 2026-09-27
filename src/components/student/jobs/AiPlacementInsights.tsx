import type { JobListing } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { defaultPlacementFeedback, placementFeedbackByCompany, studentProfileSnapshot } from "../shared/data";
import { ImproveSkills } from "./ImproveSkills";
import { InsightSignal } from "./InsightSignal";
import { BrainCircuit, CheckCircle2, Lightbulb, RefreshCw, Sparkles, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

export function AiPlacementInsights({ job }: { job: JobListing }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const feedback = placementFeedbackByCompany[job.company] ?? defaultPlacementFeedback;
  const coreSkills = job.skills.filter((skill) => !skill.startsWith("+"));
  const matchedSkills = coreSkills.filter((skill) => studentProfileSnapshot.skills.some((profileSkill) => {
    const normalizedSkill = skill.toLowerCase();
    const normalizedProfileSkill = profileSkill.toLowerCase();
    return normalizedSkill.includes(normalizedProfileSkill) || normalizedProfileSkill.includes(normalizedSkill);
  }));
  const profileCoverage = Math.round((matchedSkills.length / Math.max(coreSkills.length, 1)) * 100);
  const unmatchedSkill = coreSkills.find((skill) => !matchedSkills.includes(skill));

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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-700"><Sparkles size={12} />Lumina's AI Placement Insights</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500"><BrainCircuit size={13} className="text-cyan-500" />High confidence</span>
            </div>
            <h2 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">Your preparation plan for {job.company}</h2>
            <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-600 sm:text-xs">Personalized from your profile, this role&apos;s skill requirements, and feedback from students who completed previous {job.company} placement drives.</p>
          </div>
          <button type="button" onClick={refreshAnalysis} disabled={isRefreshing} className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-md border border-cyan-200 bg-white px-3 py-2 text-[10px] font-semibold text-cyan-700 transition hover:border-cyan-400 hover:bg-cyan-50 disabled:cursor-wait disabled:opacity-70"><RefreshCw size={13} className={isRefreshing ? "animate-spin" : ""} />{isRefreshing ? "Refreshing..." : "Refresh analysis"}</button>
        </div>

        <div className="mt-5 grid gap-3 xl:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-lg border border-cyan-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600"><Lightbulb size={18} /></span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-cyan-600">Personalized recommendation</p>
                <p className="mt-1.5 text-xs font-semibold leading-5 text-slate-800">Focus first on {feedback.commonChallenge.toLowerCase()} — it is the most repeated challenge in the previous drive feedback.</p>
              </div>
            </div>
            <p className="mt-4 rounded-md bg-cyan-50/70 px-3 py-2.5 text-[11px] leading-5 text-cyan-800">Your {studentProfileSnapshot.branch} profile and {studentProfileSnapshot.cgpa} CGPA are a strong starting point. You already align with {matchedSkills.length} of {coreSkills.length} listed core skills{unmatchedSkill ? `; revise ${unmatchedSkill} next.` : "."}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <InsightSignal icon={Target} label="Profile fit" value={`${job.match}%`} tone="bg-emerald-50 text-emerald-600" />
              <InsightSignal icon={CheckCircle2} label="Skill coverage" value={`${profileCoverage}%`} tone="bg-violet-50 text-violet-600" />
              <InsightSignal icon={TrendingUp} label="Projects ready" value={`${studentProfileSnapshot.projectCount} projects`} tone="bg-amber-50 text-amber-600" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-800">What past drives tell us</p>
                <p className="mt-1 text-[10px] text-slate-500">{feedback.reviewedStudents} student reviews analysed</p>
              </div>
              <span className="rounded-md bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600">{feedback.averageRating}/5 useful</span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2.5"><TrendingUp size={15} className="shrink-0 text-cyan-500" /><span className="text-[10px] text-slate-500">Highest-impact stage</span><span className="ml-auto text-right text-[10px] font-bold text-slate-700">{feedback.focusStage}</span></div>
              <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2.5"><Target size={15} className="shrink-0 text-rose-500" /><span className="text-[10px] text-slate-500">Common gap</span><span className="ml-auto text-right text-[10px] font-bold text-slate-700">{feedback.commonChallenge}</span></div>
            </div>
            <p className="mt-3 text-[10px] leading-4 text-slate-600"><span className="font-bold text-slate-700">Successful pattern: </span>{feedback.successfulPattern}</p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-[10px] leading-4 text-amber-800 sm:text-xs"><Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-500" /><span><span className="font-bold">Best next step: </span>{feedback.nextAction}</span></div>
        <ImproveSkills job={job} />
      </div>
    </DetailCard>
  );
}
