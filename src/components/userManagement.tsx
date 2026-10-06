import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Search,
  Plus,
  Users,
  BriefcaseBusiness,
  ShieldCheck,
  UserCheck,
  Mail,
  Lock,
  UserPlus,
  X,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Filter,
  Download,
  FileUser,
  ChevronDown,
  Settings,
  Landmark,
  Layers,
  Tag,
  LayoutGrid,
  Building2,
} from "lucide-react";
import { useUserRole } from "../context/useUserRole";

type UserItem = {
  id?: number;
  email: string;
  role: string;
  regno?: string | null;
  name?: string;
  createdAt?: string;
  status?: string;
  dept?: string;
  batch?: string;
};

const initialMockUsers: UserItem[] = [
  { id: 1, name: "Arjun Mehta", email: "arjun.mehta@lumina.edu", regno: "CSE2026-014", role: "STUDENT", dept: "CSE", batch: "2026 • 7th Sem", status: "Active", createdAt: "12 Jan 2024" },
  { id: 2, name: "Rahul Kulkarni", email: "rahul.kulkarni@lumina.edu", regno: "CSE2026-032", role: "STUDENT", dept: "CSE", batch: "2026 • 7th Sem", status: "Active", createdAt: "15 Feb 2024" },
  { id: 3, name: "Priya Sharma", email: "priya.sharma@lumina.edu", regno: "ECE2026-011", role: "STUDENT", dept: "ECE", batch: "2026 • 7th Sem", status: "Active", createdAt: "10 Mar 2024" },
  { id: 4, name: "Neha Tomar", email: "neha.tomar@lumina.edu", regno: "IT2026-007", role: "STUDENT", dept: "IT", batch: "2026 • 7th Sem", status: "Inactive", createdAt: "05 Apr 2024" },
  { id: 5, name: "Sneha Reddy", email: "sneha.reddy@lumina.edu", regno: "CSE2026-089", role: "STUDENT", dept: "CSE", batch: "2026 • 7th Sem", status: "Active", createdAt: "18 Apr 2024" },
  { id: 6, name: "Vikram Singh", email: "vikram.singh@lumina.edu", regno: "ME2026-021", role: "PLACEMENT_OFFICER", dept: "ME", batch: "2026 • 7th Sem", status: "Active", createdAt: "22 Apr 2024" },
  { id: 7, name: "Ananya Pillai", email: "ananya.pillai@lumina.edu", regno: "ECE2026-043", role: "STUDENT", dept: "ECE", batch: "2026 • 7th Sem", status: "Active", createdAt: "28 Apr 2024" },
  { id: 8, name: "Dev Sharma", email: "dev.sharma@lumina.edu", regno: "CSE2026-055", role: "ADMIN", dept: "CSE", batch: "2026 • 7th Sem", status: "Active", createdAt: "03 May 2024" },
];

function getInitials(nameOrEmail: string) {
  if (nameOrEmail.includes("@")) {
    const part = nameOrEmail.split("@")[0];
    return part.substring(0, 2).toUpperCase();
  }
  const parts = nameOrEmail.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nameOrEmail.substring(0, 2).toUpperCase();
}

function getRandomColor(id: number) {
  const colors = [
    "bg-cyan-100 text-cyan-700",
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
  ];
  return colors[id % colors.length];
}

function formatDate(rawDate?: string) {
  if (!rawDate) return "12 Jan 2024";
  if (rawDate.includes("T") || rawDate.includes("-")) {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  }
  return rawDate;
}

