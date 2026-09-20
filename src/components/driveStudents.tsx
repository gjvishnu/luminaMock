import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  Download,
  Eye,
  Home,
  Mail,
  Phone,
  RotateCcw,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type MatchCategory = "high" | "medium" | "low";

interface Student {
  id: number;
  registerNo: string;
  name: string;
  department: string;
  batch: string;
  cgpa: string;
  skills: string[];
  matchScore: number;
  category: MatchCategory;
  email: string;
  phone: string;
  status: string;
  projects?: { title: string; tech: string }[];
}

const highMatchStudents: Student[] = [
  {
    id: 1,
    registerNo: "22CS101",
    name: "Aarav Raj",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "9.21",
    skills: ["Java", "React", "Node.js"],
    matchScore: 98,
    category: "high",
    email: "aarav.raj@college.edu",
    phone: "+91 98765 43210",
    status: "Shortlisted",
    projects: [
      { title: "E-Commerce Microservices", tech: "Java, Spring Boot, React" },
      { title: "Real-time Chat Engine", tech: "Node.js, WebSockets, Redis" },
    ],
  },
  {
    id: 2,
    registerNo: "22CS118",
    name: "Priya K",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "9.05",
    skills: ["Java", "Spring", "SQL"],
    matchScore: 96,
    category: "high",
    email: "priya.k@college.edu",
    phone: "+91 98765 43211",
    status: "Shortlisted",
    projects: [
      { title: "Hospital Management System", tech: "Spring Boot, MySQL" },
    ],
  },
  {
    id: 3,
    registerNo: "22EC056",
    name: "Sneha N",
    department: "ECE",
    batch: "2022 - 2026",
    cgpa: "8.92",
    skills: ["Python", "Machine Learning"],
    matchScore: 95,
    category: "high",
    email: "sneha.n@college.edu",
    phone: "+91 98765 43212",
    status: "Shortlisted",
    projects: [
      { title: "Smart Traffic Vision AI", tech: "Python, OpenCV, PyTorch" },
    ],
  },
  {
    id: 4,
    registerNo: "22IT011",
    name: "Deepak P",
    department: "IT",
    batch: "2022 - 2026",
    cgpa: "8.88",
    skills: ["Java", "AWS", "Docker"],
    matchScore: 94,
    category: "high",
    email: "deepak.p@college.edu",
    phone: "+91 98765 43213",
    status: "Shortlisted",
    projects: [
      { title: "Cloud Deployment Pipeline", tech: "AWS ECS, Docker, Terraform" },
    ],
  },
  {
    id: 5,
    registerNo: "22CS145",
    name: "Nikhil M",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.76",
    skills: ["C++", "DSA", "System Design"],
    matchScore: 93,
    category: "high",
    email: "nikhil.m@college.edu",
    phone: "+91 98765 43214",
    status: "Eligible",
    projects: [
      { title: "Distributed Key-Value Store", tech: "C++, gRPC, Raft" },
    ],
  },
  {
    id: 6,
    registerNo: "22EC089",
    name: "Ishita P",
    department: "ECE",
    batch: "2022 - 2026",
    cgpa: "8.69",
    skills: ["Python", "Data Analysis"],
    matchScore: 92,
    category: "high",
    email: "ishita.p@college.edu",
    phone: "+91 98765 43215",
    status: "Eligible",
    projects: [
      { title: "Stock Market Predictor", tech: "Python, Pandas, Scikit-learn" },
    ],
  },
  {
    id: 7,
    registerNo: "22CS203",
    name: "Ananya K",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.57",
    skills: ["React", "TypeScript", "UI/UX"],
    matchScore: 91,
    category: "high",
    email: "ananya.k@college.edu",
    phone: "+91 98765 43216",
    status: "Eligible",
    projects: [
      { title: "Design System & Component Kit", tech: "React, TypeScript, Tailwind" },
    ],
  },
  {
    id: 8,
    registerNo: "22EE077",
    name: "Rohan V",
    department: "EEE",
    batch: "2022 - 2026",
    cgpa: "8.45",
    skills: ["MATLAB", "Simulink", "Embedded"],
    matchScore: 90,
    category: "high",
    email: "rohan.v@college.edu",
    phone: "+91 98765 43217",
    status: "Eligible",
    projects: [
      { title: "EV Battery Management System", tech: "MATLAB, Simulink, C" },
    ],
  },
  {
    id: 9,
    registerNo: "22CS176",
    name: "Kavya S",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.39",
    skills: ["Python", "SQL", "Power BI"],
    matchScore: 89,
    category: "high",
    email: "kavya.s@college.edu",
    phone: "+91 98765 43218",
    status: "Eligible",
    projects: [
      { title: "Student Performance Analytics", tech: "SQL, Power BI, Python" },
    ],
  },
  {
    id: 10,
    registerNo: "22ME033",
    name: "Sai Kiran",
    department: "MECH",
    batch: "2022 - 2026",
    cgpa: "8.31",
    skills: ["AutoCAD", "SolidWorks"],
    matchScore: 88,
    category: "high",
    email: "sai.kiran@college.edu",
    phone: "+91 98765 43219",
    status: "Eligible",
    projects: [
      { title: "Automated Robotic Arm Joint", tech: "SolidWorks, Ansys" },
    ],
  },
  {
    id: 11,
    registerNo: "22CS215",
    name: "Aditya Verma",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.28",
    skills: ["Java", "Spring Boot", "Kafka"],
    matchScore: 88,
    category: "high",
    email: "aditya.v@college.edu",
    phone: "+91 98765 43220",
    status: "Eligible",
  },
  {
    id: 12,
    registerNo: "22IT045",
    name: "Rhea Sharma",
    department: "IT",
    batch: "2022 - 2026",
    cgpa: "8.25",
    skills: ["Python", "Django", "PostgreSQL"],
    matchScore: 87,
    category: "high",
    email: "rhea.s@college.edu",
    phone: "+91 98765 43221",
    status: "Eligible",
  },
];

