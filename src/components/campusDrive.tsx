import {
  Building2,
  CalendarDays,
  Users,
  CircleCheckBig,
   TrendingUp,
   ChevronDown,
  RotateCcw,
  Search,
   ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const stats = [
  {
    title: "Total Drives",
    value: "12",
    growth: "20%",
    icon: Building2,
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Upcoming Drives",
    value: "4",
    growth: "33%",
    icon: CalendarDays,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Applications",
    value: "1,248",
    growth: "18%",
    icon: Users,
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    title: "Completed Drives",
    value: "6",
    growth: "50%",
    icon: CircleCheckBig,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const driveStatuses = [
  "All",
  "Upcoming",
  "Ongoing",
  "Completed",
];

const departments = [
  "All",
  "CSE",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
];

const jobRoles = [
  "All",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Analyst",
];

const dates = [
  "All",
  "Today",
  "This Week",
  "This Month",
];


export const CampusDrive = () => {
    const navigate = useNavigate();
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [companyName, setCompanyName] = useState("");

    const saveCompany = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!companyName.trim()) {
        return;
      }

      setCompanyName("");
      setIsCompanyModalOpen(false);
    };

    return(
    <>
    <div>
      <div
  className="
    grid
    grid-cols-4
    gap-1.5

    sm:grid-cols-2
    sm:gap-3

    xl:grid-cols-4
  "
>
  {stats.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="
          min-w-0
          rounded-md
          border
          border-gray-200
          bg-white
          px-1.5
          py-2
          shadow-sm

          sm:rounded-lg
          sm:px-3
          sm:py-3
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            text-center

            sm:flex-row
            sm:items-center
            sm:gap-3
            sm:text-left
          "
        >

          {/* Icon */}
          <div
            className={`
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-md

              sm:h-10
              sm:w-10
              sm:rounded-lg

              ${item.bg}
            `}
          >
            <Icon
              size={13}
              className={`
                ${item.iconColor}

                sm:h-5
                sm:w-5
              `}
            />
          </div>

          {/* Content */}
          <div className="min-w-0 w-full">

            <p
              className="
                mt-1
                truncate
                text-[7px]
                font-medium
                text-slate-500

                sm:mt-0
                sm:text-[12px]
              "
            >
              {item.title}
            </p>

            <h3
              className="
                mt-0.5
                text-[14px]
                font-bold
                leading-none
                text-slate-800

                sm:text-[22px]
              "
            >
              {item.value}
            </h3>

            <div
              className="
                mt-1
                flex
                items-center
                justify-center
                gap-0.5
                whitespace-nowrap
                text-[6px]
                text-slate-400

                sm:justify-start
                sm:gap-1
                sm:text-[10px]
              "
            >
              <span className="hidden sm:inline">
                vs last month
              </span>

              <TrendingUp
                size={8}
                className="
                  text-green-500

                  sm:h-[11px]
                  sm:w-[11px]
                "
              />

              <span className="font-semibold text-green-600">
                {item.growth}
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  })}
</div>

<div className="mt-3 flex flex-wrap items-center justify-end gap-2">
  <button
    type="button"
    onClick={() => setIsCompanyModalOpen(true)}
    className="inline-flex h-9 items-center gap-1.5 rounded-md border border-cyan-200 bg-white px-3 text-xs font-semibold text-cyan-600 shadow-sm transition hover:bg-cyan-50"
  >
    <Building2 size={14} />
    Create Company
  </button>
  <button
    type="button"
    onClick={() => navigate("/add_drives")}
    className="inline-flex h-9 items-center gap-1.5 rounded-md bg-cyan-500 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600"
  >
    <CalendarDays size={14} />
    Create Drive
  </button>
</div>

{isCompanyModalOpen && (
  <div
    className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/40 p-4"
    role="presentation"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        setIsCompanyModalOpen(false);
      }
    }}
  >
    <div
      className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-company-title"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="create-company-title" className="text-base font-bold text-slate-900">
            Create Company
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Add a company to use when creating a campus drive.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close create company dialog"
          onClick={() => setIsCompanyModalOpen(false)}
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={saveCompany} className="mt-5">
        <label htmlFor="company-name" className="block text-xs font-semibold text-slate-700">
          Company name
        </label>
        <input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          placeholder="Enter company name"
          required
          autoFocus
          className="mt-1.5 h-10 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
        />
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsCompanyModalOpen(false)}
            className="h-9 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-9 rounded-md bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-600"
          >
            Save Company
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* filters */}
<div
      className="
        w-full
        rounded-lg
        border
        border-gray-200
        bg-white
        p-2
        shadow-sm
         mt-3
        sm:p-2.5
      "
    >

      <div
        className="
          flex
          flex-wrap
          items-end
          gap-2

          lg:flex-nowrap
          lg:gap-2.5
        "
      >

        {/* ================= SEARCH ================= */}

        <div
          className="
            w-full
            lg:w-[210px]
            lg:shrink-0
          "
        >
          <label className="mb-1 block text-[9px] font-medium text-transparent">
            Search
          </label>

          <div className="relative">
            <Search
              size={16}
              strokeWidth={2}
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-600

                max-sm:left-2.5
                max-sm:h-3.5
                max-sm:w-3.5
              "
            />

            <input
              type="text"
              placeholder="Search company or role..."
              className="
                h-9
                w-full
                rounded-md
                border
                border-gray-200
                bg-white
                pl-9
                pr-3
                text-[11px]
                text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-300
                focus:ring-1
                focus:ring-blue-100

                max-sm:h-8
                max-sm:pl-8
                max-sm:text-[9px]
              "
            />
    </div>
    </div>

        {/* ================= DRIVE STATUS ================= */}

        <FilterDropdown
          label="Drive Status"
          options={driveStatuses}
        />


        {/* ================= DEPARTMENT ================= */}

        <FilterDropdown
          label="Department"
          options={departments}
        />


        {/* ================= JOB ROLE ================= */}

        <FilterDropdown
          label="Job Role"
          options={jobRoles}
        />


        {/* ================= DATE ================= */}

        <FilterDropdown
          label="Date"
          options={dates}
        />


        {/* ================= RESET ================= */}

        <div
          className="
            shrink-0
            lg:self-end
          "
        >
          <button
            type="button"
            className="
              flex
              h-9
              items-center
              justify-center
              gap-1.5
              rounded-md
              border
              border-cyan-200
              bg-cyan-50
              px-3
              text-[11px]
              font-medium
              text-cyan-500
              transition
              hover:bg-cyan-100

              max-sm:h-8
              max-sm:gap-1
              max-sm:px-2.5
              max-sm:text-[9px]
            "
          >
            <RotateCcw
              size={14}
              strokeWidth={2}
              className="max-sm:h-3 max-sm:w-3"
            />

            Reset
          </button>
        </div>

      </div>
    </div>
{/* end filters */}

