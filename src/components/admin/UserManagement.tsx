import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
} from "../../redux/slices/userSlice";
import { authApi } from "../../api/authApi";
import { Plus, Users, Mail, Lock, Shield, User, X, Loader2 } from "lucide-react";

interface User {
  id: number;
  email: string;
  role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
  regno: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state: { users: { users: User[]; loading: boolean; error: string | null } }) => state.users);
  const { user } = useAppSelector((state: { auth: { user: { role: string } | null } }) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
    regno: string;
  }>({
    email: "",
    password: "",
    role: "STUDENT",
    regno: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    dispatch(fetchUsersStart());
    try {
      const response = await authApi.getUsers();
      dispatch(fetchUsersSuccess(response.users));
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to fetch users";
      dispatch(fetchUsersFailure(message));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      dispatch(createUserStart());
      const response = await authApi.createUser(formData);
      dispatch(createUserSuccess(response.user));
      setShowModal(false);
      setFormData({ email: "", password: "", role: "STUDENT", regno: "" });
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Failed to create user";
      setFormError(message);
      dispatch(createUserFailure(message));
    } finally {
      setSubmitting(false);
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-slate-700">Access Denied</h3>
          <p className="mt-2 text-slate-500">Admin access required to manage users.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Create and manage user accounts</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="h-10 px-4 rounded-lg bg-cyan-500 text-sm font-semibold text-white transition hover:bg-cyan-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Create User
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Reg No.</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-cyan-500" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Users className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((u: User) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900">{u.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-slate-400" />
                        <span className="text-sm text-slate-900">{u.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                        <Shield className="h-3 w-3 mr-1" />
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{u.regno || "—"}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Create New User</h2>
              <button
                onClick={() => { setShowModal(false); setFormError(null); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER" })}
                  className="h-10 w-full rounded-lg border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  disabled={submitting}
                >
                  <option value="STUDENT">Student</option>
                  <option value="PLACEMENT_OFFICER">Placement Officer</option>
                  <option value="RECRUITER">Recruiter</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Registration No. (Optional)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.regno}
                    onChange={(e) => setFormData({ ...formData, regno: e.target.value })}
                    placeholder="REG001"
                    className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setFormError(null); }}
                  className="flex-1 h-10 rounded-lg border border-gray-300 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 h-10 rounded-lg bg-cyan-500 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}