const mediumMatchStudents: Student[] = [
  {
    id: 101,
    registerNo: "22CS105",
    name: "Vikas Nair",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "8.12",
    skills: ["Java", "HTML/CSS", "Git"],
    matchScore: 84,
    category: "medium",
    email: "vikas.nair@college.edu",
    phone: "+91 98765 43301",
    status: "Under Review",
  },
  {
    id: 102,
    registerNo: "22EC042",
    name: "Meera Iyer",
    department: "ECE",
    batch: "2022 - 2026",
    cgpa: "7.95",
    skills: ["C++", "Embedded C", "Linux"],
    matchScore: 82,
    category: "medium",
    email: "meera.iyer@college.edu",
    phone: "+91 98765 43302",
    status: "Under Review",
  },
  {
    id: 103,
    registerNo: "22IT033",
    name: "Aditya Sen",
    department: "IT",
    batch: "2022 - 2026",
    cgpa: "7.88",
    skills: ["Python", "Django", "REST APIs"],
    matchScore: 80,
    category: "medium",
    email: "aditya.sen@college.edu",
    phone: "+91 98765 43303",
    status: "Under Review",
  },
  {
    id: 104,
    registerNo: "22CS155",
    name: "Tanvi Deshmukh",
    department: "CSE",
    batch: "2022 - 2026",
    cgpa: "7.82",
    skills: ["JavaScript", "Express", "MongoDB"],
    matchScore: 78,
    category: "medium",
    email: "tanvi.d@college.edu",
    phone: "+91 98765 43304",
    status: "Under Review",
  },
  {
    id: 105,
    registerNo: "22EE034",
    name: "Karthik Raja",
    department: "EEE",
    batch: "2022 - 2026",
    cgpa: "7.76",
    skills: ["C", "PLC", "Microcontrollers"],
    matchScore: 75,
    category: "medium",
    email: "karthik.r@college.edu",
    phone: "+91 98765 43305",
    status: "Under Review",
  },
  {
    id: 106,
    registerNo: "22ME019",
    name: "Harish Kumar",
    department: "MECH",
    batch: "2022 - 2026",
    cgpa: "7.65",
    skills: ["CAD", "Python Basics", "Analysis"],
    matchScore: 72,
    category: "medium",
    email: "harish.k@college.edu",
    phone: "+91 98765 43306",
    status: "Under Review",
  },
];

