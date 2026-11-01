import { AlertCircle, Eye, EyeOff, GraduationCap, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectIsAuthenticated, SESSION_EXPIRED_STORAGE_KEY, setCredentials } from "../redux/authSlice";
import { mapBackendRole, setRole } from "../redux/roleSlice";
import loginScreenImage from "../assets/loginScreenimg.png";

function getApiErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } | string }).data;
    if (typeof data === "string") {
      return data;
    }
    if (data?.message) {
      return data.message;
    }
  }

  return "Unable to sign in. Please check your credentials and try again.";
}

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [unsupportedRoleMessage, setUnsupportedRoleMessage] = useState("");
  const [sessionExpiredMessage] = useState(() => {
    if (typeof window === "undefined") return "";
    const message = window.sessionStorage.getItem(SESSION_EXPIRED_STORAGE_KEY) ?? "";
    window.sessionStorage.removeItem(SESSION_EXPIRED_STORAGE_KEY);
    return message;
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnsupportedRoleMessage("");

    try {
      const response = await login({ email: email.trim(), password }).unwrap();
      const role = mapBackendRole(response.user.role);

      if (!role) {
        setUnsupportedRoleMessage("Recruiter screens are not available yet. Please use an admin, placement officer, or student account.");
        return;
      }

      dispatch(setCredentials(response));
      dispatch(setRole(role));

      const from = (location.state as { from?: string } | null)?.from;
      navigate(from ?? "/dashboard", { replace: true });
    } catch {
      // The mutation error is rendered below.
    }
  };

  const errorMessage = sessionExpiredMessage || unsupportedRoleMessage || (error ? getApiErrorMessage(error) : "");

  return (
    <main className="flex min-h-full items-center justify-center bg-[#f8fafd] px-4 py-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden min-h-[620px] overflow-hidden bg-white lg:block">
          <img
            src={loginScreenImage}
            alt="Lumina placement intelligence illustration"
            className="h-full min-h-[620px] w-full object-contain"
          />
        </div>

        <div className="flex min-h-[620px] items-center p-6 sm:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-white">
                  <GraduationCap size={23} />
                </span>
                <span className="text-xl font-bold text-slate-900">Lumina</span>
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600">Welcome back</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Sign in to Lumina</h2>
            <p className="mt-2 text-sm text-slate-500">Use your platform account to continue.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-700">Email address</span>
                <span className="relative block">
                  <Mail size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold text-slate-700">Password</span>
                <span className="relative block">
                  <LockKeyhole size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              {errorMessage && (
                <p role="alert" className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2.5 text-xs font-medium leading-5 text-rose-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading && <LoaderCircle size={17} className="animate-spin" />}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
