import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  Filter,
  LoaderCircle,
  Lock,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import {
  type CreateUserRequest,
  type ManagedUser,
  useCreateUserMutation,
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "../redux/api";
import { useUserRole } from "../context/useUserRole";

type FormRole = CreateUserRequest["role"];
type UserRoleTab = "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
type UserStatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

const roleTabs: { key: UserRoleTab; label: string }[] = [
  { key: "STUDENT", label: "Students" },
  { key: "PLACEMENT_OFFICER", label: "Placement Officers" },
  { key: "ADMIN", label: "Admins" },
  { key: "RECRUITER", label: "Recruiters" },
];

const EMPTY_USERS: ManagedUser[] = [];

function getApiErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } | string }).data;
    if (typeof data === "string") return data;
    if (data?.message) return data.message;
  }

  return "Something went wrong. Please try again.";
}

function formatDate(rawDate?: string) {
  if (!rawDate) return "—";
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return rawDate;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(value: string) {
  const name = value.split("@")[0].replace(/[._-]/g, " ").trim();
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase() || "US";
}

function getUserField(user: ManagedUser, keys: string[]) {
  const record = user as ManagedUser & Record<string, unknown>;
  return keys.map((key) => record[key]).find((value) => value !== undefined && value !== null && value !== "");
}

function getUserName(user: ManagedUser) {
  const value = getUserField(user, ["name", "fullName", "displayName"]);
  return typeof value === "string" ? value : user.userUuid;
}

function getUserDepartment(user: ManagedUser) {
  const value = getUserField(user, ["department", "departmentName"]);
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const name = (value as { name?: unknown }).name;
    if (typeof name === "string") return name;
  }
  return "—";
}

function getUserBatch(user: ManagedUser) {
  const value = getUserField(user, ["batch", "batchYear", "graduationYear", "semester"]);
  return value === undefined ? "—" : String(value);
}

function getUserRegistrationNumber(user: ManagedUser) {
  const value = getUserField(user, ["registrationNumber", "registrationNo", "registerNumber"]);
  return typeof value === "string" || typeof value === "number" ? String(value) : "—";
}

function statusLabel(status?: string) {
  return status?.toUpperCase() === "INACTIVE" ? "Inactive" : "Active";
}

function statusClass(status?: string) {
  return status?.toUpperCase() === "INACTIVE"
    ? "bg-rose-50 text-rose-600"
    : "bg-emerald-50 text-emerald-600";
}

function ModalShell({ title, description, icon: Icon, onClose, children }: {
  title: string;
  description: string;
  icon: typeof UserPlus;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Icon size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{title}</h2>
              <p className="text-xs text-gray-500">{description}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">{label} <span className="text-red-500">*</span></span>
      {children}
    </label>
  );
}

