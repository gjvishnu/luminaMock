import { AlertTriangle, ArrowLeft, Bookmark, BriefcaseBusiness, Building2, CalendarDays, CheckCircle2, ChevronDown, ChevronRight, CircleMinus, Clock3, FileText, Filter, MapPin, Megaphone, Pencil, Search, Share2, Trophy, Upload, UserRound } from "lucide-react";
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
  { id: "tcs", company: "TCS", companyName: "Tata Consultancy Services", logo: "tcs", role: "Software Engineer", skills: ["C, C++, Java", "SQL", "OOPs", "+2"], location: "Bangalore", ctc: "₹7.5 LPA", applyBy: "05 Sep 2026", daysLeft: 5, match: 92, matchLabel: "Excellent" },
  { id: "infosys", company: "Infosys", companyName: "Infosys", logo: "Infosys", role: "System Engineer", skills: ["Python", "SQL", "Linux", "+1"], location: "Pune", ctc: "₹6.5 LPA", applyBy: "08 Sep 2026", daysLeft: 8, match: 87, matchLabel: "Great" },
  { id: "zoho", company: "Zoho", companyName: "Zoho Corporation", logo: "ZOHO", role: "Software Developer", skills: ["JavaScript", "React", "Node.js", "+1"], location: "Chennai", ctc: "₹8.0 LPA", applyBy: "12 Sep 2026", daysLeft: 12, match: 82, matchLabel: "Good" },
  { id: "wipro", company: "Wipro", companyName: "Wipro", logo: "wipro", role: "Project Engineer", skills: ["Java", "SQL", "DSA", "+1"], location: "Hyderabad", ctc: "₹6.0 LPA", applyBy: "18 Sep 2026", daysLeft: 18, match: 78, matchLabel: "Good" },
  { id: "accenture", company: "Accenture", companyName: "Accenture", logo: "accenture", role: "Associate Software Engineer", skills: ["Python", "SQL", "OOPs", "+2"], location: "Bangalore", ctc: "₹7.0 LPA", applyBy: "20 Sep 2026", daysLeft: 20, match: 74, matchLabel: "Good" },
  { id: "cognizant", company: "Cognizant", companyName: "Cognizant", logo: "cognizant", role: "Graduate Engineer Trainee", skills: ["C#", ".NET", "SQL", "+1"], location: "Kolkata", ctc: "₹6.5 LPA", applyBy: "22 Sep 2026", daysLeft: 22, match: 72, matchLabel: "Fair" },
  { id: "lti-mindtree", company: "LTI Mindtree", companyName: "LTI Mindtree", logo: "LTI", role: "Software Engineer", skills: ["Java", "Spring", "SQL", "+1"], location: "Mumbai", ctc: "₹6.8 LPA", applyBy: "25 Sep 2026", daysLeft: 25, match: 69, matchLabel: "Fair" },
  { id: "capgemini", company: "Capgemini", companyName: "Capgemini", logo: "Capgemini", role: "Analyst", skills: ["Python", "SQL", "Excel", "+1"], location: "Bangalore", ctc: "₹5.5 LPA", applyBy: "28 Sep 2026", daysLeft: 28, match: 65, matchLabel: "Fair" },
];

const jobFilterOptions = {
  company: ["All Companies", "TCS", "Infosys", "Zoho", "Wipro", "Accenture"],
  role: ["All Roles", "Software Engineer", "System Engineer", "Developer", "Analyst"],
  location: ["All Locations", "Bangalore", "Pune", "Chennai", "Hyderabad", "Mumbai"],
  type: ["All Job Types", "Full-time", "Internship", "Contract"],
};