const lowMatchStudents: Student[] = [
  {
    id: 201,
    registerNo: "22ME012",
    name: "Gautam R",
    department: "MECH",
    batch: "2022 - 2026",
    cgpa: "7.40",
    skills: ["AutoCAD", "Basic C", "MS Office"],
    matchScore: 65,
    category: "low",
    email: "gautam.r@college.edu",
    phone: "+91 98765 43401",
    status: "Training Suggested",
  },
  {
    id: 202,
    registerNo: "22EE021",
    name: "Divya Sharma",
    department: "EEE",
    batch: "2022 - 2026",
    cgpa: "7.15",
    skills: ["Circuit Design", "C Programming"],
    matchScore: 60,
    category: "low",
    email: "divya.s@college.edu",
    phone: "+91 98765 43402",
    status: "Training Suggested",
  },
  {
    id: 203,
    registerNo: "22CIV008",
    name: "Manoj Swamy",
    department: "CIVIL",
    batch: "2022 - 2026",
    cgpa: "6.95",
    skills: ["Surveying", "AutoCAD"],
    matchScore: 54,
    category: "low",
    email: "manoj.s@college.edu",
    phone: "+91 98765 43403",
    status: "Training Suggested",
  },
  {
    id: 204,
    registerNo: "22ME044",
    name: "Pradeep Joshi",
    department: "MECH",
    batch: "2022 - 2026",
    cgpa: "6.80",
    skills: ["Manufacturing", "Quality Control"],
    matchScore: 50,
    category: "low",
    email: "pradeep.j@college.edu",
    phone: "+91 98765 43404",
    status: "Training Suggested",
  },
];

interface DriveMetadata {
  company: string;
  role: string;
  date: string;
  venue: string;
  status: string;
  eligible: number;
  match: {
    high: number;
    medium: number;
    low: number;
  };
}

const driveConfigs: Record<string, DriveMetadata> = {
  tcs: {
    company: "Tata Consultancy Services",
    role: "Software Engineer",
    date: "05 Sep 2026",
    venue: "Main Auditorium",
    status: "Registration Open",
    eligible: 320,
    match: { high: 224, medium: 64, low: 32 },
  },
  infosys: {
    company: "Infosys",
    role: "System Engineer",
    date: "08 Sep 2026",
    venue: "Auditorium",
    status: "Registration Open",
    eligible: 280,
    match: { high: 182, medium: 70, low: 28 },
  },
  zoho: {
    company: "Zoho Corporation",
    role: "Developer",
    date: "12 Sep 2026",
    venue: "Lab 3",
    status: "Registration Open",
    eligible: 180,
    match: { high: 108, medium: 45, low: 27 },
  },
  wipro: {
    company: "Wipro",
    role: "Project Engineer",
    date: "18 Sep 2026",
    venue: "Seminar Hall",
    status: "Upcoming",
    eligible: 240,
    match: { high: 132, medium: 72, low: 36 },
  },
  accenture: {
    company: "Accenture",
    role: "Associate Software Engineer",
    date: "20 Aug 2026",
    venue: "Main Block",
    status: "Completed",
    eligible: 240,
    match: { high: 205, medium: 123, low: 82 },
  },
};