function TextInput({ icon: Icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: typeof Mail }) {
  return (
    <span className="relative block">
      <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input {...props} className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
    </span>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const inactive = status?.toUpperCase() === "INACTIVE";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusClass(status)}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${inactive ? "bg-rose-500" : "bg-emerald-500"}`} />
      {statusLabel(status)}
    </span>
  );
}

function LoadingRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-10 text-center text-xs text-slate-400">
        <span className="inline-flex items-center gap-2"><LoaderCircle size={15} className="animate-spin" /> Loading users from server...</span>
      </td>
    </tr>
  );
}

function ActionButtons({ onDelete, disabled }: { onDelete: () => void; disabled: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1">
      <button type="button" title="View (coming soon)" aria-label="View user (coming soon)" disabled className="rounded p-1 text-slate-300"><Eye size={15} /></button>
      <button type="button" title="Delete user" aria-label="Delete user" disabled={disabled} onClick={onDelete} className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40"><Trash2 size={15} /></button>
    </div>
  );
}

function ModalActions({ isLoading, onCancel }: { isLoading: boolean; onCancel: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3 pt-2">
      <button type="button" onClick={onCancel} className="rounded-xl border border-gray-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200">Cancel</button>
      <button type="submit" disabled={isLoading} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50">
        {isLoading && <LoaderCircle size={15} className="animate-spin" />}
        {isLoading ? "Saving..." : "Create User"}
      </button>
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">{message}</div>;
}

export function UserManagement() {
  const { role } = useUserRole();
  const usersQuery = useGetUsersQuery(undefined, { skip: role !== "admin" });
  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();
  const [deactivateUser, { isLoading: isDeletingUser }] = useDeactivateUserMutation();

  const users = usersQuery.data ?? EMPTY_USERS;
  const [activeTab, setActiveTab] = useState<UserRoleTab>("STUDENT");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState<FormRole>("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<ManagedUser | null>(null);
  const pageSize = 10;

  const countByRole = (userRoleValue: string) => users.filter((user) => user.role.toUpperCase() === userRoleValue).length;
  const departmentOptions = useMemo(() => {
    const values = users.map(getUserDepartment).filter((value) => value !== "—");
    return ["All Departments", ...Array.from(new Set(values)).sort()];
  }, [users]);

  const batchOptions = useMemo(() => {
    const values = users.map(getUserBatch).filter((value) => value !== "—");
    return ["All Batches", ...Array.from(new Set(values)).sort()];
  }, [users]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((user) => {
      const name = getUserName(user);
      const matchesRole = user.role.toUpperCase() === activeTab;
      const matchesSearch = !query || [name, user.email, getUserRegistrationNumber(user), user.userUuid].some((value) => value.toLowerCase().includes(query));
      const matchesDepartment = departmentFilter === "All Departments" || getUserDepartment(user) === departmentFilter;
      const matchesBatch = batchFilter === "All Batches" || getUserBatch(user) === batchFilter;
      const matchesStatus = statusFilter === "ALL" || user.status.toUpperCase() === statusFilter;
      return matchesRole && matchesSearch && matchesDepartment && matchesBatch && matchesStatus;
    });
  }, [activeTab, batchFilter, departmentFilter, searchQuery, statusFilter, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedUsers = useMemo(
    () => filteredUsers.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredUsers, safePage],
  );

  const closeModal = () => {
    setModalOpen(false);
    setModalError(null);
    setShowPassword(false);
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalError(null);

    try {
      await createUser({ email: userEmail.trim(), password: userPassword, role: userRole }).unwrap();
      toast.success("User created successfully.");
      setUserEmail("");
      setUserPassword("");
      setUserRole("STUDENT");
      closeModal();
    } catch (error) {
      setModalError(getApiErrorMessage(error));
    }
  };

  const handleDeleteUser = async () => {
    const user = userToDelete;
    if (!user?.userUuid) return;

    try {
      await deactivateUser(user.userUuid).unwrap();
      setUserToDelete(null);
      toast.success(`${user.email} deleted successfully.`);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleExport = () => {
    const rows = filteredUsers.map((user) => [
      getUserName(user),
      user.email,
      getUserRegistrationNumber(user),
      getUserDepartment(user),
      getUserBatch(user),
      statusLabel(user.status),
      formatDate(user.createdAt),
    ]);
    const header = ["Name", "Email", "Registration No.", "Department", "Batch / Semester", "Status", "Created On"];
    const csv = [header, ...rows].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "lumina-users.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full space-y-4 text-slate-800">
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
          <UserCheck size={22} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-base font-bold text-gray-900 sm:text-lg">Actions</h1>
          <p className="text-xs text-gray-500">Manage users, placements, drives and the entire platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Students" value={countByRole("STUDENT")} icon={Users} tone="cyan" />
        <StatCard label="Placement Officers" value={countByRole("PLACEMENT_OFFICER")} icon={BriefcaseBusiness} tone="violet" />
        <StatCard label="Admins" value={countByRole("ADMIN")} icon={ShieldCheck} tone="blue" />
        <StatCard label="Total Users" value={users.length} icon={UserCheck} tone="emerald" />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 pb-3 pt-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            {roleTabs.map((tab) => {
              const count = countByRole(tab.key);
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearchQuery("");
                    setStatusFilter("ALL");
                    setCurrentPage(1);
                    if (tab.key !== "STUDENT") {
                      setDepartmentFilter("All Departments");
                      setBatchFilter("All Batches");
                    }
                  }}
                  className={`whitespace-nowrap border-b-2 pb-2 text-xs font-bold transition ${activeTab === tab.key ? "border-cyan-500 text-cyan-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => setModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600">
            <Plus size={16} /> Create New User
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-slate-50/50 p-4">
          <div className="relative min-w-[260px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email, or registration number..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeTab === "STUDENT" && (
              <>
                <FilterSelect label="Department" value={departmentFilter} options={departmentOptions} onChange={(value) => { setDepartmentFilter(value); setCurrentPage(1); }} />
                <FilterSelect label="Batch" value={batchFilter} options={batchOptions} onChange={(value) => { setBatchFilter(value); setCurrentPage(1); }} />
              </>
            )}
            <FilterSelect label="Status" value={statusFilter === "ALL" ? "All Status" : statusFilter} options={["All Status", "ACTIVE", "INACTIVE"]} onChange={(value) => { setStatusFilter(value === "All Status" ? "ALL" : value as UserStatusFilter); setCurrentPage(1); }} />
            <button type="button" onClick={() => setCurrentPage(1)} className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <Filter size={14} /> Filter
            </button>
            <button type="button" onClick={handleExport} className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {usersQuery.error ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center">
            <p className="text-sm font-semibold text-rose-600">Unable to load users.</p>
            <p className="max-w-md text-xs text-slate-500">{getApiErrorMessage(usersQuery.error)}</p>
            <button type="button" onClick={() => void usersQuery.refetch()} className="mt-2 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">Try again</button>
          </div>
        ) : (
          <UserTable users={paginatedUsers} isLoading={usersQuery.isLoading} isStudentTab={activeTab === "STUDENT"} onDelete={setUserToDelete} />
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 p-4 text-xs text-gray-500">
          <span>
            Showing {filteredUsers.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to {Math.min(safePage * pageSize, filteredUsers.length)} of {filteredUsers.length} user{filteredUsers.length === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-1.5">
            <button type="button" aria-label="Previous page" disabled={safePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={15} /></button>
            {Array.from({ length: Math.max(3, totalPages) }, (_, index) => index + 1).map((page) => (
              <button key={page} type="button" disabled={page > totalPages} onClick={() => setCurrentPage(page)} className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-semibold ${safePage === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"}`}>{page}</button>
            ))}
            <button type="button" aria-label="Next page" disabled={safePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={15} /></button>
          </div>
          <span className="text-[11px] text-slate-400">Live data from Lumina API</span>
        </div>
      </div>

      {modalOpen && (
        <ModalShell title="Create New User" description="Add a user to the platform." icon={UserPlus} onClose={closeModal}>
          <form onSubmit={handleCreateUser} className="mt-6 space-y-4">
            {modalError && <FormError message={modalError} />}
            <Field label="Email Address"><TextInput icon={Mail} type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} placeholder="Enter email address" autoComplete="off" required /></Field>
            <Field label="Password">
              <span className="relative block">
                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showPassword ? "text" : "password"} value={userPassword} onChange={(event) => setUserPassword(event.target.value)} placeholder="Enter password" autoComplete="new-password" required className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-10 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </Field>
            <Field label="Role">
              <select value={userRole} onChange={(event) => setUserRole(event.target.value as FormRole)} className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs text-slate-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                <option value="STUDENT">Student</option>
                <option value="PLACEMENT_OFFICER">Placement Officer</option>
                <option value="ADMIN">Admin</option>
                <option value="RECRUITER">Recruiter</option>
              </select>
            </Field>
            <ModalActions isLoading={isCreatingUser} onCancel={closeModal} />
          </form>
        </ModalShell>
      )}

      {userToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4" role="presentation">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="delete-user-title">
            <h2 id="delete-user-title" className="text-base font-bold text-slate-900">Delete user?</h2>
            <p className="mt-2 text-sm text-slate-500">Are you sure you want to delete {userToDelete.email}? This user will be marked inactive.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setUserToDelete(null)} disabled={isDeletingUser} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">Cancel</button>
              <button type="button" onClick={handleDeleteUser} disabled={isDeletingUser} className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60">
                {isDeletingUser ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: typeof Users; tone: "cyan" | "violet" | "blue" | "emerald" }) {
  const tones = {
    cyan: "bg-cyan-50 text-cyan-600",
    violet: "bg-violet-50 text-violet-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}><Icon size={20} /></div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="h-9 min-w-[132px] appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-xs font-medium text-gray-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100">
        {options.map((option) => <option key={option} value={option}>{option === "ACTIVE" ? "Active" : option === "INACTIVE" ? "Inactive" : option}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">⌄</span>
    </label>
  );
}

function UserTable({ users, isLoading, isStudentTab, onDelete }: { users: ManagedUser[]; isLoading: boolean; isStudentTab: boolean; onDelete: (user: ManagedUser) => void }) {
  const columnCount = isStudentTab ? 9 : 6;

  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full ${isStudentTab ? "min-w-[980px]" : "min-w-[680px]"} text-left text-xs text-gray-600`}>
        <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="p-3 pl-5">#</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            {isStudentTab && <th className="p-3">Registration No.</th>}
            {isStudentTab && <th className="p-3">Department</th>}
            {isStudentTab && <th className="p-3">Batch / Semester</th>}
            <th className="p-3">Status</th>
            <th className="p-3">Created On</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading ? <LoadingRow colSpan={columnCount} /> : users.length === 0 ? (
            <tr><td colSpan={columnCount} className="p-10 text-center text-xs text-slate-400">No users found.</td></tr>
          ) : users.map((user, index) => (
            <tr key={user.userUuid} className="hover:bg-gray-50/70">
              <td className="p-3 pl-5 font-medium text-gray-400">{index + 1}</td>
              <td className="p-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-[10px] font-bold text-cyan-700">{getInitials(getUserName(user))}</span>
                  <span className="font-semibold text-gray-900">{getUserName(user)}</span>
                </div>
              </td>
              <td className="p-3 text-gray-500">{user.email}</td>
              {isStudentTab && <td className="p-3">{getUserRegistrationNumber(user)}</td>}
              {isStudentTab && <td className="p-3">{getUserDepartment(user)}</td>}
              {isStudentTab && <td className="p-3">{getUserBatch(user)}</td>}
              <td className="p-3"><StatusBadge status={user.status} /></td>
              <td className="p-3 text-gray-500">{formatDate(user.createdAt)}</td>
              <td className="p-3 text-center"><ActionButtons onDelete={() => onDelete(user)} disabled={user.status.toUpperCase() === "INACTIVE"} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