type ApplicationStatus = "Shortlisted" | "In Process" | "Rejected" | "Offer" | "Withdrawn";

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
  { id: "tcs", company: "TCS", companyName: "Tata Consultancy Services", logo: "tcs", role: "Software Engineer", location: "Bangalore", ctc: "₹7.5 LPA", appliedOn: "05 Sep 2026", status: "Shortlisted", updated: "Updated on 10 Sep 2026", nextStep: "Technical Interview", nextDate: "On 18 Sep 2026" },
  { id: "infosys", company: "Infosys", companyName: "Infosys", logo: "Infosys", role: "System Engineer", location: "Pune", ctc: "₹6.5 LPA", appliedOn: "08 Sep 2026", status: "In Process", updated: "Updated on 12 Sep 2026", nextStep: "HR Interview", nextDate: "On 20 Sep 2026" },
  { id: "zoho", company: "Zoho", companyName: "Zoho Corporation", logo: "ZOHO", role: "Software Developer", location: "Chennai", ctc: "₹8.0 LPA", appliedOn: "12 Sep 2026", status: "In Process", updated: "Updated on 14 Sep 2026", nextStep: "Group Discussion", nextDate: "On 16 Sep 2026" },
  { id: "wipro", company: "Wipro", companyName: "Wipro", logo: "wipro", role: "Project Engineer", location: "Hyderabad", ctc: "₹6.0 LPA", appliedOn: "18 Sep 2026", status: "Rejected", updated: "Updated on 21 Sep 2026", nextStep: "Not Selected", nextDate: "Thank you for applying." },
  { id: "accenture", company: "Accenture", companyName: "Accenture", logo: "accenture", role: "Associate Software Engineer", location: "Bangalore", ctc: "₹7.0 LPA", appliedOn: "20 Sep 2026", status: "Offer", updated: "Updated on 22 Sep 2026", nextStep: "Offer Received", nextDate: "On 22 Sep 2026" },
  { id: "cognizant", company: "Cognizant", companyName: "Cognizant", logo: "cognizant", role: "Graduate Engineer Trainee", location: "Kolkata", ctc: "₹6.5 LPA", appliedOn: "22 Sep 2026", status: "Withdrawn", updated: "Updated on 23 Sep 2026", nextStep: "Application Withdrawn", nextDate: "By you on 23 Sep 2026" },
];

const applicationTabs: { label: string; status?: ApplicationStatus; count: number }[] = [
  { label: "All", count: 12 },
  { label: "Shortlisted", status: "Shortlisted", count: 4 },
  { label: "In Process", status: "In Process", count: 3 },
  { label: "Offer", status: "Offer", count: 1 },
  { label: "Rejected", status: "Rejected", count: 3 },
  { label: "Withdrawn", status: "Withdrawn", count: 1 },
];

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">{description}</p>
    </div>
  );
}

function JobFilter({ options, value, onChange, className = "" }: { options: string[]; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <label className={`relative block min-w-0 ${className}`}>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-xs font-medium text-slate-700 outline-none transition hover:border-cyan-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
    </label>
  );
}

function CompanyLogo({ job, large = false }: { job: JobListing; large?: boolean }) {
  const tone = job.company === "TCS" ? "text-pink-500" : job.company === "Infosys" ? "text-blue-500" : job.company === "Zoho" ? "text-emerald-500" : job.company === "Wipro" ? "text-blue-700" : job.company === "Accenture" ? "text-slate-800" : job.company === "Cognizant" ? "text-slate-500" : "text-blue-700";
  const size = large ? "h-28 w-28 text-3xl" : "h-16 w-16 text-[11px]";

  return <div className={`flex shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white font-bold ${size} ${tone}`}>{job.logo}</div>;
}

