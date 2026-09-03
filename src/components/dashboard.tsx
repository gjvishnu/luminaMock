import {
  
  BriefcaseBusiness,
   ChartNoAxesCombined,
  CheckCircle2,
  AlertTriangle,
   Users,
   ArrowRight,
   Trophy,
 Percent,
  CalendarDays,
  CirclePlus,
  Megaphone,
  Send,
  Sparkles,
  
 } from "lucide-react";
import { useUserRole } from "../context/useUserRole";
import { StudentDashboard } from "./studentDashboard";

type StatCard = {
  title: string;
  value: string;
  description: string;
  action?: string;
  icon: React.ElementType;
  iconStyle: string;
};

const stats: StatCard[] = [
  {
    title: "Total Students",
    value: "2,450",
    description: "View all students",
    action: "arrow",
    icon: Users,
    iconStyle: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Placement Eligible",
    value: "1,920",
    description: "78.4% of total students",
    icon: CheckCircle2,
    iconStyle: "bg-green-100 text-green-600",
  },
  {
    title: "Students Placed",
    value: "1,430",
    description: "74.5% placement rate",
    icon: BriefcaseBusiness,
    iconStyle: "bg-purple-100 text-purple-600",
  },
  {
    title: "Placement %",
    value: "75.2 ",
    description: "of eligible students",
     icon: Percent,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Avg CTC",
    value: "₹6,20,000",
    description: "Across all placed students",
    icon: ChartNoAxesCombined,
    iconStyle: "bg-blue-100 text-blue-600",
  },
  {
    title: "Highest CTC",
    value: "₹9,20,000",
    description: "Across all placed students",
    icon: Trophy,
    iconStyle: "bg-orange-100 text-orange-600",
  },
   {
    title: " Drives conducted",
    value: "50",
    description: "This acedemic year",
    icon: Megaphone,
    iconStyle: "bg-blue-100 text-blue-600",
  },
];


const announcements = [
  {
    text: "TCS Ninja Hiring registration is open",
    date: "20 May 2025",
  },
  {
    text: "Aptitude training session on 22 May",
    date: "19 May 2025",
  },
  {
    text: "Infosys drive - Shortlisting updated",
    date: "18 May 2025",
  },
];

const luminaInsights = [
  {
    title: "CSE students have strong readiness",
    description: "CSE is leading the cohort with strong assessment scores and application activity.",
    action: "Keep momentum",
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-600",
    accent: "border-emerald-100",
  },
  {
    title: "ECE readiness is lagging",
    description: "ECE readiness is below the campus average. Targeted aptitude and interview practice can close the gap.",
    action: "Focus area",
    icon: AlertTriangle,
    tone: "bg-amber-50 text-amber-600",
    accent: "border-amber-100",
  },
  {
    title: "87 students are at risk of remaining unplaced",
    description: "These eligible students show low application activity or incomplete placement readiness.",
    action: "Needs review",
    icon: Users,
    tone: "bg-rose-50 text-rose-600",
    accent: "border-rose-100",
  },
];

type PlacementTrendPoint = {
  year: string;
  placementRate: number;
  avgCtc: number;
  highestCtc: number;
  companies: number;
  students: number;
};

type PlacementMetricKey = Exclude<keyof PlacementTrendPoint, "year">;

type PlacementTrendMetric = {
  key: PlacementMetricKey;
  label: string;
  color: string;
  min: number;
  max: number;
  format: (value: number) => string;
  formatChange: (value: number) => string;
};

const placementTrend: PlacementTrendPoint[] = [
  { year: "2022", placementRate: 62, avgCtc: 4.2, highestCtc: 12, companies: 28, students: 1180 },
  { year: "2023", placementRate: 65.8, avgCtc: 4.8, highestCtc: 14.5, companies: 34, students: 1240 },
  { year: "2024", placementRate: 68.9, avgCtc: 5.2, highestCtc: 16, companies: 39, students: 1290 },
  { year: "2025", placementRate: 71.6, avgCtc: 5.8, highestCtc: 19, companies: 45, students: 1375 },
  { year: "2026", placementRate: 74.5, avgCtc: 6.4, highestCtc: 22, companies: 51, students: 1430 },
];

const placementTrendMetrics: PlacementTrendMetric[] = [
  {
    key: "placementRate",
    label: "Placement %",
    color: "#0891b2",
    min: 50,
    max: 80,
    format: (value) => `${value}%`,
    formatChange: (value) => `${value.toFixed(1)} pts`,
  },
  {
    key: "avgCtc",
    label: "Avg CTC",
    color: "#7c3aed",
    min: 3,
    max: 8,
    format: (value) => `₹${value.toFixed(1)} LPA`,
    formatChange: (value) => `₹${value.toFixed(1)} LPA`,
  },
  {
    key: "highestCtc",
    label: "Highest CTC",
    color: "#f59e0b",
    min: 8,
    max: 24,
    format: (value) => `₹${value.toFixed(1)} LPA`,
    formatChange: (value) => `₹${value.toFixed(1)} LPA`,
  },
  {
    key: "companies",
    label: "Companies",
    color: "#16a34a",
    min: 20,
    max: 60,
    format: (value) => value.toString(),
    formatChange: (value) => value.toString(),
  },
  {
    key: "students",
    label: "Students placed",
    color: "#2563eb",
    min: 1000,
    max: 1600,
    format: (value) => value.toLocaleString("en-IN"),
    formatChange: (value) => value.toLocaleString("en-IN"),
  },
];