{/* overview */}
<PlacementOverview/>
{/* end overview */}

{/* Table */}
<div className="mt-2">
<Table/></div>
{/* end table */}
    </div>
    </>
    )
}


function FilterDropdown({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-1 block text-[9px] font-medium text-slate-500">
        {label}
      </label>

      <div className="relative">
        <select
          defaultValue={options[0]}
          className="
            h-9
            w-full
            appearance-none
            rounded-md
            border
            border-gray-200
            bg-white
            px-2.5
            pr-8
            text-[11px]
            font-medium
            text-slate-700
            outline-none
            transition
            focus:border-blue-300
            focus:ring-1
            focus:ring-blue-100
            cursor-pointer

            max-sm:h-8
            max-sm:px-2
            max-sm:pr-7
            max-sm:text-[9px]
          "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          strokeWidth={2}
          className="
            pointer-events-none
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            text-slate-500

            max-sm:right-2
            max-sm:h-3
            max-sm:w-3
          "
        />
      </div>
    </div>
  );
}




// =====================================================
// DATA
// =====================================================

// =====================================================
// COMPONENT
// =====================================================

const PlacementOverview = ()=> {
  return (
    <div
      className="
        mt-3
        grid
        grid-cols-2
        gap-2

        sm:gap-3
      "
    >

      {/* =================================================
          NEED ATTENTION
      ================================================== */}

      {/* <div
        className="
          min-w-0
          overflow-hidden
          rounded-lg
          border
          border-gray-200
          bg-white
          p-3
          shadow-sm

          max-sm:p-2
        "
      >

 
        <div
          className="
            flex
            items-center
            gap-2
            border-b
            border-gray-100
            pb-2

            max-sm:gap-1.5
            max-sm:pb-1.5
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-red-50
              text-red-500

              max-sm:h-6
              max-sm:w-6
            "
          >
            <AlertTriangle
              size={17}
              strokeWidth={2}
              className="
                max-sm:h-3.5
                max-sm:w-3.5
              "
            />
          </div>

          <h2
            className="
              truncate
              text-[14px]
              font-semibold
              text-slate-800

              max-sm:text-[9px]
            "
          >
            Need Attention
          </h2>

        </div>


 
        <div>

          {attentionItems.map((item) => (
            <div
              key={item.title}
              className="
                flex
                min-h-[52px]
                items-center
                gap-2
                border-b
                border-gray-100

                max-sm:min-h-[42px]
                max-sm:gap-1
              "
            >

 
              <div
                className={`
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-md

                  max-sm:h-6
                  max-sm:w-6

                  ${
                    item.type === "danger"
                      ? "bg-red-50 text-red-500"
                      : "bg-orange-50 text-orange-500"
                  }
                `}
              >
                <AlertTriangle
                  size={16}
                  strokeWidth={2}
                  className="
                    max-sm:h-3
                    max-sm:w-3
                  "
                />
              </div>


 
              <div className="min-w-0 flex-1">

                <p
                  className="
                    line-clamp-2
                    text-[10px]
                    font-semibold
                    leading-tight
                    text-slate-700

                    max-sm:text-[6.5px]
                  "
                >
                  {item.title}
                </p>

              </div>


 
              <button
                className="
                  shrink-0
                  rounded-md
                  border
                  border-purple-200
                  bg-purple-50
                  px-2
                  py-1
                  text-[9px]
                  font-medium
                  text-indigo-600

                  max-sm:px-1
                  max-sm:py-0.5
                  max-sm:text-[6px]
                "
              >
                View
              </button>

            </div>
          ))}

        </div>


 
        <div className="pt-2 max-sm:pt-1">

          <button
            className="
              flex
              items-center
              gap-1
              text-[10px]
              font-medium
              text-blue-600

              max-sm:text-[6px]
            "
          >
            View all

            <Eye
              size={12}
              className="
                max-sm:h-2.5
                max-sm:w-2.5
              "
            />
          </button>

        </div>

      </div> */}


      {/* =================================================
          DEPARTMENT-WISE ELIGIBLE STUDENTS
      ================================================== */}

      {/* <div
        className="
          min-w-0
          overflow-hidden
          rounded-lg
          border
          border-gray-200
          bg-white
          p-3
          shadow-sm

          max-sm:p-2
        "
      >

 
        <h2
          className="
            truncate
            text-[14px]
            font-semibold
            text-slate-800

            max-sm:text-[9px]
          "
        >
          Department-wise Eligible Students
        </h2>


 
        <div
          className="
            mt-2
            flex
            min-w-0
            items-center
            gap-2

            max-sm:mt-1
            max-sm:gap-1
          "
        >

          
          <div
            className="
              relative
              flex
              shrink-0
              items-center
              justify-center
            "
          >

            <PieChart
              series={[
                {
                  data: departmentData,

                  innerRadius,

                  outerRadius,

                  paddingAngle: 1,

                  cornerRadius: 1,

                  arcLabel: () => "",

                },
              ]}

              colors={colors}

              width={chartSize}

              height={chartSize}

              hideLegend

              slotProps={{
                tooltip: {
                  trigger: "none",
                },
              }}

              margin={{
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
              }}
            />


 
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                flex
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
              "
            >

              <span
                className="
                  text-[16px]
                  font-bold
                  leading-none
                  text-slate-800

                  max-sm:text-[9px]
                "
              >
                {totalEligible}
              </span>

              <span
                className="
                  mt-0.5
                  text-[9px]
                  font-semibold
                  text-slate-500

                  max-sm:text-[5px]
                "
              >
                Eligible
              </span>

            </div>

          </div>


 

          <div className="min-w-0 flex-1">

            {departmentData.map((department, index) => {

              const percentage =
                (department.value / totalEligible) * 100;

              return (
                <div
                  key={department.id}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5
                    py-1

                    max-sm:gap-1
                    max-sm:py-0.5
                  "
                >

 
                  <span
                    className="
                      h-2.5
                      w-2.5
                      shrink-0
                      rounded-full

                      max-sm:h-1.5
                      max-sm:w-1.5
                    "
                    style={{
                      backgroundColor: colors[index],
                    }}
                  />


 
                  <span
                    className="
                      min-w-0
                      flex-1
                      truncate
                      text-[10px]
                      font-medium
                      text-slate-700

                      max-sm:text-[6px]
                    "
                  >
                    {department.label}
                  </span>


 
                  <span
                    className="
                      shrink-0
                      text-[10px]
                      font-medium
                      text-slate-600

                      max-sm:text-[6px]
                    "
                  >
                    {department.value}
                  </span>


 
                  <span
                    className="
                      hidden
                      shrink-0
                      text-[9px]
                      text-slate-400

                      sm:inline
                    "
                  >
                    ({percentage.toFixed(1)}%)
                  </span>

                </div>
              );
            })}

          </div>

        </div>

      </div> */}

    </div>
  );
}

 const drives = [
  {
    company: "TCS",
    companyFull: "Tata Consultancy Services",
    logo: "tcs",
    role: "Software Engineer",
    ctc: "₹7.5 LPA",
    date: "05 Sep 2026",
    time: "09:00 AM",
    venue: "Seminar Hall",
    eligible: 320,
    applied: 248,
    appliedPercent: "77.5%",
    notApplied: 72,
    notAppliedPercent: "22.5%",
    status: "Upcoming",
  },
  {
    company: "Infosys",
    companyFull: "Infosys Limited",
    logo: "infosys",
    role: "System Engineer",
    ctc: "₹6.5 LPA",
    date: "08 Sep 2026",
    time: "10:00 AM",
    venue: "Auditorium",
    eligible: 280,
    applied: 214,
    appliedPercent: "76.4%",
    notApplied: 66,
    notAppliedPercent: "23.6%",
    status: "Registration Open",
  },
  {
    company: "Zoho",
    companyFull: "Zoho Corporation",
    logo: "zoho",
    role: "Developer",
    ctc: "₹6.0 LPA",
    date: "12 Sep 2026",
    time: "09:30 AM",
    venue: "Lab 3",
    eligible: 180,
    applied: 156,
    appliedPercent: "86.7%",
    notApplied: 24,
    notAppliedPercent: "13.3%",
    status: "Upcoming",
  },
  {
    company: "Accenture",
    companyFull: "Accenture",
    logo: "accenture",
    role: "Analyst",
    ctc: "₹4.5 LPA",
    date: "20 Aug 2026",
    time: "10:00 AM",
    venue: "Main Block",
    eligible: 410,
    applied: 324,
    appliedPercent: "79.0%",
    notApplied: 86,
    notAppliedPercent: "21.0%",
    status: "Completed",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Registration Open":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const Table = ()=>{
    const navigate = useNavigate();

    return(
        <>
        
<div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
  {/* Header */}
  <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
    <h2 className="text-xs font-semibold text-slate-900 sm:text-base">
      Campus Drives
    </h2>

    <button className="flex items-center gap-1.5 rounded-md border border-cyan-300 px-2.5 py-1.5 text-[10px] font-medium text-cyan-600 hover:bg-cyan-50 sm:gap-2 sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm">
      <Download size={13} className="sm:h-4 sm:w-4" />
      Export
    </button>
  </div>

  {/* Responsive table */}
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[950px] border-collapse sm:min-w-[1100px]">
      <thead>
        <tr className="bg-slate-50 text-left">
          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Company
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Job Role
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            CTC
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Date & Time
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Venue
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Eligible
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Applied
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Not Applied
          </th>

          <th className="px-3 py-2 text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Status
          </th>

          <th className="px-3 py-2 text-center text-[10px] font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-xs">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {drives.map((drive) => (
          <tr
            key={drive.company}
            onClick={() => navigate(`/campusdrive/${drive.company.toLowerCase()}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(`/campusdrive/${drive.company.toLowerCase()}`);
              }
            }}
            tabIndex={0}
            role="link"
            aria-label={`Open ${drive.company} drive details`}
            className="cursor-pointer border-t border-gray-200 hover:bg-slate-50/60 focus:bg-indigo-50/40 focus:outline-none"
          >
            {/* Company */}
            <td className="px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div>
                  <p className="text-[10px] font-semibold text-slate-900 sm:text-sm">
                    {drive.company}
                  </p>

                  <p className="text-[9px] text-slate-500 sm:text-xs">
                    {drive.companyFull}
                  </p>
                </div>
              </div>
            </td>

            {/* Job Role */}
            <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-sm">
              {drive.role}
            </td>

            {/* CTC */}
            <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-sm">
              {drive.ctc}
            </td>

            {/* Date */}
            <td className="px-3 py-2 sm:px-4 sm:py-3">
              <p className="text-[10px] font-medium text-slate-700 sm:text-sm">
                {drive.date}
              </p>

              <p className="text-[10px] text-slate-700 sm:text-sm">
                {drive.time}
              </p>
            </td>

            {/* Venue */}
            <td className="px-3 py-2 text-[10px] text-slate-700 sm:px-4 sm:py-3 sm:text-sm">
              {drive.venue}
            </td>

            {/* Eligible */}
            <td className="px-3 py-2 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-3 sm:text-sm">
              {drive.eligible}
            </td>

            {/* Applied */}
            <td className="px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-semibold text-slate-800 sm:text-sm">
                  {drive.applied}
                </span>

                <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-semibold text-green-700 sm:px-2 sm:py-1 sm:text-[11px]">
                  {drive.appliedPercent}
                </span>
              </div>
            </td>

            {/* Not Applied */}
            <td className="px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] font-semibold text-slate-800 sm:text-sm">
                  {drive.notApplied}
                </span>

                <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-semibold text-red-600 sm:px-2 sm:py-1 sm:text-[11px]">
                  {drive.notAppliedPercent}
                </span>
              </div>
            </td>

            {/* Status */}
            <td className="px-3 py-2 sm:px-4 sm:py-3">
              <span
                className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-semibold sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs ${getStatusStyle(
                  drive.status
                )}`}
              >
                {drive.status}
              </span>
            </td>

            {/* Actions */}
            <td className="px-3 py-2 text-center sm:px-4 sm:py-3">
              <button
                type="button"
                aria-label={`More actions for ${drive.company}`}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-slate-700 hover:bg-gray-100 sm:h-9 sm:w-9 sm:rounded-lg"
              >
                <MoreVertical size={14} className="sm:h-[18px] sm:w-[18px]" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Footer */}
  <div className="flex items-center justify-between gap-2 border-t border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
    <p className="text-[10px] text-slate-500 sm:text-sm">
      Showing 1 to 4 of 12 drives
    </p>

    <div className="flex items-center gap-1 sm:gap-2">
      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-slate-500 hover:bg-gray-50 sm:h-8 sm:w-8 sm:rounded-lg">
        <ChevronLeft size={13} className="sm:h-4 sm:w-4" />
      </button>

      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-indigo-400 bg-indigo-50 text-[10px] font-semibold text-indigo-600 sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
        1
      </button>

      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-slate-700 hover:bg-gray-50 sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
        2
      </button>

      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-slate-700 hover:bg-gray-50 sm:h-8 sm:w-8 sm:rounded-lg sm:text-sm">
        3
      </button>

      <button className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-slate-500 hover:bg-gray-50 sm:h-8 sm:w-8 sm:rounded-lg">
        <ChevronRight size={13} className="sm:h-4 sm:w-4" />
      </button>
    </div>
  </div>
</div>
        </>
    )
}
