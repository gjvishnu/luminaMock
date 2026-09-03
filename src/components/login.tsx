import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import image from "../assets/loginScreenimg.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e:any)=>{
  e.preventDefault()
navigate("/dashboard")
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="flex min-h-screen w-full">

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

              <form className="space-y-5">

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
                      placeholder="Enter your email"
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
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
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                onClick={(e)=>handleSubmit(e)}
                  type="submit"
                  className="h-11 w-full rounded-lg bg-cyan-500 text-sm font-semibold text-white transition hover:bg-cyan-700 active:scale-[0.99]"
                >
                  Sign in
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