export const DriveStudents = () => {
  const navigate = useNavigate();
  const { driveId } = useParams<{ driveId?: string }>();
  const activeSlug = driveId?.toLowerCase() || "tcs";
  const drive = driveConfigs[activeSlug] || driveConfigs.tcs;

  const [activeTab, setActiveTab] = useState<MatchCategory>("high");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [batchFilter, setBatchFilter] = useState("2022 - 2026");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const studentsForCategory = useMemo(() => {
    if (activeTab === "high") return highMatchStudents;
    if (activeTab === "medium") return mediumMatchStudents;
    return lowMatchStudents;
  }, [activeTab]);

  const filteredStudents = useMemo(() => {
    return studentsForCategory.filter((student) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.registerNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept =
        departmentFilter === "All Departments" || student.department === departmentFilter;

      const matchesBatch =
        batchFilter === "All Batches" || student.batch === batchFilter;

      return matchesSearch && matchesDept && matchesBatch;
    });
  }, [studentsForCategory, searchQuery, departmentFilter, batchFilter]);

  const totalCountForTab =
    activeTab === "high"
      ? drive.match.high
      : activeTab === "medium"
      ? drive.match.medium
      : drive.match.low;

  const handleResetFilters = () => {
    setSearchQuery("");
    setDepartmentFilter("All Departments");
    setBatchFilter("2022 - 2026");
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Register No,Name,Department,CGPA,Skills,Match Score"]
        .concat(
          filteredStudents.map(
            (s) =>
              `"${s.registerNo}","${s.name}","${s.department}","${s.cgpa}","${s.skills.join(", ")}","${s.matchScore}%"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${drive.company.replace(/\s+/g, "_")}_Students.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full space-y-3 pb-8">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-cyan-600 hover:text-cyan-700 transition"
            aria-label="Home"
          >
            <Home size={16} />
          </button>
          <ChevronRight size={13} className="text-slate-400" />
          <button
            type="button"
            onClick={() => navigate("/jdrecommendation")}
            className="text-slate-500 hover:text-cyan-600 font-medium transition cursor-pointer"
          >
            Best fit Recommendation
          </button>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-bold text-slate-900">Drive Students</span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/jdrecommendation")}
          className="inline-flex items-center gap-2 rounded-lg border border-cyan-500 bg-white px-4 py-2 text-xs font-semibold text-sky-800 shadow-sm transition hover:bg-cyan-50 cursor-pointer"
        >
          <ArrowLeft size={16} className="text-sky-800" /> Back to Recommendations
        </button>
      </div>

      {/* Drive Details Summary Banner Card */}
      <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Company Branding & Role Details */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-sky-50 border border-sky-100 shadow-xs">
              <svg viewBox="0 0 100 100" className="h-9 w-9 sm:h-10 sm:w-10">
                <circle cx="50" cy="50" r="46" fill="#0076ce" />
                <g fill="#ffffff">
                  <path d="M26 36 C34 29 66 29 74 36 C67 33 33 33 26 36 Z" />
                  <path d="M43 36 C43 36 39 56 39 68 C39 74 44 76 44 76 C44 76 46 72 46 67 C46 56 48 36 48 36 Z" />
                  <path d="M57 36 C57 36 61 56 61 68 C61 74 56 76 56 76 C56 76 54 72 54 67 C54 56 52 36 52 36 Z" />
                </g>
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {drive.company}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500">{drive.role}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <CalendarDays size={14} className="text-slate-500" />
                  {drive.date}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 size={14} className="text-slate-500" />
                  {drive.venue}
                </span>
                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-200">
                  {drive.status}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-t pt-3 lg:border-t-0 lg:pt-0 border-slate-100">
            {/* Eligible Students */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
                <UserRound size={22} />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight text-slate-900">{drive.eligible}</p>
                <p className="text-[11px] text-slate-500 font-medium">Eligible Students</p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-200" />

            {/* High Match */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-500">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight text-cyan-600">{drive.match.high}</p>
                <p className="text-[11px] text-slate-500 font-medium">
                  High Match ({Math.round((drive.match.high / drive.eligible) * 100)}%)
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-200" />

            {/* Medium Match */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <CircleCheckBig size={22} />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight text-amber-500">{drive.match.medium}</p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Medium Match ({Math.round((drive.match.medium / drive.eligible) * 100)}%)
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-200" />

            {/* Low Match */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="text-xl font-bold leading-tight text-rose-500">{drive.match.low}</p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Low Match ({Math.round((drive.match.low / drive.eligible) * 100)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Student Listing Section */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Search & Filter Toolbar with Match Categories in the same row */}
        <div className="flex flex-wrap items-end justify-between gap-3 p-4">
          <div className="flex flex-wrap items-end gap-3 flex-1">
            {/* Search Input */}
            <div className="relative w-64 lg:w-72">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, register no..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200"
              />
            </div>

            {/* Department Dropdown */}
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold text-slate-500">Department</span>
              <div className="relative">
                <select
                  value={departmentFilter}
                  onChange={(e) => {
                    setDepartmentFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="IT">IT</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>

            {/* Batch Dropdown */}
            <label className="block">
              <span className="mb-1 block text-[10px] font-semibold text-slate-500">Batch</span>
              <div className="relative">
                <select
                  value={batchFilter}
                  onChange={(e) => {
                    setBatchFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="2022 - 2026">2022 - 2026</option>
                  <option value="2023 - 2027">2023 - 2027</option>
                  <option value="2024 - 2028">2024 - 2028</option>
                  <option value="All Batches">All Batches</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </label>

            {/* Match Category Buttons in same row next to Batch */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("high");
                  setCurrentPage(1);
                }}
                className={`h-9 px-3.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                  activeTab === "high"
                    ? "border border-cyan-400 bg-cyan-50/50 text-cyan-600 shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                High Match ({drive.match.high})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("medium");
                  setCurrentPage(1);
                }}
                className={`h-9 px-3.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                  activeTab === "medium"
                    ? "border border-cyan-400 bg-cyan-50/50 text-cyan-600 shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                Medium Match ({drive.match.medium})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("low");
                  setCurrentPage(1);
                }}
                className={`h-9 px-3.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                  activeTab === "low"
                    ? "border border-cyan-400 bg-cyan-50/50 text-cyan-600 shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                Low Match ({drive.match.low})
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 cursor-pointer"
            >
              <Download size={14} /> Export
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-cyan-400 bg-white px-3.5 text-xs font-semibold text-cyan-600 shadow-xs transition hover:bg-cyan-50 cursor-pointer"
            >
              <RotateCcw size={14} /> Reset Filters
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1020px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-y border-slate-200 bg-slate-50/70 text-slate-600">
                <th className="w-12 px-4 py-3 font-semibold">#</th>
                <th className="w-28 px-4 py-3 font-semibold">Register No.</th>
                <th className="w-44 px-4 py-3 font-semibold">Student Name</th>
                <th className="w-24 px-4 py-3 font-semibold">Department</th>
                <th className="w-20 px-4 py-3 font-semibold">CGPA</th>
                <th className="w-[34%] px-4 py-3 font-semibold">Skills</th>
                <th className="w-[22%] px-4 py-3 font-semibold">Match Score</th>
                <th className="w-32 px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.slice(0, 10).map((student, index) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {student.registerNo}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                          <UserRound size={15} />
                        </div>
                        <span className="font-semibold text-slate-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {student.department}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-bold text-cyan-600">
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {student.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-28 sm:w-32 rounded-full bg-cyan-100/70 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-cyan-400"
                            style={{ width: `${student.matchScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          {student.matchScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center justify-center gap-1 rounded-md border border-cyan-400 bg-white px-2 py-1 text-[10px] font-semibold text-cyan-600 transition hover:bg-cyan-50 shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        <Eye size={13} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No students match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 text-xs text-slate-600">
          <span>
            Showing 1–{Math.min(10, filteredStudents.length)} of {totalCountForTab} students
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              aria-label="Previous page"
            >
              &lsaquo;
            </button>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400 bg-cyan-50 font-bold text-cyan-600"
            >
              1
            </button>
            {[2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {page}
              </button>
            ))}
            <span className="px-1 text-slate-400">...</span>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              23
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer"
              aria-label="Next page"
            >
              &rsaquo;
            </button>
          </div>
        </div>
      </section>

      {/* Student Details Dialog / Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                  <UserRound size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedStudent.registerNo} • {selectedStudent.department} • Batch {selectedStudent.batch}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4 text-xs">
              {/* Score & Academic Card */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                    Role Match Score
                  </p>
                  <p className="mt-1 text-2xl font-black text-cyan-600">
                    {selectedStudent.matchScore}%
                  </p>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${selectedStudent.matchScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                    Cumulative CGPA
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-800">
                    {selectedStudent.cgpa}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-emerald-600">
                    0 Active Backlogs
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="font-semibold text-slate-700 mb-1.5">Matched Skills & Competencies</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700 border border-cyan-200"
                    >
                      <Check size={12} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-lg border border-slate-100 p-3 space-y-1.5 text-slate-600">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <span>{selectedStudent.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{selectedStudent.phone}</span>
                </p>
              </div>

              {/* Projects */}
              {selectedStudent.projects && selectedStudent.projects.length > 0 && (
                <div>
                  <p className="font-semibold text-slate-700 mb-1.5">Key Projects</p>
                  <div className="space-y-1.5">
                    {selectedStudent.projects.map((proj) => (
                      <div
                        key={proj.title}
                        className="rounded-lg border border-slate-100 bg-slate-50/50 p-2"
                      >
                        <p className="font-semibold text-slate-800">{proj.title}</p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          Stack: {proj.tech}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Student profile for ${selectedStudent.name} exported.`);
                }}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 shadow-sm cursor-pointer"
              >
                Download Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