function SkillChips({ skills }: { skills: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {skills.map((skill) => <span key={skill} className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-medium text-slate-600">{skill}</span>)}
    </div>
  );
}

function JobTableRow({ job, onOpen }: { job: JobListing; onOpen: () => void }) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone = job.match >= 78 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600";

  return (
    <div role="row" tabIndex={0} onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(); }} className="grid min-w-[1050px] cursor-pointer grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs transition hover:bg-cyan-50/30 focus:bg-cyan-50/30 focus:outline-none sm:px-5">
      <div role="cell" className="flex min-w-0 items-center gap-4"><CompanyLogo job={job} /><span className="min-w-0 font-semibold leading-5 text-slate-800">{job.companyName}</span></div>
      <div role="cell" className="min-w-0"><p className="truncate font-semibold text-slate-800">{job.role}</p><SkillChips skills={job.skills} /></div>
      <div role="cell" className="flex items-center gap-2 text-slate-700"><MapPin size={15} className="shrink-0 text-slate-500" />{job.location}</div>
      <div role="cell" className="font-medium text-slate-800">{job.ctc}</div>
      <div role="cell"><p className="flex items-center gap-2 whitespace-nowrap font-medium text-slate-700"><CalendarDays size={15} className="text-slate-500" />{job.applyBy}</p><p className="mt-2 text-[10px] font-semibold text-rose-500">{job.daysLeft} days left</p></div>
      <div role="cell"><p className={`text-lg font-bold leading-none ${matchTone}`}>{job.match}%</p><span className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${badgeTone}`}>{job.matchLabel}</span></div>
      <button type="button" aria-label={`View ${job.companyName} ${job.role}`} className="flex items-center justify-end text-cyan-500 transition hover:text-cyan-700"><ChevronRight size={20} /></button>
    </div>
  );
}

function JobMobileCard({ job, onOpen }: { job: JobListing; onOpen: () => void }) {
  const matchTone = job.match >= 78 ? "text-emerald-600" : "text-amber-500";
  const badgeTone = job.match >= 78 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600";

  return (
    <section onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(); }} tabIndex={0} className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-cyan-200 focus:border-cyan-400 focus:outline-none">
      <div className="flex items-start gap-3"><CompanyLogo job={job} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-500">{job.companyName}</p><h2 className="mt-1 text-sm font-bold text-slate-800">{job.role}</h2><SkillChips skills={job.skills} /></div><div className="text-right"><p className={`text-lg font-bold leading-none ${matchTone}`}>{job.match}%</p><span className={`mt-2 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${badgeTone}`}>{job.matchLabel}</span></div></div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-600"><span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span><span className="font-semibold text-slate-800">{job.ctc}</span><span className="flex items-center gap-1.5"><CalendarDays size={14} />{job.applyBy}</span><span className="font-semibold text-rose-500">{job.daysLeft} days left</span></div>
      <button type="button" className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-cyan-500 py-2 text-xs font-semibold text-white hover:bg-cyan-600">View Job <ChevronRight size={15} /></button>
    </section>
  );
}

export function StudentJobs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ company: "All Companies", role: "All Roles", location: "All Locations", type: "All Job Types", sort: "Sort by: Newest" });
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <JobFilter options={jobFilterOptions.company} value={filters.company} onChange={(value) => updateFilter("company", value)} />
          <JobFilter options={jobFilterOptions.role} value={filters.role} onChange={(value) => updateFilter("role", value)} />
          <JobFilter options={jobFilterOptions.location} value={filters.location} onChange={(value) => updateFilter("location", value)} />
          <JobFilter options={jobFilterOptions.type} value={filters.type} onChange={(value) => updateFilter("type", value)} />
        </div>
        <JobFilter className="w-full sm:w-44 lg:w-44" options={["Sort by: Newest", "Sort by: Match", "Sort by: Deadline"]} value={filters.sort} onChange={(value) => updateFilter("sort", value)} />
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <div role="table" aria-label="Available jobs" className="min-w-[1050px]">
          <div role="row" className="grid grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] gap-4 rounded-t-xl bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"><span>Company</span><span>Job Role</span><span>Location</span><span>CTC</span><span>Apply By</span><span>Match</span><span /></div>
          {jobListings.map((job) => <JobTableRow key={job.company} job={job} onOpen={() => navigate(`/jobs/${job.id}`)} />)}
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {jobListings.map((job) => <JobMobileCard key={job.company} job={job} onOpen={() => navigate(`/jobs/${job.id}`)} />)}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <span>Showing 1 to 8 of 24 jobs</span>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => <button key={page} type="button" onClick={() => setCurrentPage(page)} className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}>{page}</button>)}
          <span className="px-1 text-slate-400">...</span>
          <button type="button" onClick={() => setCurrentPage(6)} className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 6 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}>6</button>
          <button type="button" aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(page + 1, 6))} className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}>{children}</section>;
}

function DetailMeta({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 sm:text-xs"><Icon size={14} className="text-slate-500" />{children}</span>;
}

function SelectionProcess() {
  const stages = [
    { title: "Online Test", description: "Aptitude, Coding & Technical", icon: FileText },
    { title: "Technical Interview", description: "Core CS & Problem Solving", icon: BriefcaseBusiness },
    { title: "HR Interview", description: "Communication & Behavioral", icon: UserRound },
    { title: "Group Discussion", description: "Topics on Current Trends", icon: Megaphone },
    { title: "Final Interview", description: "Managerial Round", icon: Building2 },
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Selection Process</h2>
      <div className="relative mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-2">
        <div className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-cyan-100 sm:block" />
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <div key={stage.title} className="relative z-10 flex min-w-0 flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-500 ring-8 ring-white"><Icon size={19} /></span>
              <span className="mt-3 text-[11px] font-bold text-slate-700">{index + 1}</span>
              <h3 className="mt-2 text-[11px] font-bold leading-4 text-slate-800">{stage.title}</h3>
              <p className="mt-1 max-w-[110px] text-[10px] leading-4 text-slate-500">{stage.description}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-start gap-2 rounded-lg bg-cyan-50/70 px-3 py-2.5 text-[10px] leading-4 text-cyan-700 sm:text-xs"><Clock3 size={15} className="mt-0.5 shrink-0" />The selection process may vary slightly depending on the role and location.</div>
    </DetailCard>
  );
}

function DetailSkills() {
  const skills = ["Data Structures", "Algorithms", "Problem Solving", "Java / Python", "SQL", "OOPs Concepts", "DBMS", "Computer Networks", "Operating Systems", "Git", "Communication"];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Skills They Are Looking For</h2>
      <div className="mt-4 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-600 sm:text-[11px]">{skill}</span>)}</div>
    </DetailCard>
  );
}

function ImproveSkills() {
  const skills = ["System Design", "TypeScript", "Cloud (AWS / Azure)", "Docker"];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Skills You May Want to Improve</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {skills.map((skill) => <div key={skill} className="flex items-center gap-2 text-xs text-slate-700"><span className="rounded-md bg-rose-50 px-2 py-1 text-[10px] font-semibold text-rose-500">Missing</span>{skill}</div>)}
      </div>
      <button type="button" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700">Explore Courses to Improve <ChevronRight size={14} /></button>
    </DetailCard>
  );
}

function AboutRole({ job }: { job: JobListing }) {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">About the Role</h2>
      <p className="mt-3 text-xs leading-5 text-slate-600">You will be part of a fast-paced team at {job.companyName} working on real-world problems. You will get opportunities to work with new technologies and build scalable software solutions.</p>
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
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Your Match</h2>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0"><svg viewBox="0 0 64 64" className="h-full w-full -rotate-90"><circle cx="32" cy="32" r={radius} fill="none" stroke="#e2f6ef" strokeWidth="6" /><circle cx="32" cy="32" r={radius} fill="none" stroke="#16b979" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} /></svg><span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">{job.match}%</span></div>
        <div><p className="text-xs font-bold text-emerald-600">Great Match! 🎉</p><p className="mt-1 text-[11px] leading-4 text-slate-600">Your profile aligns very well with this job.</p></div>
      </div>
      <div className="mt-4 space-y-2.5 text-[11px] text-slate-700"><p className="flex items-start gap-2"><CheckCircle2 size={15} className="shrink-0 text-emerald-500" />Your CGPA (8.72) is eligible (Min. 7.0)</p><p className="flex items-start gap-2"><CheckCircle2 size={15} className="shrink-0 text-emerald-500" />Your branch (CSE) is eligible</p><p className="flex items-start gap-2"><CheckCircle2 size={15} className="shrink-0 text-emerald-500" />You have 8 out of 10 required skills</p><p className="flex items-start gap-2"><AlertTriangle size={15} className="shrink-0 text-rose-500" />You are missing 2 preferred skills</p></div>
      <button type="button" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700">Improve Your Match <ChevronRight size={14} /></button>
    </DetailCard>
  );
}

function DocumentsCard() {
  const documents = [{ name: "Resume (PDF)", uploaded: true }, { name: "Academic Transcripts", uploaded: true }, { name: "Government ID Proof", uploaded: true }, { name: "Passport Size Photo", uploaded: false }];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Documents Required</h2>
      <div className="mt-4 space-y-3">{documents.map((document) => <div key={document.name} className="flex items-center gap-2 text-[11px] text-slate-700"><span className={document.uploaded ? "text-emerald-500" : "text-rose-500"}>{document.uploaded ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}</span><span className="min-w-0 flex-1">{document.name}</span><span className={`text-[10px] font-semibold ${document.uploaded ? "text-emerald-500" : "text-rose-500"}`}>{document.uploaded ? "Uploaded" : "Not Uploaded"}</span></div>)}</div>
    </DetailCard>
  );
}

function TipsCard() {
  const tips = ["Complete your profile for better match", "Add more skills to increase visibility", "Practice aptitude and coding questions"];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Tips Before Applying</h2>
      <div className="mt-4 space-y-3">{tips.map((tip) => <p key={tip} className="flex items-start gap-2 text-[11px] leading-4 text-slate-700"><span className="mt-0.5 text-cyan-500">✧</span>{tip}</p>)}</div>
      <button type="button" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 hover:text-cyan-700">Go to My Profile <ChevronRight size={14} /></button>
    </DetailCard>
  );
}

function ReviewsCard() {
  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">Reviews from Students</h2>
      <div className="mt-3 flex items-center gap-2"><span className="text-2xl font-bold text-slate-800">4.2</span><span className="text-sm tracking-wide text-orange-400">★★★★<span className="text-slate-200">★</span></span><span className="text-[10px] text-slate-500">(320 Reviews)</span></div>
      <p className="mt-3 text-xs leading-5 text-slate-600">The interview process is smooth and the work culture is great.</p>
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
  const tabs = ["Overview", "Job Description", "Eligibility", "About Company", "Reviews"];

  return (
    <div className="space-y-3 pb-5 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => navigate("/jobs")} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-cyan-600"><ArrowLeft size={15} /> Back to Jobs</button>
        <div className="flex items-center gap-2"><button type="button" onClick={() => setSaved((value) => !value)} className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold ${saved ? "border-cyan-300 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-700"}`}><Bookmark size={14} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save Job"}</button><button type="button" aria-label="Share job" className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-600"><Share2 size={14} /></button></div>
      </div>

      <section className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="flex items-center gap-5 p-4 sm:p-6"><CompanyLogo job={job} large /><div className="min-w-0"><h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{job.company} – {job.role}</h1><p className="mt-1 text-sm text-slate-600">{job.companyName}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2"><DetailMeta icon={BriefcaseBusiness}>Full Time</DetailMeta><DetailMeta icon={MapPin}>{job.location}</DetailMeta><DetailMeta icon={FileText}>{job.ctc}</DetailMeta><DetailMeta icon={Clock3}>2026 Batch</DetailMeta></div><span className="mt-4 inline-flex rounded bg-cyan-50 px-2 py-1 text-[10px] font-semibold text-cyan-600">Engineering</span></div></div>
        <aside className="border-t border-slate-100 p-4 sm:p-6 lg:border-l lg:border-t-0"><p className="text-xs font-semibold text-slate-700">Application Deadline</p><p className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-700"><CalendarDays size={15} className="text-slate-500" />{job.applyBy}</p><p className="mt-3 text-xs font-bold text-rose-500">{job.daysLeft} Days left</p><button type="button" className="mt-4 h-9 w-full rounded-md bg-cyan-500 text-xs font-semibold text-white transition hover:bg-cyan-600">Apply Now</button><button type="button" onClick={() => setSaved((value) => !value)} className="mt-2 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"><Bookmark size={14} /> Save for Later</button></aside>
      </section>

      <nav className="flex overflow-x-auto border-b border-slate-200 bg-white" aria-label="Job details sections">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium transition first:pl-2 sm:px-5 ${activeTab === tab ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}>{tab}</button>)}</nav>

      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_275px]">
        <main className="space-y-3"><SelectionProcess /><DetailSkills /><ImproveSkills /><AboutRole job={job} /></main>
        <aside className="space-y-3"><MatchCard job={job} /><DocumentsCard /><TipsCard /><ReviewsCard /></aside>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-3 text-[10px] font-medium text-emerald-600 sm:text-xs"><CheckCircle2 size={15} />By applying, you agree to our Terms &amp; Conditions and placement process guidelines.</div>
    </div>
  );
}

