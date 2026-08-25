 import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuSections = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", icon: LayoutDashboard , route :"dashboard" },
      { label: "Students", icon: Users , route :"students" },
      { label: "Campus Drives", icon: CalendarDays ,route :"campusdrive" },
      // { label: "Applications", icon: ClipboardList , route :"applications"  },
      // { label: "Companies", icon: Building2 },
      // { label: "Resume Bank", icon: FileText },
      // { label: "Reports & Analytics", icon: BarChart3 },
    ],
  },
  {
    title: "RECOMMENDATION",
    items: [
      { label: "JD Based Recommendation", icon: FileText , route :"jdrecommendation" },
      { label: "Shortlisted Students", icon: Users ,route :"shortlistedstudents" },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      { label: "Notifications", icon: Bell ,route :"notifications" },
      { label: "Announcements", icon: Bell ,route :"announcements"},
      { label: "Emails", icon: Mail,route :"emails" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Settings", icon: Settings ,route :"settings"},
      { label: "User Management", icon: UserCog ,route :"usermanagement"},
      { label: "Drive Templates", icon: FileText ,route :"drivetemplates"},
    ],
  },
];

export const  Sidebar =()=> {
  const [activestate , setactivestate] = useState("Dashboard")
  const navigate = useNavigate()
  
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

                const active = item.label === activestate;

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
                    onClick={()=>{{setactivestate(item.label),navigate(item.route)}}}
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
      <div className="mt-auto pt-5">

        <p className="mb-3 text-[10px] font-bold tracking-wide text-gray-500">
          COLLEGE
        </p>

        <button className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-white p-2.5">

          <Building2
            size={22}
            strokeWidth={1.7}
            className="shrink-0 text-gray-700"
          />

          <div className="min-w-0 flex-1 ">
            <p className="truncate text-[10px] font-semibold text-gray-700">
              ABC Engineering College
            </p>

            <p className="text-[9px] text-gray-500">
              2024 - 2025
            </p>
          </div>

          <ChevronDown
            size={14}
            className="shrink-0 text-gray-500 lg:hidden"
          />
        </button>
      </div>
    </div>
  );
}

// 