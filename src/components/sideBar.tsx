import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CirclePlus,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserRole } from "../context/useUserRole";

type MenuItem = {
  label: string;
  icon: typeof LayoutDashboard;
  route: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const officerMenuSections: MenuSection[] = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
      { label: "Students", icon: Users, route: "students" },
      { label: "Campus Drives", icon: CalendarDays, route: "campusdrive" },
      { label: "Best fit Recommendation", icon: FileText, route: "jdrecommendation" },
      { label: "Reports", icon: BarChart3, route: "reports" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Announcements", icon: Megaphone, route: "announcements" },
      { label: "Create Drives", icon: CirclePlus, route: "add_drives" },
    ],
  },
];

const studentMenuSections: MenuSection[] = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, route: "dashboard" },
      { label: "Jobs", icon: BriefcaseBusiness, route: "jobs" },
      { label: "Applications", icon: ClipboardList, route: "applications" },
      { label: "Profile", icon: UserRound, route: "profile" },
    ],
  },
  
];

type SidebarProps = {
  onClose?: () => void;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useUserRole();
  const menuSections = role === "student" ? studentMenuSections : officerMenuSections;

  return (
    <div className={`${onClose ? "flex" : "hidden md:flex"} relative h-full w-[280px] shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white p-5 scrollbar-hidden md:w-[25%] lg:w-[15%]`}>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      )}

      <div className="flex items-center gap-3 border-b border-gray-100 pb-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500">
          <GraduationCap size={25} className="text-white" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h1 className="text-base font-bold text-gray-900">Lumina</h1>
          <p className="whitespace-nowrap text-[9px] text-gray-500">{role === "student" ? "Student placement hub" : "Placement intelligence"}</p>
        </div>
      </div>

      <nav className="mt-7 flex-1" aria-label={`${role === "student" ? "Student" : "Placement officer"} navigation`}>
        {menuSections.map((section) => (
          <div key={section.title} className="mb-7">
            <p className="mb-3 text-[10px] font-bold tracking-wide text-gray-500">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === `/${item.route}` || location.pathname.startsWith(`/${item.route}/`);

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition ${active ? "bg-cyan-500 text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => {
                      navigate(item.route);
                      onClose?.();
                    }}
                  >
                    <Icon size={17} strokeWidth={1.8} className="shrink-0" />
                    <span className="truncate text-[11px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};