const applicationSummary = [
  { label: "Total Applications", value: "12", icon: BriefcaseBusiness, tone: "bg-violet-50 text-violet-600" },
  { label: "Shortlisted", value: "4", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
  { label: "In Process", value: "3", icon: Clock3, tone: "bg-blue-50 text-blue-600" },
  { label: "Rejected", value: "3", icon: AlertTriangle, tone: "bg-rose-50 text-rose-600" },
  { label: "Offer Received", value: "1", icon: Trophy, tone: "bg-violet-50 text-violet-600" },
  { label: "Withdrawn", value: "1", icon: CircleMinus, tone: "bg-slate-100 text-slate-600" },
];

function ApplicationLogo({ application }: { application: ApplicationRow }) {
  const tone = application.company === "TCS" ? "text-pink-500" : application.company === "Infosys" ? "text-blue-500" : application.company === "Zoho" ? "text-emerald-500" : application.company === "Wipro" ? "text-blue-700" : application.company === "Accenture" ? "text-slate-800" : "text-slate-500";

  return <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white text-[11px] font-bold ${tone}`}>{application.logo}</div>;
}

function ApplicationStatus({ status }: { status: ApplicationStatus }) {
  const tone = {
    Shortlisted: "bg-emerald-50 text-emerald-600",
    "In Process": "bg-blue-50 text-blue-600",
    Rejected: "bg-rose-50 text-rose-600",
    Offer: "bg-emerald-50 text-emerald-600",
    Withdrawn: "bg-slate-100 text-slate-600",
  }[status];

  return <span className={`inline-flex rounded-md px-2.5 py-1 text-[10px] font-semibold ${tone}`}>{status}</span>;
}

function ApplicationTableRow({ application }: { application: ApplicationRow }) {
  const NextIcon = application.status === "Rejected" ? AlertTriangle : application.status === "Withdrawn" ? CircleMinus : application.status === "Offer" ? CheckCircle2 : CalendarDays;
  const nextTone = application.status === "Rejected" ? "text-rose-500" : application.status === "Withdrawn" ? "text-slate-400" : application.status === "Offer" ? "text-emerald-500" : "text-blue-500";

  return (
    <div role="row" className="grid min-w-[1020px] grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] items-center gap-4 border-t border-slate-100 px-4 py-4 text-xs sm:px-5">
      <div role="cell" className="flex min-w-0 items-center gap-4"><ApplicationLogo application={application} /><div className="min-w-0"><p className="truncate font-bold text-slate-800">{application.companyName}</p><p className="mt-1 text-xs font-medium text-slate-700">{application.role}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-600"><span className="inline-flex items-center gap-1"><MapPin size={12} />{application.location}</span><span className="inline-flex items-center gap-1"><BriefcaseBusiness size={12} />Full Time</span><span className="inline-flex items-center gap-1"><FileText size={12} />{application.ctc}</span></div></div></div>
      <div role="cell" className="font-semibold text-slate-700">{application.appliedOn}</div>
      <div role="cell"><ApplicationStatus status={application.status} /><p className="mt-2 text-[10px] text-slate-500">{application.updated}</p></div>
      <div role="cell"><p className={`flex items-center gap-2 font-semibold ${nextTone}`}><NextIcon size={15} />{application.nextStep}</p><p className="mt-1 text-[11px] text-slate-700">{application.nextDate}</p></div>
      <button type="button" className="h-8 rounded-md border border-cyan-300 px-2 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50">{application.status === "Offer" ? "View Offer" : "View Details"}</button>
    </div>
  );
}

function ApplicationMobileCard({ application }: { application: ApplicationRow }) {
  const NextIcon = application.status === "Rejected" ? AlertTriangle : application.status === "Withdrawn" ? CircleMinus : application.status === "Offer" ? CheckCircle2 : CalendarDays;
  const nextTone = application.status === "Rejected" ? "text-rose-500" : application.status === "Withdrawn" ? "text-slate-400" : application.status === "Offer" ? "text-emerald-500" : "text-blue-500";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3"><ApplicationLogo application={application} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-800">{application.companyName}</p><p className="mt-1 text-xs text-slate-600">{application.role}</p><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500"><span className="inline-flex items-center gap-1"><MapPin size={12} />{application.location}</span><span>{application.ctc}</span></div></div><ApplicationStatus status={application.status} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3 text-[11px]"><div><p className="text-[10px] text-slate-500">Applied On</p><p className="mt-1 font-semibold text-slate-700">{application.appliedOn}</p></div><div><p className="text-[10px] text-slate-500">Updated</p><p className="mt-1 font-semibold text-slate-700">{application.updated.replace("Updated on ", "")}</p></div><div className="col-span-2"><p className="text-[10px] text-slate-500">Next Step / Update</p><p className={`mt-1 flex items-center gap-1.5 font-semibold ${nextTone}`}><NextIcon size={14} />{application.nextStep}</p><p className="mt-1 text-slate-600">{application.nextDate}</p></div></div>
      <button type="button" className="mt-4 h-9 w-full rounded-md border border-cyan-300 text-xs font-semibold text-cyan-600 hover:bg-cyan-50">{application.status === "Offer" ? "View Offer" : "View Details"}</button>
    </section>
  );
}

export function StudentApplications() {
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const activeTabDetails = applicationTabs.find((tab) => (activeTab === "All" ? !tab.status : tab.status === activeTab));
  const filteredApplications = applicationRows.filter((application) => {
    const matchesTab = activeTab === "All" || application.status === activeTab;
    const searchText = `${application.companyName} ${application.role}`.toLowerCase();
    return matchesTab && searchText.includes(search.toLowerCase());
  });
  const totalForTab = activeTabDetails?.count ?? filteredApplications.length;

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {applicationSummary.map((summary) => {
          const Icon = summary.icon;

          return <section key={summary.label} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${summary.tone}`}><Icon size={22} /></span><div className="min-w-0"><p className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">{summary.label}</p><p className="mt-1 text-2xl font-bold leading-none text-slate-800">{summary.value}</p></div></section>;
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {applicationTabs.map((tab) => {
              const tabKey = tab.status ?? "All";
              const active = activeTab === tabKey;

              return <button key={tab.label} type="button" onClick={() => { setActiveTab(tabKey); setCurrentPage(1); }} className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold transition sm:px-4 ${active ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}>{tab.label} ({tab.count})</button>;
            })}
          </div>
          <div className="flex gap-2"><label className="relative min-w-0 flex-1 sm:w-72 sm:flex-none"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} placeholder="Search by company or role..." className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100" /></label><button type="button" onClick={() => { setSearch(""); setActiveTab("All"); setCurrentPage(1); }} className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"><Filter size={15} /> Filters</button></div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <div role="table" aria-label="My applications" className="min-w-[1020px]">
            <div role="row" className="grid grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] gap-4 bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"><span>Company &amp; Role</span><span>Applied On</span><span>Current Status</span><span>Next Step / Update</span><span>Action</span></div>
            {filteredApplications.map((application) => <ApplicationTableRow key={application.id} application={application} />)}
          </div>
        </div>

        <div className="space-y-3 p-3 lg:hidden">{filteredApplications.map((application) => <ApplicationMobileCard key={application.id} application={application} />)}</div>

        {filteredApplications.length === 0 && <p className="px-4 py-10 text-center text-xs text-slate-500">No applications match your filters.</p>}
      </section>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row"><span>Showing {filteredApplications.length ? 1 : 0} to {filteredApplications.length} of {search || activeTab !== "All" ? filteredApplications.length : totalForTab} applications</span><div className="flex items-center gap-2"><button type="button" onClick={() => setCurrentPage(1)} className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 1 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}>1</button><button type="button" onClick={() => setCurrentPage(2)} className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 2 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}>2</button><button type="button" aria-label="Next page" onClick={() => setCurrentPage((page) => Math.min(page + 1, 2))} className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"><ChevronRight size={16} /></button></div></div>
    </div>
  );
}

