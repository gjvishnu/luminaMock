import {
   
  Search,
  RotateCcw,AlertTriangle, FileText, UserRound, Ban, ArrowRight , ChevronDown,
 
  Eye,
  MoreVertical,
} from "lucide-react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery } from "@mui/material";
export const Students = ()=>{


const departments = [
  "All Departments",
  "B.E CSE",
  "B.E ECE",
  "B.E Civil",
  "B.E Mechanical",
  "B.E EEE",
  "BCA",
  "B.Sc CS",
  "MBA",
  "MCA",
];

const batches = [
  "All Batches",
  "2022 - 2026",
  "2023 - 2027",
  "2024 - 2028",
  "2025 - 2029",
];

const cgpaRanges = [
  "All CGPA",
  "Below 6.0",
  "6.0 - 6.9",
  "7.0 - 7.9",
  "8.0 - 8.9",
  "9.0 - 10.0",
];

const placementStatuses = [
  "All Status",
  "Not Placed",
  "Placed",
  "In Process",
  "Not Eligible",
];

const backlogOptions = [
  "All",
  "No Backlogs",
  "1 Backlog",
  "2 Backlogs",
  "3+ Backlogs",
];

const departmentData = [
  {
    id: 0,
    value: 286,
    label: "Computer Science (CSE)",
  },
  {
    id: 1,
    value: 230,
    label: "Electronics (ECE)",
  },
  {
    id: 2,
    value: 168,
    label: "Electrical (EEE)",
  },
  {
    id: 3,
    value: 119,
    label: "Mechanical (MECH)",
  },
  {
    id: 4,
    value: 91,
    label: "Civil Engineering",
  },
  {
    id: 5,
    value: 88,
    label: "Other Departments",
  },
];

const attentionItems = [
  {
    title: "Low CGPA (< 6.5)",
    description: "Students with CGPA less than 6.5",
    count: 182,
    type: "danger",
    icon: AlertTriangle,
  },
  {
    title: "Active Backlogs",
    description: "Students having active backlogs",
    count: 262,
    type: "warning",
    icon: AlertTriangle,
  },
  {
    title: "No Resume Uploaded",
    description: "Students who haven't uploaded resume",
    count: 94,
    type: "warning",
    icon: FileText,
  },
  {
    title: "Incomplete Profile",
    description: "Students with profile completion < 80%",
    count: 137,
    type: "purple",
    icon: UserRound,
  },
  {
    title: "No Drive Applications",
    description: "Eligible students who haven't applied",
    count: 218,
    type: "blue",
    icon: Ban,
  },
];

const colors = [
  "#3B82F6",
  "#45C484",
  "#FDBA2D",
  "#9467C7",
  "#ED7181",
  "#3BAFD1",
];

const students = [
  {
    name: "Rahul Kumar",
    registerNo: "22CS101",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: 8.72,
    backlogs: 0,
    skills: ["React", "Python", "Node.js", "MongoDB", "Express", "TypeScript", "Git"],
    placement: "Placed",
    drives: 8,
    resume: "Uploaded",
    profile: 96,
  },
  {
    name: "Arun M",
    registerNo: "22EC056",
    department: "ECE",
    batch: "2022 - 2026",
    cgpa: 7.45,
    backlogs: 1,
    skills: ["Python", "SQL", "MATLAB", "C", "Embedded"],
    placement: "Unplaced",
    drives: 5,
    resume: "Uploaded",
    profile: 82,
  },
  {
    name: "Kiran S",
    registerNo: "22ME033",
    department: "MECH",
    batch: "2022 - 2026",
    cgpa: 6.12,
    backlogs: 3,
    skills: ["AutoCAD", "SolidWorks", "CATIA", "CNC", "ANSYS", "Creo"],
    placement: "Not Eligible",
    drives: 0,
    resume: "Not Uploaded",
    profile: 45,
  },
  {
    name: "Priya N",
    registerNo: "22CS118",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: 8.91,
    backlogs: 0,
    skills: ["React", "TypeScript", "Node.js", "Next.js", "Git", "MongoDB"],
    placement: "Interview",
    drives: 7,
    resume: "Uploaded",
    profile: 93,
  },
  {
    name: "Vignesh P",
    registerNo: "22EE077",
    department: "EEE",
    batch: "2022 - 2026",
    cgpa: 7.88,
    backlogs: 1,
    skills: ["Python", "MATLAB", "Power BI", "Excel"],
    placement: "Shortlisted",
    drives: 6,
    resume: "Uploaded",
    profile: 89,
  },
];

const profileImage =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
 
  const totalStudents = departmentData.reduce(
    (total, item) => total + item.value,
    0
  );
  const isMobile = useMediaQuery("(max-width: 639px)");

const chartSize = isMobile ? 120 : 220;
const innerRadius = isMobile ? 28 : 52;
const outerRadius = isMobile ? 48 : 88;
    return(
 <>
 <div className="">
  <div className="w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
    
     <div
  className="
    grid
    grid-cols-4
    gap-x-1.5
    gap-y-1.5

    lg:flex
    lg:items-end
    lg:gap-x-3
    lg:gap-y-0
  "
>
  {/* Department */}
  <FilterSelect
    label="Department"
    options={departments}
  />

  {/* Batch */}
  <FilterSelect
    label="Batch"
    options={batches}
  />

  {/* CGPA */}
  <FilterSelect
    label="CGPA Range"
    options={cgpaRanges}
  />

  {/* Placement Status */}
  <FilterSelect
    label="Placement Status"
    options={placementStatuses}
  />

  {/* Backlogs */}
  <FilterSelect
    label="Backlogs"
    options={backlogOptions}
  />

  {/* Search */}
  <div className="min-w-0 lg:flex-1">
    <label
      className="
        mb-1 block
        text-[11px]
        font-medium
        text-gray-700

        max-sm:mb-0.5
        max-sm:text-[7px]
      "
    >
      Search Student
    </label>

    <div className="relative">
      <input
        type="text"
        placeholder="Search student..."
        className="
          h-9
          w-full
          rounded-md
          border
          border-gray-200
          bg-white
          pl-3
          pr-9
          text-xs
          text-gray-700
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-gray-400

          max-sm:h-7
          max-sm:rounded-[4px]
          max-sm:px-1.5
          max-sm:pr-5
          max-sm:text-[7px]
        "
      />

      <Search
        size={16}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-gray-500

          max-sm:right-1
          max-sm:h-2.5
          max-sm:w-2.5
        "
      />
    </div>
  </div>

  {/* Reset */}
  <div className="min-w-0">
    <label
      className="
        mb-1 block
        text-[11px]
        font-medium
        text-gray-700

        max-sm:mb-0.5
        max-sm:text-[7px]
      "
    >
      &nbsp;
    </label>

    <button
      className="
        flex
        h-9
        w-full
        items-center
        justify-center
        gap-1.5
        rounded-md
        border
        border-gray-200
        bg-white
        px-3
        text-xs
        font-medium
        text-gray-600
        transition
        hover:bg-gray-50

        lg:w-auto

        max-sm:h-7
        max-sm:gap-0.5
        max-sm:rounded-[4px]
        max-sm:px-1.5
        max-sm:text-[7px]
      "
    >
      <RotateCcw
        size={14}
        className="max-sm:h-2.5 max-sm:w-2.5"
      />

      Reset
    </button>
  </div>
</div>
    </div>

    {/* reports */}
     <div className="grid grid-cols-2 gap-2 mt-3 xl:grid-cols-[1.15fr_0.85fr] sm:gap-3">

  {/* ================= DEPARTMENT CHART - LEFT ================= */}
  <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm max-sm:p-2">

    <h2 className="mb-1 text-[14px] font-semibold text-slate-800 max-sm:text-[10px]">
      Department-wise Eligible Students
    </h2>

    <div className="flex flex-col items-center gap-2 lg:flex-row lg:items-center">

      {/* =====================================================
          DONUT CHART
      ====================================================== */}

      <div
        className="
          relative
          flex
          h-[230px]
          w-full
          shrink-0
          items-center
          justify-center

          lg:w-[230px]

          max-sm:h-[120px]
        "
      >

       <PieChart
  series={[
    {
      data: departmentData,

      innerRadius: innerRadius,

      outerRadius: outerRadius,

      paddingAngle: 1,

      cornerRadius: 2,
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
/>


        {/* =====================================================
            CENTER CONTENT
        ====================================================== */}

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
              text-[18px]
              font-bold
              leading-none
              text-slate-800

              max-sm:text-[10px]
            "
          >
            {totalStudents}
          </span>


          <span
            className="
              mt-1
              text-center
              text-[9px]
              leading-tight
              text-slate-500

              max-sm:mt-0.5
              max-sm:text-[5px]
            "
          >
            Total Eligible
            <br />
            Students
          </span>

        </div>

      </div>


      {/* =====================================================
          DEPARTMENT TABLE
      ====================================================== */}

      <div className="w-full min-w-0 flex-1">

        {/* Header */}

        <div
          className="
            grid
            grid-cols-[1fr_80px_55px]
            border-b
            border-gray-100
            pb-1.5
            text-[9px]
            font-semibold
            text-slate-500

            max-sm:grid-cols-[1fr_35px_25px]
            max-sm:pb-1
            max-sm:text-[6px]
          "
        >

          <span>
            Department
          </span>

          <span className="text-right">
            Eligible
          </span>

          <span className="text-right">
            %
          </span>

        </div>


        {/* Rows */}

        <div>

          {departmentData.map((department, index) => {

            const percentage =
              (department.value / totalStudents) * 100;

            return (
              <div
                key={department.id}
                className="
                  grid
                  min-h-[32px]
                  grid-cols-[1fr_80px_55px]
                  items-center
                  border-b
                  border-gray-100
                  text-[10px]

                  max-sm:min-h-[20px]
                  max-sm:grid-cols-[1fr_35px_25px]
                  max-sm:text-[6px]
                "
              >

                {/* Department */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5

                    max-sm:gap-1
                  "
                >

                  <span
                    className="
                      h-3
                      w-3
                      shrink-0
                      rounded-full

                      max-sm:h-1
                      max-sm:w-1
                    "
                    style={{
                      backgroundColor: colors[index],
                    }}
                  />

                  <span className="truncate text-slate-600">
                    {department.label}
                  </span>

                </div>


                {/* Count */}

                <span className="text-right font-medium text-slate-600">
                  {department.value}
                </span>


                {/* Percentage */}

                <span className="text-right font-medium text-slate-500">
                  {percentage.toFixed(1)}%
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </div>


    {/* =====================================================
        FOOTER
    ====================================================== */}

    <div
      className="
        mt-1.5
        border-t
        border-gray-100
        pt-2

        max-sm:mt-1
        max-sm:pt-1
      "
    >

      <button
        className="
          flex
          items-center
          gap-1
          text-[10px]
          font-medium
          text-blue-600
          hover:text-blue-700

          max-sm:text-[7px]
        "
      >
        View full report

        <ArrowRight
          size={12}
          className="max-sm:h-2.5 max-sm:w-2.5"
        />
      </button>

    </div>

  </div>


  {/* =====================================================
      NEED ATTENTION - RIGHT
  ====================================================== */}

  <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-3 shadow-sm max-sm:p-2">

    <h2 className="mb-2 text-[14px] font-semibold text-slate-800 max-sm:mb-1.5 max-sm:text-[10px]">
      Need Attention
    </h2>

    <div className="space-y-1">

      {attentionItems.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              flex
              min-h-[54px]
              items-center
              gap-2
              rounded-md
              border
              border-gray-100
              bg-white
              px-2
              py-1.5
              shadow-[0_1px_3px_rgba(0,0,0,0.03)]

              max-sm:min-h-[32px]
              max-sm:gap-1
              max-sm:px-1
              max-sm:py-1
            "
          >

            {/* Icon */}

            <div
              className={`
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-md

                max-sm:h-5
                max-sm:w-5

                ${
                  item.type === "danger"
                    ? "bg-red-50 text-red-500"
                    : item.type === "warning"
                    ? "bg-orange-50 text-orange-500"
                    : item.type === "purple"
                    ? "bg-purple-50 text-purple-500"
                    : "bg-blue-50 text-blue-500"
                }
              `}
            >

              <Icon
                size={16}
                strokeWidth={2}
                className="max-sm:h-2.5 max-sm:w-2.5"
              />

            </div>


            {/* Text */}

            <div className="min-w-0 flex-1">

              <p className="truncate text-[11px] font-semibold text-slate-700 max-sm:text-[7px]">
                {item.title}
              </p>

              <p className="mt-0.5 truncate text-[9px] text-slate-400 max-sm:text-[6px]">
                {item.description}
              </p>

            </div>


            {/* Count */}

            <div
              className={`
                shrink-0
                text-right
                text-[12px]
                font-semibold

                max-sm:text-[7px]

                ${
                  item.type === "danger"
                    ? "text-red-500"
                    : item.type === "warning"
                    ? "text-orange-500"
                    : item.type === "purple"
                    ? "text-indigo-500"
                    : "text-blue-500"
                }
              `}
            >

              {item.count}

              <span className="ml-0.5 text-[9px] font-normal text-slate-400 max-sm:text-[5px]">
                Students
              </span>

            </div>

          </div>
        );
      })}

    </div>


    {/* Footer */}

    <div
      className="
        mt-1.5
        border-t
        border-gray-100
        pt-2

        max-sm:mt-1
        max-sm:pt-1
      "
    >

      <button
        className="
          flex
          items-center
          gap-1
          text-[10px]
          font-medium
          text-blue-600
          hover:text-blue-700

          max-sm:text-[7px]
        "
      >

        View all students

        <ArrowRight
          size={12}
          className="max-sm:h-2.5 max-sm:w-2.5"
        />

      </button>

    </div>

  </div>

</div>
    {/* reports end */}

    {/* table */}
    <div className="mt-2">
    <StudentTable/>
    </div>
      {/*  */}
      </div>
 </>
    )
}

function FilterSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div
      className="
        min-w-0

        lg:flex-1
      "
    >
      <label
        className="
          mb-1
          block
          truncate
          text-[11px]
          font-medium
          text-gray-700

          max-sm:mb-0.5
          max-sm:text-[7px]
        "
      >
        {label}
      </label>

      <div className="relative">
        <select
          className="
            h-9
            w-full
            min-w-0
            appearance-none
            rounded-md
            border
            border-gray-200
            bg-white
            px-2.5
            pr-8
            text-xs
            text-gray-600
            outline-none
            transition
            focus:border-gray-400
            cursor-pointer

            max-sm:h-7
            max-sm:rounded-[4px]
            max-sm:px-1
            max-sm:pr-4
            max-sm:text-[7px]
          "
          defaultValue={options[0]}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className="
            pointer-events-none
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            text-gray-400

            max-sm:right-1
            max-sm:h-2.5
            max-sm:w-2.5
          "
        />
      </div>
    </div>
  );
}
 
const profileImage =
  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

const students = [
  {
    name: "Rahul Kumar",
    reg: "22CS101",
    dept: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.72",
    backlogs: 0,
    skills: "React, Python",
    moreSkills: 5,
    status: "Placed",
    drives: 8,
    resume: "Uploaded",
    profile: 96,
  },
  {
    name: "Arun M",
    reg: "22EC056",
    dept: "ECE",
    batch: "2022 - 2026",
    cgpa: "7.45",
    backlogs: 1,
    skills: "Python, SQL",
    moreSkills: 3,
    status: "Unplaced",
    drives: 5,
    resume: "Uploaded",
    profile: 82,
  },
  {
    name: "Kiran S",
    reg: "22ME033",
    dept: "MECH",
    batch: "2022 - 2026",
    cgpa: "6.12",
    backlogs: 3,
    skills: "AutoCAD, SolidWorks",
    moreSkills: 4,
    status: "Not Eligible",
    drives: 0,
    resume: "Not Uploaded",
    profile: 45,
  },
  {
    name: "Priya N",
    reg: "22CS118",
    dept: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.91",
    backlogs: 0,
    skills: "React, TypeScript",
    moreSkills: 4,
    status: "Interview",
    drives: 7,
    resume: "Uploaded",
    profile: 93,
  },
  {
    name: "Vignesh P",
    reg: "22EE077",
    dept: "EEE",
    batch: "2022 - 2026",
    cgpa: "7.88",
    backlogs: 1,
    skills: "Python, MATLAB",
    moreSkills: 2,
    status: "Shortlisted",
    drives: 6,
    resume: "Uploaded",
    profile: 89,
  },
];

const statusStyles: Record<string, string> = {
  Placed: "bg-green-50 text-green-600",
  Unplaced: "bg-yellow-50 text-yellow-600",
  "Not Eligible": "bg-red-50 text-red-500",
  Interview: "bg-blue-50 text-blue-600",
  Shortlisted: "bg-purple-50 text-purple-600",
};

function getCgpaStyle(cgpa: string) {
  const value = Number(cgpa);

  if (value >= 8) return "bg-green-50 text-green-600";
  if (value >= 7) return "bg-yellow-50 text-yellow-600";

  return "bg-red-50 text-red-500";
}

export default function StudentTable() {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
{/* Header */}
<div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
  <h2 className="text-xs sm:text-sm font-semibold text-gray-900">
    Student Directory (1,248)
  </h2>

  <div className="flex gap-1.5 sm:gap-2">
    <button className="rounded-md sm:rounded-lg border border-gray-200 px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-medium text-gray-600">
      Export
    </button>
  </div>
</div>

{/* ONLY THIS PART SCROLLS */}
<div className="w-full min-w-0 overflow-x-auto">
  <div className="min-w-[1050px]">

    {/* Header Row */}
    <div className="flex items-center border-b border-gray-200 bg-gray-50 px-3 py-2 sm:px-4 sm:py-3">

      <div className="w-[30px] sm:w-[35px] shrink-0">
        <input
          type="checkbox"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-indigo-600"
        />
      </div>

      <div className="w-[160px] sm:w-[180px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Student
      </div>

      <div className="w-[120px] sm:w-[130px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Register No.
      </div>

      <div className="w-[90px] sm:w-[100px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Department
      </div>

      <div className="w-[110px] sm:w-[125px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Batch
      </div>

      <div className="w-[70px] sm:w-[80px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        CGPA
      </div>

      <div className="w-[70px] sm:w-[80px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Backlogs
      </div>

      <div className="w-[190px] sm:w-[210px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Skills
      </div>

      <div className="w-[120px] sm:w-[135px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Placement Status
      </div>

      <div className="w-[70px] sm:w-[80px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Drives
      </div>

      <div className="w-[110px] sm:w-[125px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Resume
      </div>

      <div className="w-[80px] sm:w-[90px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Profile
      </div>

      <div className="w-[80px] sm:w-[90px] shrink-0 text-[10px] sm:text-xs font-semibold text-gray-500">
        Actions
      </div>
    </div>

    {/* Students */}
    {students.map((student) => (
      <div
        key={student.reg}
        className="flex items-center border-b border-gray-100 px-3 py-2 sm:px-4 sm:py-3 last:border-0 hover:bg-gray-50"
      >

        {/* Checkbox */}
        <div className="w-[30px] sm:w-[35px] shrink-0">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-indigo-600"
          />
        </div>

        {/* Student */}
        <div className="w-[160px] sm:w-[180px] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img
              src={profileImage}
              alt={student.name}
              className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full object-cover"
            />

            <span className="whitespace-nowrap text-[10px] sm:text-xs font-semibold text-gray-800">
              {student.name}
            </span>
          </div>
        </div>

        {/* Register */}
        <div className="w-[120px] sm:w-[130px] shrink-0 text-[10px] sm:text-xs text-gray-600">
          {student.reg}
        </div>

        {/* Department */}
        <div className="w-[90px] sm:w-[100px] shrink-0 text-[10px] sm:text-xs text-gray-600">
          {student.dept}
        </div>

        {/* Batch */}
        <div className="w-[110px] sm:w-[125px] shrink-0 text-[10px] sm:text-xs text-gray-600">
          {student.batch}
        </div>

        {/* CGPA */}
        <div className="w-[70px] sm:w-[80px] shrink-0">
          <span
            className={`rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold ${getCgpaStyle(
              student.cgpa
            )}`}
          >
            {student.cgpa}
          </span>
        </div>

        {/* Backlogs */}
        <div className="w-[70px] sm:w-[80px] shrink-0 text-[10px] sm:text-xs text-gray-600">
          {student.backlogs}
        </div>

        {/* Skills */}
        <div className="w-[190px] sm:w-[210px] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-[10px] sm:text-xs text-gray-600">
            <span>{student.skills}</span>

            <span className="font-semibold text-blue-600">
              +{student.moreSkills} skills
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="w-[120px] sm:w-[135px] shrink-0">
          <span
            className={`rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold ${statusStyles[student.status]}`}
          >
            {student.status}
          </span>
        </div>

        {/* Drives */}
        <div className="w-[70px] sm:w-[80px] shrink-0 text-[10px] sm:text-xs text-gray-600">
          {student.drives}
        </div>

        {/* Resume */}
        <div className="w-[110px] sm:w-[125px] shrink-0">
          <span
            className={`rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold ${
              student.resume === "Uploaded"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {student.resume}
          </span>
        </div>

        {/* Profile */}
        <div className="w-[80px] sm:w-[90px] shrink-0">
          <div className="w-14 sm:w-16">
            <div className="mb-1 text-[10px] sm:text-xs font-semibold text-gray-700">
              {student.profile}%
            </div>

            <div className="h-1 sm:h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${
                  student.profile < 60
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${student.profile}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-[80px] sm:w-[90px] shrink-0">
          <div className="flex w-fit items-center rounded-md sm:rounded-lg border border-gray-200">
            <button className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-50">
              <Eye size={13} className="sm:w-[15px] sm:h-[15px]" />
            </button>

            <div className="h-4 sm:h-5 w-px bg-gray-200" />

            <button className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-50">
              <MoreVertical size={13} className="sm:w-[15px] sm:h-[15px]" />
            </button>
          </div>
        </div>

      </div>
    ))}
  </div>
</div>

{/* Footer */}
<div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-t border-gray-200 px-3 py-2.5 sm:px-4 sm:py-3">
  <span className="text-[10px] sm:text-xs text-gray-500">
    Showing 1–10 of 1,248 students
  </span>

  <div className="flex items-center gap-1">
    <button className="rounded-md border border-gray-200 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs">
      ←
    </button>

    <button className="rounded-md border border-indigo-300 bg-indigo-50 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs text-indigo-600">
      1
    </button>

    <button className="rounded-md border border-gray-200 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs">
      2
    </button>

    <button className="rounded-md border border-gray-200 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs">
      3
    </button>

    <button className="rounded-md border border-gray-200 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs">
      →
    </button>
  </div>
</div>
    </div>
  );
}