function CustomRoleSelect({
  value,
  onChange,
}: {
  value: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
  onChange: (val: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER") => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const roleOptions: { key: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER"; label: string }[] = [
    { key: "STUDENT", label: "Student" },
    { key: "PLACEMENT_OFFICER", label: "Placement Officer" },
    { key: "ADMIN", label: "Admin" },
    { key: "RECRUITER", label: "Recruiter" },
  ];

  const selectedOption = roleOptions.find((o) => o.key === value) || roleOptions[0];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded-xl border bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition ${
          isOpen ? "border-cyan-500 ring-2 ring-cyan-100" : "border-gray-200 hover:border-cyan-300"
        }`}
      >
        <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <span className="font-medium text-slate-800">{selectedOption.label}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-500" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl animate-in fade-in-50 zoom-in-95">
          {roleOptions.map((option) => {
            const isSelected = option.key === value;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => {
                  onChange(option.key);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  isSelected
                    ? "bg-cyan-50 font-bold text-cyan-700"
                    : "font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && <span className="h-2 w-2 rounded-full bg-cyan-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function UserManagement() {
  const navigate = useNavigate();
  const { logout } = useUserRole();
  const [activeTab, setActiveTab] = useState<"STUDENT" | "PLACEMENT_OFFICER" | "ADMIN">("STUDENT");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [realUsers, setRealUsers] = useState<UserItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER">("STUDENT");
  const [regno, setRegno] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Add Skill form state (text inputs only)
  const [skillCategory, setSkillCategory] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillDomain, setSkillDomain] = useState("");
  const [skillError, setSkillError] = useState<string | null>(null);
  const [skillSubmitting, setSkillSubmitting] = useState(false);

  // Add Department form state (text inputs only)
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDomain, setDepartmentDomain] = useState("");
  const [departmentError, setDepartmentError] = useState<string | null>(null);
  const [departmentSubmitting, setDepartmentSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();
      if (response.ok && data.users) {
        setRealUsers(data.users);
      }
    } catch {
      // Keep existing display list if server fails
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const combinedUsers = [...realUsers];
  initialMockUsers.forEach((mock) => {
    if (!combinedUsers.some((u) => u.email === mock.email)) {
      combinedUsers.push(mock);
    }
  });

  const studentsCount = combinedUsers.filter((u) => u.role === "STUDENT").length;
  const officersCount = combinedUsers.filter((u) => u.role === "PLACEMENT_OFFICER" || u.role === "RECRUITER").length;
  const adminsCount = combinedUsers.filter((u) => u.role === "ADMIN").length;
  const totalCount = combinedUsers.length;

  const currentTabUsers = combinedUsers.filter((u) => {
    if (activeTab === "STUDENT") return u.role === "STUDENT";
    if (activeTab === "PLACEMENT_OFFICER") return u.role === "PLACEMENT_OFFICER" || u.role === "RECRUITER";
    if (activeTab === "ADMIN") return u.role === "ADMIN";
    return true;
  }).filter((u) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(query)) ||
      u.email.toLowerCase().includes(query) ||
      (u.regno && u.regno.toLowerCase().includes(query))
    );
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setSubmitting(true);

    try {
      const payload: { email: string; password: string; role: string; regno?: string } = {
        email,
        password,
        role: selectedRole,
      };
      if (selectedRole === "STUDENT" && regno.trim()) {
        payload.regno = regno.trim();
      }

      const response = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setModalError(data.message || "Failed to create user.");
        setSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setRegno("");
      setSelectedRole("STUDENT");

      await fetchUsers();
    } catch {
      setModalError("Server connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const category = skillCategory.trim();
    const name = skillName.trim();
    const domain = skillDomain.trim();
    if (!category || !name || !domain) {
      setSkillError("Please fill in Category, Skill, and Domain.");
      return;
    }
    setSkillError(null);
    setSkillSubmitting(true);
    try {
      toast.success(`Skill "${name}" added successfully.`);
      setIsSkillModalOpen(false);
      setSkillCategory("");
      setSkillName("");
      setSkillDomain("");
    } finally {
      setSkillSubmitting(false);
    }
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const name = departmentName.trim();
    const domain = departmentDomain.trim();
    if (!name || !domain) {
      setDepartmentError("Please fill in Department and Domain.");
      return;
    }
    setDepartmentError(null);
    setDepartmentSubmitting(true);
    try {
      toast.success(`Department "${name}" added successfully.`);
      setIsDepartmentModalOpen(false);
      setDepartmentName("");
      setDepartmentDomain("");
    } finally {
      setDepartmentSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <UserCheck size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">Actions</h1>
          <p className="text-xs text-gray-500">Create, manage, and assign roles to platform users.</p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Students */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Students</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{studentsCount}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">↑ 12%</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Users size={20} />
          </div>
        </div>

        {/* Placement Officers */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Placement Officers</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{officersCount}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">↑ 0%</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <BriefcaseBusiness size={20} />
          </div>
        </div>

        {/* Admins */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Admins</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{adminsCount}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">↑ 0%</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={20} />
          </div>
        </div>

        {/* Total Users */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Users</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{totalCount}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">↑ 10%</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck size={20} />
          </div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Tabs + Create New User Button Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 pt-4 pb-3">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab("STUDENT")}
              className={`pb-2 text-xs font-bold transition border-b-2 ${
                activeTab === "STUDENT" ? "border-cyan-500 text-cyan-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Students ({studentsCount})
            </button>
            <button
              onClick={() => setActiveTab("PLACEMENT_OFFICER")}
              className={`pb-2 text-xs font-bold transition border-b-2 ${
                activeTab === "PLACEMENT_OFFICER" ? "border-cyan-500 text-cyan-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Placement Officers ({officersCount})
            </button>
            <button
              onClick={() => setActiveTab("ADMIN")}
              className={`pb-2 text-xs font-bold transition border-b-2 ${
                activeTab === "ADMIN" ? "border-cyan-500 text-cyan-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Admins ({adminsCount})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSkillCategory("");
                setSkillName("");
                setSkillDomain("");
                setSkillError(null);
                setIsSkillModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600 shadow-sm"
            >
              <Plus size={16} />
              Add Skills
            </button>
            <button
              type="button"
              onClick={() => {
                setDepartmentName("");
                setDepartmentDomain("");
                setDepartmentError(null);
                setIsDepartmentModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600 shadow-sm"
            >
              <Plus size={16} />
              Add Departments
            </button>
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setRegno("");
                setSelectedRole("STUDENT");
                setModalError(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600 shadow-sm"
            >
              <Plus size={16} />
              Create New User
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4 bg-slate-50/50">
          {/* Search Bar */}
          <div className="relative min-w-[260px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or registration number..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-600 outline-none">
              <option>All Departments</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>IT</option>
              <option>ME</option>
            </select>

            <select className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-600 outline-none">
              <option>All Batches</option>
              <option>2026 • 7th Sem</option>
              <option>2027 • 5th Sem</option>
            </select>

            <select className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-600 outline-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <Filter size={14} />
              Filter
            </button>

            <button className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="p-3 pl-4 w-8">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-cyan-600 rounded" />
                </th>
                <th className="p-3 w-10">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Registration No.</th>
                <th className="p-3">Department</th>
                <th className="p-3">Batch / Semester</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created On</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loadingUsers ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-400">
                    Loading users from server...
                  </td>
                </tr>
              ) : currentTabUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-gray-400">
                    No users found for this category.
                  </td>
                </tr>
              ) : (
                currentTabUsers.map((user, idx) => {
                  const displayName = user.name || user.email.split("@")[0];
                  const initials = getInitials(displayName);
                  const colorClass = getRandomColor(user.id || idx);

                  return (
                    <tr key={user.id || user.email} className="hover:bg-gray-50/70 transition">
                      <td className="p-3 pl-4">
                        <input type="checkbox" className="h-3.5 w-3.5 accent-cyan-600 rounded" />
                      </td>
                      <td className="p-3 font-medium text-gray-400">{idx + 1}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${colorClass}`}>
                            {initials}
                          </span>
                          <span className="font-semibold text-gray-900">{displayName}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-500">{user.email}</td>
                      <td className="p-3 font-mono text-[11px] text-gray-600">{user.regno || "—"}</td>
                      <td className="p-3 text-gray-600">{user.dept || (user.role === "ADMIN" ? "Admin" : "CSE")}</td>
                      <td className="p-3 text-gray-600">{user.batch || "2026 • 7th Sem"}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            user.status === "Inactive"
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${user.status === "Inactive" ? "bg-red-500" : "bg-emerald-500"}`} />
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-500">{formatDate(user.createdAt)}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          <button title="View" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-cyan-600">
                            <Eye size={14} />
                          </button>
                          <button title="Edit" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600">
                            <Pencil size={14} />
                          </button>
                          <button title="Delete" className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4 text-xs text-gray-500">
          <span>Showing 1 to {currentTabUsers.length} of {currentTabUsers.length} entries</span>
          <div className="flex items-center gap-1">
            <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">‹</button>
            <button className="rounded border border-cyan-500 bg-cyan-500 px-2.5 py-1 font-semibold text-white">1</button>
            <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">2</button>
            <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">3</button>
            <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">›</button>
          </div>
        </div>
      </div>

      {/* =========================================================
          CREATE NEW USER MODAL (Matching Image 2 exactly)
      ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <UserPlus size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Create New User</h2>
                  <p className="text-xs text-gray-500">Add a new user to the platform.</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateUser} autoComplete="off" className="mt-6 space-y-4">
              {modalError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                  {modalError}
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-9 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <CustomRoleSelect
                  value={selectedRole}
                  onChange={(val) => setSelectedRole(val)}
                />
              </div>

              {/* Registration Number (Only for Student role) */}
              {selectedRole === "STUDENT" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Registration Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="off"
                      value={regno}
                      onChange={(e) => setRegno(e.target.value)}
                      placeholder="Enter registration number"
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-gray-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.99] disabled:opacity-50 shadow-sm"
                >
                  <UserPlus size={16} />
                  {submitting ? "Creating..." : "Create New User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ADD SKILL MODAL (all text inputs) */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Layers size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Add New Skill</h2>
                  <p className="text-xs text-gray-500">Add a new skill to the platform.</p>
                </div>
              </div>
              <button onClick={() => setIsSkillModalOpen(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSkill} autoComplete="off" className="mt-6 space-y-4">
              {skillError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">{skillError}</div>
              )}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Skill Category <span className="text-red-500">*</span></label>
                <div className="relative">
                  <LayoutGrid size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required autoComplete="off" value={skillCategory} onChange={(e) => setSkillCategory(e.target.value)} placeholder="Enter skill category" className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Skill Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required autoComplete="off" value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="Enter skill name" className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Domain <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Settings size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required autoComplete="off" value={skillDomain} onChange={(e) => setSkillDomain(e.target.value)} placeholder="Enter domain" className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="rounded-xl border border-gray-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Cancel</button>
                <button type="submit" disabled={skillSubmitting} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.99] disabled:opacity-50 shadow-sm">
                  <Plus size={16} />
                  {skillSubmitting ? "Adding..." : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ADD DEPARTMENT MODAL (all text inputs) */}
      {isDepartmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Landmark size={22} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Add New Department</h2>
                  <p className="text-xs text-gray-500">Add a new department to the platform.</p>
                </div>
              </div>
              <button onClick={() => setIsDepartmentModalOpen(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddDepartment} autoComplete="off" className="mt-6 space-y-4">
              {departmentError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">{departmentError}</div>
              )}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Department Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required autoComplete="off" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} placeholder="Enter department name" className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Domain <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Settings size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required autoComplete="off" value={departmentDomain} onChange={(e) => setDepartmentDomain(e.target.value)} placeholder="Enter domain" className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsDepartmentModalOpen(false)} className="rounded-xl border border-gray-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Cancel</button>
                <button type="submit" disabled={departmentSubmitting} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.99] disabled:opacity-50 shadow-sm">
                  <Plus size={16} />
                  {departmentSubmitting ? "Adding..." : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