export function StudentProfile() {
  return (
    <div className="space-y-4 pb-5">
      <PageHeader title="My Profile" description="Keep your profile updated to improve your job matches." />
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-600">AM</div><div><h2 className="font-bold text-slate-800">Arjun Mehta</h2><p className="mt-1 text-xs text-slate-500">B.E. Computer Science · 2026 Batch</p></div></div>
          <button type="button" className="inline-flex items-center justify-center gap-1.5 rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"><Pencil size={14} /> Edit Profile</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3"><InfoItem label="CGPA" value="8.4 / 10" /><InfoItem label="Email" value="arjun.mehta@lumina.edu" /><InfoItem label="Phone" value="+91 98765 43210" /></div>
      </section>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 truncate text-xs font-semibold text-slate-800">{value}</p></div>;
}

export function StudentResume() {
  return (
    <div className="space-y-4 pb-5">
      <PageHeader title="Resume" description="Your resume is shared with eligible placement drives." />
      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500"><FileText size={25} /></div><div><h2 className="text-sm font-bold text-slate-800">Resume_2026.pdf</h2><p className="mt-1 text-[11px] text-slate-500">PDF · Last updated Aug 28, 2026</p></div></div>
        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600"><CheckCircle2 size={16} /> Ready to share with recruiters</div>
        <div className="mt-5 flex flex-wrap gap-2"><button type="button" className="rounded-md border border-cyan-300 px-3 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50">View Resume</button><button type="button" className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600"><Upload size={14} /> Update Resume</button></div>
      </section>
    </div>
  );
}

export function StudentAnnouncements() {
  const announcements = [
    { title: "TCS Campus Drive Registration Open", text: "Applications are open for eligible 2026 batch students.", date: "2 hours ago" },
    { title: "Resume submission deadline extended", text: "Update your resume before the next shortlisting round.", date: "Yesterday" },
    { title: "Placement orientation on Friday", text: "Join the placement cell orientation at 10:00 AM in Seminar Hall.", date: "2 days ago" },
  ];

  return (
    <div className="space-y-4 pb-5">
      <PageHeader title="Announcements" description="Important updates from your placement cell." />
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <section key={announcement.title} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500"><Megaphone size={18} /></span>
            <div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-sm font-bold text-slate-800">{announcement.title}</h2><span className="text-[10px] text-slate-500">{announcement.date}</span></div><p className="mt-1 text-xs leading-5 text-slate-600">{announcement.text}</p></div>
          </section>
        ))}
      </div>
    </div>
  );
}
