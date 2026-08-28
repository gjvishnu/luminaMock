import {
 
  BriefcaseBusiness,
   ChartNoAxesCombined,
  CheckCircle2,
  Clock3,
  Users,
   ArrowRight,
 
  CalendarDays,
  FileUp,
  MoreVertical,
  Megaphone,
  Send,
  Sparkles,
  Upload,
 } from "lucide-react";

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
    iconStyle: "bg-indigo-100 text-indigo-600",
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
    title: "Active Drives",
    value: "16",
    description: "View all drives",
    action: "arrow",
    icon: CalendarDays,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Upcoming Drives",
    value: "08",
    description: "Next 30 days",
    icon: Clock3,
    iconStyle: "bg-blue-100 text-blue-600",
  },
   {
    title: "Total drives",
    value: "50",
    description: "for this quater",
    icon: ChartNoAxesCombined,
    iconStyle: "bg-blue-100 text-blue-600",
  },
];


const avatarUrl = "https://placehold.net/avatar.svg";

type Drive = {
  company: string;
  role: string;
  companyName: string;
  date: string;
  eligible: string;
  applied: string;
  status: "Active" | "Upcoming" | "Completed";
};

const drives: Drive[] = [
  {
    company: "TCS",
    role: "Ninja Hiring 2025",
    companyName: "Tata Consultancy Services",
    date: "20 May 2025",
    eligible: "1,240",
    applied: "980",
    status: "Active",
  },
  {
    company: "Infosys",
    role: "Systems Engineer",
    companyName: "Infosys Limited",
    date: "25 May 2025",
    eligible: "890",
    applied: "650",
    status: "Active",
  },
  {
    company: "Wipro",
    role: "Project Engineer",
    companyName: "Wipro Technologies",
    date: "02 Jun 2025",
    eligible: "760",
    applied: "420",
    status: "Upcoming",
  },
   
   
];

