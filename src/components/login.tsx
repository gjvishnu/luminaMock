import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, AlertCircle } from "lucide-react";
import image from "../assets/loginScreenimg.png";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../context/useUserRole";
import { useAppDispatch } from "../redux";
import { login as loginAction, setRole as setReduxRole } from "../redux/slices/authSlice";
import { authApi, type LoginRequest, mapBackendRoleToFrontend } from "../api/authApi";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setRole } = useUserRole();
  const dispatch = useAppDispatch();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      const response = await authApi.login(credentials);

      const { token, user } = response;
      localStorage.setItem("token", token);

      const frontendRole = mapBackendRoleToFrontend(user.role);
      const userData = {
        id: user.id,
        email: user.email,
        role: frontendRole,
        regno: user.regno,
      };

      setUser(userData);
      setRole(frontendRole);
      dispatch(loginAction(userData));
      dispatch(setReduxRole(frontendRole));

      toast.success(`Welcome back, ${user.email}!`);
      navigate("/dashboard");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      toast.error(message, { autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh w-full overflow-y-auto bg-slate-50">
      <div className="flex min-h-full w-full">

        {/* Left - Image */}
        <div className="hidden w-1/2 items-center justify-center overflow-hidden bg-cyan-50 lg:flex">
          <div className="w-full max-w-2xl px-8">
            <img
              src={image}
              alt="Campus placement"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Right - Login */}
        <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">

            {/* Logo / Brand */}
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-4 flex justify-center lg:justify-start">
                <div className="flex h-11 w-35 items-center justify-center rounded-xl bg-cyan-500 text-lg font-bold text-white">
                  Gloris Digital
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
               Welcome to Gloris Lumina Placement intelligence
              </h1>

            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <form className="space-y-5" onSubmit={handleSubmit} noValidate autoComplete="off">

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-cyan-500 hover:text-cyan-700"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      disabled={loading}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-cyan-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-xs text-slate-500"
                  >
                    Remember me
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-lg bg-cyan-500 text-sm font-semibold text-white transition hover:bg-cyan-700 active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* Footer */}

            </div>

            {/* Bottom text */}
            <p className="mt-6 text-center text-[11px] text-slate-400">
              © 2026 Gloris Digital
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}