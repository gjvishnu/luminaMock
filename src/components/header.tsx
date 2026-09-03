import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Menu,
  Search,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./sideBar";
import { type UserRole } from "../context/roleContext";
import { useUserRole } from "../context/useUserRole";

const roleDetails: Record<UserRole, { name: string; label: string; greeting: string }> = {
  officer: { name: "Vikram", label: "Placement Officer", greeting: "Welcome, Vikram 👋" },
  student: { name: "Arjun Mehta", label: "Student", greeting: "Welcome, Arjun 👋" },
};

export const Header = () => {
  const { role, setRole } = useUserRole();
  const [sideBar, setSideBar] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const currentUser = roleDetails[role];

  useEffect(() => {
    if (!sideBar) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sideBar]);

  useEffect(() => {
    if (!roleMenuOpen) {
      return;
    }

    const closeMenu = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [roleMenuOpen]);

  const handleRoleChange = (nextRole: UserRole) => {
    setRole(nextRole);
    setRoleMenuOpen(false);
  };

  return (
    <div className="relative">
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="flex h-17 items-center justify-between px-3 sm:px-6 lg:px-4">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSideBar(true)}
              type="button"
              aria-label="Open navigation"
              className="shrink-0 rounded-md p-1.5 text-gray-700 transition hover:bg-gray-100 md:hidden"
            >
              <Menu size={22} strokeWidth={2} />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold leading-5 text-gray-900 sm:text-xl">{currentUser.greeting}</h1>
              <p className="mt-1 text-xs leading-4 text-gray-500">{currentUser.label} Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-5">
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={role === "student" ? "Search jobs, companies..." : "Search students, drives, companies..."}
                className="h-10 w-70 rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-cyan-200 focus:ring-2 focus:ring-cyan-100 lg:w-75"
              />
            </div>

            <button type="button" aria-label="Notifications" className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100">
              <Bell size={21} strokeWidth={1.8} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">{role === "student" ? "4" : "12"}</span>
            </button>

            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={roleMenuOpen}
                onClick={() => setRoleMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                  {role === "student" ? "AM" : "VK"}
                </span>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-semibold leading-4 text-gray-900">{currentUser.name}</p>
                  <p className="text-[10px] leading-4 text-gray-500">{currentUser.label}</p>
                </div>
                <ChevronDown size={16} className={`hidden text-gray-500 transition sm:block ${roleMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg" role="menu">
                  <div className="px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">Switch view</div>
                  {(["student", "officer"] as UserRole[]).map((option) => {
                    const details = roleDetails[option];
                    const isActive = option === role;

                    return (
                      <button
                        key={option}
                        type="button"
                        role="menuitem"
                        onClick={() => handleRoleChange(option)}
                        className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition ${isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-700 hover:bg-slate-50"}`}
                      >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${isActive ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                          {option === "student" ? <UserRound size={15} /> : <BriefcaseBusiness size={15} />}
                        </span>
                        <span className="flex-1">
                          <span className="block text-xs font-semibold">{details.label}</span>
                          <span className="block text-[10px] text-slate-500">{option === "student" ? "View jobs and applications" : "Manage campus placements"}</span>
                        </span>
                        {isActive && <span className="h-2 w-2 rounded-full bg-cyan-500" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {sideBar && (
        <div
          className="fixed inset-0 z-[999] flex h-dvh w-full overflow-hidden bg-black/50"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSideBar(false);
            }
          }}
        >
          <Sidebar onClose={() => setSideBar(false)} />
        </div>
      )}
    </div>
  );
};
