import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  Eye,
  EyeOff,
  FileUser,
  Lock,
  Mail,
  Pencil,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  fetchUsersFailure,
  fetchUsersStart,
  fetchUsersSuccess,
} from "../../redux/slices/userSlice";
import { authApi } from "../../api/authApi";

type Role = "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";

type UserItem = {
  id: number;
  email: string;
  role: Role;
  regno: string | null;
  createdAt: string;
};

const roleOptions: { key: Role; label: string }[] = [
  { key: "STUDENT", label: "Student" },
  { key: "PLACEMENT_OFFICER", label: "Placement Officer" },
  { key: "RECRUITER", label: "Recruiter" },
  { key: "ADMIN", label: "Admin" },
];

function getInitials(email: string) {
  const part = email.split("@")[0];
  const parts = part.split(/[._-]/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return part.substring(0, 2).toUpperCase();
}

function getAvatarColor(id: number) {
  const colors = [
    "bg-cyan-100 text-cyan-700",
    "bg-purple-100 text-purple-700",
    "bg-blue-100 text-blue-700",
    "bg-pink-100 text-pink-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
  ];
  return colors[Math.abs(id) % colors.length];
}

function formatDate(rawDate?: string) {
  if (!rawDate) return "—";
  const d = new Date(rawDate);
  if (isNaN(d.getTime())) return rawDate;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CustomRoleSelect({ value, onChange }: { value: Role; onChange: (val: Role) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = roleOptions.find((o) => o.key === value) ?? roleOptions[0];

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
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
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

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const authUser = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState<"STUDENT" | "PLACEMENT_OFFICER" | "ADMIN">("STUDENT");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("STUDENT");
  const [regno, setRegno] = useState("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isAdmin = authUser?.role === "admin";

  const loadUsers = async () => {
    dispatch(fetchUsersStart());
    try {
      const response = await authApi.getUsers();
      dispatch(fetchUsersSuccess(response.users));
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      dispatch(fetchUsersFailure(axiosError.response?.data?.message || "Failed to fetch users."));
    }
  };

  useEffect(() => {
    if (isAdmin) {
      void loadUsers();
    }
  }, [isAdmin]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setSubmitting(true);

    const payload: { email: string; password: string; role: Role; regno?: string } = {
      email,
      password,
      role: selectedRole,
    };
    if (selectedRole === "STUDENT" && regno.trim()) {
      payload.regno = regno.trim();
    }

    try {
      dispatch(createUserStart());
      const response = await authApi.createUser(payload);
      dispatch(createUserSuccess(response.user));

      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      setRegno("");
      setSelectedRole("STUDENT");
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to create user.";
      setModalError(message);
      dispatch(createUserFailure(message));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-700">Access Denied</h3>
          <p className="mt-2 text-slate-500">Admin access required to manage users.</p>
        </div>
      </div>
    );
  }

  const allUsers: UserItem[] = users;

  const studentsCount = allUsers.filter((u) => u.role === "STUDENT").length;
  const officersCount = allUsers.filter((u) => u.role === "PLACEMENT_OFFICER" || u.role === "RECRUITER").length;
  const adminsCount = allUsers.filter((u) => u.role === "ADMIN").length;
  const totalCount = allUsers.length;

  const currentTabUsers = allUsers
    .filter((u) => {
      if (activeTab === "STUDENT") return u.role === "STUDENT";
      if (activeTab === "PLACEMENT_OFFICER") return u.role === "PLACEMENT_OFFICER" || u.role === "RECRUITER";
      if (activeTab === "ADMIN") return u.role === "ADMIN";
      return true;
    })
    .filter((u) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return u.email.toLowerCase().includes(query) || (u.regno && u.regno.toLowerCase().includes(query));
    });

  return (
    <div className="w-full space-y-4">
      {/* Header Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <UserCheck size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">User Management</h1>
          <p className="text-xs text-gray-500">Create, manage, and assign roles to platform users.</p>
        </div>
      </div>
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Students</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{studentsCount}</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Users size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Placement Officers</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{officersCount}</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <BriefcaseBusiness size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Admins</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{adminsCount}</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <p className="text-xs font-medium text-gray-500">Total Users</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">{totalCount}</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck size={20} />
          </div>
        </div>
      </div>
      {/* Table Container Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
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

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4 bg-slate-50/50">
          <div className="relative min-w-[260px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email or registration number..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
            />
          </div>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="p-3 pl-4 w-8">
                  <input type="checkbox" className="h-3.5 w-3.5 accent-cyan-600 rounded" />
                </th>
                <th className="p-3 w-10">#</th>
                <th className="p-3">User</th>
                <th className="p-3">Email</th>
                <th className="p-3">Registration No.</th>
                <th className="p-3">Role</th>
                <th className="p-3">Created On</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    Loading users from server...
                  </td>
                </tr>
              ) : currentTabUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No users found for this category.
                  </td>
                </tr>
              ) : (
                currentTabUsers.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition">
                    <td className="p-3 pl-4">
                      <input type="checkbox" className="h-3.5 w-3.5 accent-cyan-600 rounded" />
                    </td>
                    <td className="p-3 font-medium text-gray-400">{idx + 1}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${getAvatarColor(user.id)}`}
                        >
                          {getInitials(user.email)}
                        </span>
                        <span className="font-semibold text-gray-900">{user.email.split("@")[0]}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-500">{user.email}</td>
                    <td className="p-3 font-mono text-[11px] text-gray-600">{user.regno || "—"}</td>
                    <td className="p-3 text-gray-600">
                      {roleOptions.find((o) => o.key === user.role)?.label ?? user.role}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4 text-xs text-gray-500">
          <span>
            Showing 1 to {currentTabUsers.length} of {currentTabUsers.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">‹</button>
            <button className="rounded border border-cyan-500 bg-cyan-500 px-2.5 py-1 font-semibold text-white">1</button>
            <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">2</button>
            <button className="rounded border border-gray-200 px-2.5 py-1 hover:bg-gray-50">3</button>
            <button className="rounded border border-gray-200 px-2 py-1 hover:bg-gray-50">›</button>
          </div>
        </div>
      </div>
      {/* Create New User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
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

            <form onSubmit={handleCreateUser} autoComplete="off" className="mt-6 space-y-4">
              {modalError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                  {modalError}
                </div>
              )}

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
                    disabled={submitting}
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>
              </div>

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
                    disabled={submitting}
                    className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-9 text-xs text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    disabled={submitting}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <CustomRoleSelect value={selectedRole} onChange={(val) => setSelectedRole(val)} />
              </div>

              {selectedRole === "STUDENT" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Registration Number <span className="font-normal text-slate-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FileUser size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      autoComplete="off"
                      value={regno}
                      onChange={(e) => setRegno(e.target.value)}
                      placeholder="Enter registration number"
                      disabled={submitting}
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />
                  </div>
                </div>
              )}

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
    </div>
  );
}