const chartDimensions = {
  width: 820,
  height: 280,
  left: 42,
  right: 18,
  top: 18,
  bottom: 38,
};

function getChartX(index: number) {
  const plotWidth = chartDimensions.width - chartDimensions.left - chartDimensions.right;
  return chartDimensions.left + index * (plotWidth / (placementTrend.length - 1));
}

function getChartY(metric: PlacementTrendMetric, value: number) {
  const plotHeight = chartDimensions.height - chartDimensions.top - chartDimensions.bottom;
  const ratio = Math.min(Math.max((value - metric.min) / (metric.max - metric.min), 0), 1);
  return chartDimensions.top + (1 - ratio) * plotHeight;
}

function PlacementTrendChart() {
  const latest = placementTrend[placementTrend.length - 1];
  const first = placementTrend[0];

  return (
    <section className="min-w-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
      <div className="border-b  border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">Placement Trend</h2>
            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">Placement performance across the last five years</p>
          </div>
          <span className="w-fit rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-700 sm:text-xs">2022 – 2026</span>
        </div>

        
      </div>

      <div className="p-3 sm:p-5 ">
        <div className="w-full overflow-hidden rounded-lg bg-slate-50/70 px-1 pt-2 sm:px-3 sm:pt-3">
          <svg
            className="h-auto w-full"
            viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
            role="img"
            aria-label="Placement trend from 2022 to 2026 for placement rate, CTC, companies, and students placed"
          >
            <title>Placement trend from 2022 to 2026</title>
            <desc>All lines are scaled to their own range to compare the direction of each placement metric.</desc>

            {[0, 0.25, 0.5, 0.75, 1].map((position) => {
              const y = chartDimensions.top + position * (chartDimensions.height - chartDimensions.top - chartDimensions.bottom);

              return (
                <line
                  key={position}
                  x1={chartDimensions.left}
                  x2={chartDimensions.width - chartDimensions.right}
                  y1={y}
                  y2={y}
                  stroke="#dbe4ee"
                  strokeDasharray="4 5"
                  strokeWidth="1"
                />
              );
            })}

            {placementTrend.map((point, index) => (
              <text
                key={point.year}
                x={getChartX(index)}
                y={chartDimensions.height - 10}
                fill="#64748b"
                fontSize="12"
                textAnchor="middle"
              >
                {point.year}
              </text>
            ))}

            {placementTrendMetrics.map((metric) => {
              const points = placementTrend
                .map((point, index) => `${getChartX(index)},${getChartY(metric, point[metric.key])}`)
                .join(" ");

              return (
                <g key={metric.key}>
                  <polyline points={points} fill="none" stroke={metric.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  {placementTrend.map((point, index) => (
                    <circle
                      key={`${metric.key}-${point.year}`}
                      cx={getChartX(index)}
                      cy={getChartY(metric, point[metric.key])}
                      r="4"
                      fill="white"
                      stroke={metric.color}
                      strokeWidth="2.5"
                    />
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

 
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {placementTrendMetrics.map((metric) => {
            const currentValue = latest[metric.key];
            const change = currentValue - first[metric.key];

            return (
              <div key={metric.key} className="rounded-lg border border-gray-100 bg-gray-50/80 p-2.5 sm:p-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: metric.color }} />
                  <p className="truncate text-[10px] font-medium text-gray-500 sm:text-xs">{metric.label}</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-gray-900 sm:text-base">{metric.format(currentValue)}</p>
                <p className="mt-1 text-[9px] font-medium text-emerald-600 sm:text-[10px]">↑ {metric.formatChange(change)} since {first.year}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LuminaInsights() {
  return (
    <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
      <div className="border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-cyan-50 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <Sparkles size={19} />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">Lumina Insights</h2>
              <p className="mt-0.5 truncate text-[10px] text-gray-500 sm:text-xs">AI-powered placement intelligence</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-violet-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-violet-700 sm:text-[10px]">AI</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="space-y-2.5">
          {luminaInsights.map((insight) => {
            const Icon = insight.icon;

            return (
              <article key={insight.title} className={`rounded-lg border bg-white p-3 ${insight.accent}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${insight.tone}`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[11px] font-semibold leading-4 text-gray-900 sm:text-xs sm:leading-5">{insight.title}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-[11px] sm:leading-5">{insight.description}</p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-gray-100 pt-2">
                  <span className="text-[9px] font-medium text-gray-400 sm:text-[10px]">Lumina recommendation's</span>
                  <span className="shrink-0 text-[9px] font-semibold text-cyan-600 sm:text-[10px]">{insight.action}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
      
          <button type="button" className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-cyan-600 transition hover:text-cyan-800 sm:text-xs">
            View analysis
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

function OfficerDashboard() {
    return(
        <>
  <section className="w-full">
  <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
    {stats.map((stat) => {
      const Icon = stat.icon;

      return (
        <div
          key={stat.title}
          className="
            min-w-0
            min-h-[68px]
            rounded-lg
            border border-gray-200
            bg-white
            p-2
            shadow-sm
            transition
            hover:shadow-md

            sm:relative
            sm:min-h-[82px]
            sm:p-2.5

            lg:min-h-[88px]
            lg:p-3
          "
        >
          {/* Title + Icon */}
          <div className="flex items-start justify-between gap-1 sm:block">
            <p
              className="
                min-w-0
                break-words
                text-[8px]
                font-semibold
                leading-tight
                text-gray-800

                sm:pr-9
                sm:text-[10px]

                lg:text-[11px]
              "
            >
              {stat.title}
            </p>

            {/* Icon */}
            <div
              className={`
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded-md

                sm:absolute
                sm:right-2
                sm:top-1/2
                sm:h-7
                sm:w-7
                sm:-translate-y-1/2

                lg:right-3
                lg:h-8
                lg:w-8

                ${stat.iconStyle}
              `}
            >
              <Icon
                className="
                  h-3
                  w-3
                  sm:h-4
                  sm:w-4
                "
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* Value */}
          <h2
            className="
              mt-1
              text-sm
              font-semibold
              leading-none
              text-gray-950

              sm:text-lg

              lg:text-xl
            "
          >
            {stat.value}
          </h2>

          {/* Description */}
          <div className="mt-1 flex items-start gap-0.5">
            <span
              className="
                break-words
                text-[7px]
                leading-tight
                text-gray-500

                sm:text-[9px]

                lg:text-[10px]
              "
            >
              {stat.description}
            </span>

            {stat.action && (
              <ArrowRight
                size={8}
                className="mt-0.5 shrink-0 text-cyan-600 sm:h-2.5 sm:w-2.5"
              />
            )}
          </div>
        </div>
      );
    })}
  </div>
</section>
    <PlacementBottomSection/>
        </>
    )
}

export const Dashboard = () => {
  const { role } = useUserRole();

  return role === "student" ? <StudentDashboard /> : <OfficerDashboard />;
};


const PlacementBottomSection =()=> {
  return (
    <section className="w-full mt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <LuminaInsights />
        <PlacementTrendChart />

        


        {/* ================================================= */}
        {/* RIGHT COLUMN */}
        {/* ================================================= */}

        <div className="flex min-w-0 flex-col gap-5 lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-5">

          {/* =============================================== */}
          {/* ANNOUNCEMENTS */}
          {/* =============================================== */}

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
                Announcements
              </h2>

              <button className="flex items-center gap-1 text-xs font-medium text-cyan-500">
                View All
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Announcements */}
            <div>
              {announcements.map((announcement, index) => (
                <div
                  key={announcement.text}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-5
                    py-4

                    ${
                      index !== announcements.length - 1
                        ? "border-b border-gray-50"
                        : ""
                    }
                  `}
                >
                  <Megaphone
                    size={18}
                    className="shrink-0 text-gray-500"
                  />

                  <p className="min-w-0 flex-1 truncate text-xs font-medium text-gray-700">
                    {announcement.text}
                  </p>

                  <span className="shrink-0 text-[10px] text-gray-500 sm:text-[11px]">
                    {announcement.date}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* =============================================== */}
          {/* QUICK ACTIONS */}
          {/* =============================================== */}

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <h2 className="mb-4 text-sm font-semibold text-gray-900 sm:text-base">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">

              {/* Create Drive */}
              <button
                className="
                  flex
                  h-16
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-xs
                  font-medium
                  text-gray-700
                  transition
                  hover:border-cyan-100
                  hover:bg-cyan-50
                "
              >
                <CalendarDays
                  size={20}
                  className="text-cyan-600"
                />

                <span>Schedule events</span>
              </button>

              {/* Upload JD */}
             

              {/* Send Notification */}
              <button
                className="
                  flex
                  h-16
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-xs
                  font-medium
                  text-gray-700
                  transition
                  hover:border-orange-100
                  hover:bg-orange-50
                "
              >
                <Send
                  size={20}
                  className="text-orange-500"
                />

                <span> Create announcements</span>
              </button>

              {/* Generate Report */}
              <button
                className="
                  flex
                  h-16
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-xs
                  font-medium
                  text-gray-700
                  transition
                  hover:border-purple-100
                  hover:bg-purple-50
                "
              >
                <CirclePlus size={20}
                  className="text-purple-600"/>
                

                <span>Create Drives</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