const recommendedStudents = [
  {
    name: "Arun Prakash",
    cgpa: "9.1",
    skillMatch: "92%",
    overallMatch: "94%",
    applicationStatus: "Applied",
  },
   
  {
    name: "Karthik Raja",
    cgpa: "8.4",
    skillMatch: "74%",
    overallMatch: "81%",
    applicationStatus: "Not applied ",
  },
  {
    name: "Rahul Verma",
    cgpa: "7.8",
    skillMatch: "52%",
    overallMatch: "68%",
    applicationStatus: "Applied",
  },
  {
    name: "Sneha Iyer",
    cgpa: "8.2",
    skillMatch: "48%",
    overallMatch: "63%",
    applicationStatus: "Not applied ",
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

function getStatusStyle(status: Drive["status"]) {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-600";

    case "Upcoming":
      return "bg-blue-50 text-blue-600";

    case "Completed":
      return "bg-gray-100 text-gray-600";

    default:
      return "bg-gray-100 text-gray-600";
  }
}




export const Dashboard = ()=>{
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
                className="mt-0.5 shrink-0 text-indigo-600 sm:h-2.5 sm:w-2.5"
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


const PlacementBottomSection =()=> {
  return (
    <section className="w-full mt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* ================================================= */}
        {/* RECENT CAMPUS DRIVES */}
        {/* ================================================= */}

      
<div className="min-w-0 overflow-hidden max-h-[550px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">

  {/* Header */}
  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5 sm:py-4">
    <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
      Recent Campus Drives
    </h2>

    <button className="flex items-center gap-1 text-[10px] font-medium text-cyan-500 transition hover:text-cyan-700 sm:text-xs">
      View All Drives
      <ArrowRight size={13} />
    </button>
  </div>

  {/* Drive List */}
  <div>
    {drives.map((drive, index) => (
      <div
        key={`${drive.company}-${drive.role}`}
        className={`
          px-4
          py-2.5

          sm:px-5
          sm:py-4

          transition
          hover:bg-gray-50

          ${
            index !== drives.length - 1
              ? "border-b border-gray-100"
              : ""
          }
        `}
      >

        {/* ================= MAIN ROW ================= */}

        <div className="flex items-center justify-between gap-2 sm:gap-3">

          {/* Company + Role */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">

            {/* Company Logo */}
            <div className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-gray-100
              bg-white

              sm:h-10
              sm:w-10
            ">
              <img
                src={avatarUrl}
                alt={drive.company}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">

              {/* Company Name */}
              <p className="
                text-[10px]
                font-semibold
                text-cyan-500

                sm:text-sm
              ">
                {drive.company}
              </p>

              {/* Job */}
              <p className="
                mt-0
                truncate
                text-[10px]
                font-semibold
                leading-tight
                text-gray-900

                sm:mt-0.5
                sm:text-sm
              ">
                {drive.role}
              </p>

              {/* Full Company Name */}
              <p className="
                mt-0
                truncate
                text-[8px]
                leading-tight
                text-gray-500

                sm:mt-0.5
                sm:text-xs
              ">
                {drive.companyName}
              </p>

            </div>
          </div>

          {/* Menu */}
          <button className="
            shrink-0
            text-gray-400
            transition
            hover:text-gray-700
          ">
            <MoreVertical
              size={14}
              className="sm:h-[17px] sm:w-[17px]"
            />
          </button>

        </div>


        {/* ================= DETAILS ================= */}

        <div
          className="
            mt-2
            grid
            grid-cols-2
            gap-x-3
            gap-y-1.5

            sm:mt-4
            sm:grid-cols-4
            sm:gap-x-4
            sm:gap-y-3

            lg:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* Date */}
          <div>
            <p className="
              text-[8px]
              font-medium
              leading-none
              text-gray-400

              sm:text-[11px]
            ">
              Date
            </p>

            <p className="
              mt-0.5
              text-[9px]
              font-medium
              leading-tight
              text-gray-700

              sm:mt-1
              sm:text-xs
            ">
              {drive.date}
            </p>
          </div>


          {/* Eligible */}
          <div>
            <p className="
              text-[8px]
              font-medium
              leading-none
              text-gray-400

              sm:text-[11px]
            ">
              Eligible
            </p>

            <p className="
              mt-0.5
              text-[9px]
              font-medium
              leading-tight
              text-gray-700

              sm:mt-1
              sm:text-xs
            ">
              {drive.eligible}
            </p>
          </div>


          {/* Applied */}
          <div>
            <p className="
              text-[8px]
              font-medium
              leading-none
              text-gray-400

              sm:text-[11px]
            ">
              Applied
            </p>

            <p className="
              mt-0.5
              text-[9px]
              font-medium
              leading-tight
              text-gray-700

              sm:mt-1
              sm:text-xs
            ">
              {drive.applied}
            </p>
          </div>


          {/* Status */}
          <div>
            <p className="
              text-[8px]
              font-medium
              leading-none
              text-gray-400

              sm:text-[11px]
            ">
              Status
            </p>

            <span
              className={`
                mt-0.5
                inline-flex
                rounded-md
                px-1.5
                py-0.5
                text-[8px]
                leading-none
                font-semibold

                sm:mt-1
                sm:px-2
                sm:py-1
                sm:text-[11px]

                ${getStatusStyle(drive.status)}
              `}
            >
              {drive.status}
            </span>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

        {/* ================================================= */}
        {/* JD BASED RECOMMENDATIONS */}
        {/* ================================================= */}

        <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              Recommendations for active drives
            </h2>

            <button className="flex items-center gap-1 text-xs font-medium text-cyan-500">
              View All
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Job */}
          <div className="border-b border-gray-100 p-5">

            <div className="flex items-start justify-between gap-3">

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <Sparkles size={21} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    Software Developer
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    ABC Technologies
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-md bg-green-50 px-2.5 py-1.5 text-[10px] font-semibold text-green-600 sm:text-xs">
                92% Match
              </span>
            </div>

            <p className="mt-4 text-[10px] leading-5 text-gray-500 sm:text-xs">
              <span className="font-medium text-gray-700">
                Skills:
              </span>{" "}
              React, Node.js, TypeScript, PostgreSQL
            </p>

            <p className="text-[10px] leading-5 text-gray-500 sm:text-xs">
              <span className="font-medium text-gray-700">
                Min CGPA:
              </span>{" "}
              7.5
              <span className="mx-2">|</span>
              <span className="font-medium text-gray-700">
                Eligible:
              </span>{" "}
              CSE, IT
            </p>
          </div>

          <div className="overflow-x-auto">
            {/* Table Header */}
            <div
              className="
                grid
                grid-cols-[minmax(95px,1fr)_34px_42px_44px_76px]
                items-center
                gap-1
                bg-gray-50
                px-2
                py-2.5
                text-[9px]
                font-semibold
                text-gray-500
                sm:grid-cols-[minmax(100px,1fr)_44px_50px_55px_82px]
                sm:px-3
                sm:text-[10px]
              "
            >
              <span>Student</span>
              <span>CGPA</span>
              <span>Skills</span>
              <span>Match</span>
              <span>Status</span>
            </div>

            {/* Students */}
            <div>
              {recommendedStudents.map((student) => (
                <div
                  key={student.name}
                  className="
                    grid
                    grid-cols-[minmax(95px,1fr)_34px_42px_44px_76px]
                    items-center
                    gap-1
                    border-b
                    border-gray-50
                    px-2.5
                    py-3
                    sm:grid-cols-[minmax(100px,1fr)_44px_50px_55px_82px]
                    sm:px-3
                  "
                >
                  {/* Student */}
                  <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">

                    <img
                      src={avatarUrl}
                      alt={student.name}
                      className="h-6 w-6 shrink-0 rounded-full object-cover sm:h-7 sm:w-7"
                    />

                    <span className="truncate text-[9px] font-semibold text-gray-800 sm:text-xs">
                      {student.name}
                    </span>
                  </div>

                  {/* CGPA */}
                  <span className="text-[9px] font-medium text-gray-700 sm:text-xs">
                    {student.cgpa}
                  </span>

                  {/* Skills */}
                  <span className="text-[9px] font-medium text-gray-700 sm:text-xs">
                    {student.skillMatch}
                  </span>

                  {/* Match */}
                  <span className="w-fit rounded-md bg-green-50 px-1.5 py-1 text-[9px] font-semibold text-green-600 sm:px-2 sm:text-xs">
                    {student.overallMatch}
                  </span>

                  {/* Application status */}
                  <span className={`w-fit rounded-md px-1.5 py-1 text-[8px] font-semibold leading-tight sm:px-2 sm:text-[10px] ${student.applicationStatus === "Applied" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                    {student.applicationStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4">
            <button
              className="
                flex
                w-full
                items-center
                justify-center
                gap-1.5
                rounded-lg
                border
                border-gray-200
                py-2.5
                text-xs
                font-medium
                text-cyan-500
                transition
                hover:bg-indigo-50
              "
            >
              View All Recommended Students
              <ArrowRight size={14} />
            </button>
          </div>
        </div>


        {/* ================================================= */}
        {/* RIGHT COLUMN */}
        {/* ================================================= */}

        <div className="flex min-w-0 flex-col gap-5">

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
                  hover:border-indigo-100
                  hover:bg-indigo-50
                "
              >
                <CalendarDays
                  size={20}
                  className="text-indigo-600"
                />

                <span>Create Drive</span>
              </button>

              {/* Upload JD */}
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
                  hover:border-green-100
                  hover:bg-green-50
                "
              >
                <Upload
                  size={20}
                  className="text-green-600"
                />

                <span>Upload JD</span>
              </button>

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

                <span>Send Notification</span>
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
                <FileUp
                  size={20}
                  className="text-purple-600"
                />

                <span>Generate Report</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
