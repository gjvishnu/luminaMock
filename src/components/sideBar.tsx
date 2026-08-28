import {
   BarChart3,
    CalendarDays,
   CirclePlus,
   FileText,
  GraduationCap,
  LayoutDashboard,
  Megaphone,

  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuSections = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard , route :"dashboard" },
      { label: "Students", icon: Users , route :"students" },
      { label: "Campus Drives", icon: CalendarDays ,route :"campusdrive" },
            { label: "Best fit Recommendation", icon: FileText , route :"jdrecommendation" },
      { label: "Reports", icon: BarChart3, route: "reports" },

      // { label: "Applications", icon: ClipboardList , route :"applications"  },
      // { label: "Companies", icon: Building2 },
      // { label: "Resume Bank", icon: FileText },
      // { label: "Reports & Analytics", icon: BarChart3 },
    ],
  },
  // {
  //   title: "RECOMMENDATION",
  //   items: [
  //     { label: "Shortlisted Students", icon: Users ,route :"shortlistedstudents" },
  //   ],
  // },
  {
    title: "Operation",
    items: [
       { label: "Announcements", icon: Megaphone ,route :"announcements"},
              { label: "Add drives", icon: CirclePlus  ,route :"add_drives"},

     ],
  },
  // {
  //   title: "SETTINGS",
  //   items: [
  //     { label: "Settings", icon: Settings ,route :"settings"},
  //     { label: "User Management", icon: UserCog ,route :"usermanagement"},
  //     { label: "Drive Templates", icon: FileText ,route :"drivetemplates"},
  //   ],
  // },
];

export const  Sidebar =()=> {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
<div className="hidden h-full   shrink-0 overflow-y-auto border border-gray-200 p-5 scrollbar-hidden sm:block md:w-[25%] lg:w-[15%]">
      {/* Logo */}
      <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500">
          <GraduationCap
            size={25}
            className="text-white"
            strokeWidth={2}
          />
        </div>

        <div className="min-w-0  ">
          <h1 className="text-base font-bold text-gray-900">
            Lumina
          </h1>

          <p className="text-[9px] text-gray-500 whitespace-nowrap">
            Placement intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-7">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-7">

            {/* Section title */}
            <p className="mb-3 text-[10px] font-bold tracking-wide text-gray-500">
              {section.title}
            </p>

            {/* Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const active = location.pathname === `/${item.route}` || location.pathname.startsWith(`/${item.route}/`);

                return (
                  <button
                    key={item.label}
                    className={`
                      flex
                      w-full
                      items-center
                      cursor-pointer
                      gap-3
                      rounded-lg
                      px-2.5
                      py-2.5
                      transition
                      ${
                        active
                          ? "bg-cyan-500 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                    onClick={() => {
                      navigate(item.route);
                    }}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="shrink-0"
                    />

                    {/* Hide text on very narrow sidebar */}
                    <span className="truncate text-[11px] font-medium ">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* College */}

    </div>
  );
}

//
