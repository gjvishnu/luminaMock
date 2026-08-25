import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";


// ======================================================
// HEADER
// ======================================================

export const Header = () => {
  const [sideBar, setSideBar] = useState(false);

  return (
    <>
      <div className="relative">

        <header className="w-full border-b border-gray-200 bg-white">

          <div className="flex h-17 items-center justify-between sm:px-6 lg:px-2">

            {/* ========================= */}
            {/* Left Section */}
            {/* ========================= */}

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

              {/* Menu */}
              <button
                onClick={() => {
                  setSideBar(true);
                }}
                type="button"
                className="shrink-0 rounded-md p-1.5 text-gray-700 transition hover:bg-gray-100 md:hidden"
              >
                <Menu
                  size={22}
                  strokeWidth={2}
                />
              </button>


              {/* Welcome Text */}
              <div className="min-w-0">

                <h1 className="truncate text-base font-semibold leading-5 text-gray-900 sm:text-xl">
                  Welcome, Vikram 👋
                </h1>

                <p className="mt-1 text-xs leading-4 text-gray-500 sm:text-xs">
                  Placement Officer Dashboard
                </p>

              </div>

            </div>


            {/* ========================= */}
            {/* Right Section */}
            {/* ========================= */}

            <div className="flex items-center gap-2 sm:gap-5">

              {/* Search */}
              <div className="relative hidden md:block">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search students, drives, companies..."
                  className="
                    h-10
                    w-70
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    text-gray-700
                    outline-none
                    placeholder:text-gray-400
                    focus:border-cyan-200
                    focus:ring-2
                    focus:ring-indigo-100
                    lg:w-75
                  "
                />

              </div>


              {/* Notification */}
              <button
                type="button"
                className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100"
              >

                <Bell
                  size={21}
                  strokeWidth={1.8}
                />

                {/* Notification Count */}
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-[17px]
                    min-w-[17px]
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    px-1
                    text-[9px]
                    font-semibold
                    text-white
                  "
                >
                  12
                </span>

              </button>


              {/* Profile */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-50"
              >

                {/* Avatar */}
                <img
                  src="https://github.com/shadcn.png"
                  alt="Priya Sharma"
                  className="h-9 w-9 rounded-full object-cover"
                />

                {/* User Info */}
                <div className="hidden text-left sm:block">

                  <p className="text-xs font-semibold leading-4 text-gray-900">
                    Vikram
                  </p>

                  <p className="text-[10px] leading-4 text-gray-500">
                    Placement Officer
                  </p>

                </div>

                {/* Dropdown */}
                <ChevronDown
                  size={16}
                  className="hidden text-gray-500 sm:block"
                />

              </button>

            </div>

          </div>

        </header>


        {/* ================================================== */}
        {/* MOBILE SIDEBAR */}
        {/* ================================================== */}

        {sideBar && (
          <div className="absolute z-[999] h-screen w-full bg-black/50">

            <Sidebar
              onClose={setSideBar}
            />

          </div>
        )}

      </div>
    </>
  );
};


// ======================================================
// SIDEBAR MENU DATA
// ======================================================

const menuSections = [
  {
    title: "MAIN",

    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        route: "dashboard",
      },

      {
        label: "Students",
        icon: Users,
        route: "students",
      },

      {
        label: "Campus Drives",
        icon: CalendarDays,
        route: "campusdrive",
      },
    ],
  },


  {
    title: "RECOMMENDATION",

    items: [
      {
        label: "JD Based Recommendation",
        icon: FileText,
        route: "jdrecommendation",
      },

      {
        label: "Shortlisted Students",
        icon: Users,
        route: "shortlistedstudents",
      },
    ],
  },


  {
    title: "COMMUNICATION",

    items: [
      {
        label: "Notifications",
        icon: Bell,
        route: "notifications",
      },

      {
        label: "Announcements",
        icon: Bell,
        route: "announcements",
      },

      {
        label: "Emails",
        icon: Mail,
        route: "emails",
      },
    ],
  },


  {
    title: "SETTINGS",

    items: [
      {
        label: "Settings",
        icon: Settings,
        route: "settings",
      },

      {
        label: "User Management",
        icon: UserCog,
        route: "usermanagement",
      },

      {
        label: "Drive Templates",
        icon: FileText,
        route: "drivetemplates",
      },
    ],
  },
];


// ======================================================
// SIDEBAR PROPS
// ======================================================

interface SidebarProps {
  onClose: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}


// ======================================================
// SIDEBAR
// ======================================================

export const Sidebar = ({
  onClose,
}: SidebarProps) => {

  const navigate = useNavigate();

  const location = useLocation();


  return (
    <div className="relative flex h-full w-[280px] shrink-0 flex-col overflow-y-auto bg-white p-5 scrollbar-hidden">


      {/* ================================================== */}
      {/* X BUTTON */}
      {/* ================================================== */}

      <button
        type="button"
        onClick={() => {
          onClose(false);
        }}
        className="
          absolute
          right-3
          top-3
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          text-gray-400
          hover:bg-gray-100
          hover:text-gray-700
        "
      >

        <X size={18} />

      </button>


      {/* ================================================== */}
      {/* LOGO */}
      {/* ================================================== */}

      <div className="flex items-center gap-3 border-b border-gray-100 pb-6">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500">

          <GraduationCap
            size={25}
            className="text-white"
            strokeWidth={2}
          />

        </div>


        <div className="min-w-0">

          <h1 className="text-base font-bold text-gray-900">
            Lumina
          </h1>

          <p className="whitespace-nowrap text-[9px] text-gray-500">
            Placement intelligence
          </p>

        </div>

      </div>


      {/* ================================================== */}
      {/* NAVIGATION */}
      {/* ================================================== */}

      <div className="mt-7 flex-1">

        {menuSections.map((section) => (

          <div
            key={section.title}
            className="mb-7"
          >

            {/* Section title */}
            <p className="mb-3 text-[10px] font-bold tracking-wide text-gray-500">
              {section.title}
            </p>


            {/* Items */}
            <div className="space-y-1">

              {section.items.map((item) => {

                const Icon = item.icon;


                /*
                  Check the current URL instead of
                  maintaining a separate activeState.
                */

                const active =
                  location.pathname === `/${item.route}` ||
                  location.pathname.startsWith(
                    `/${item.route}/`
                  );


                return (

                  <button
                    key={item.label}
                    type="button"
                    className={`
                      flex
                      w-full
                      cursor-pointer
                      items-center
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

                      // Close mobile sidebar
                      onClose(false);

                    }}
                  >

                    <Icon
                      size={17}
                      strokeWidth={1.8}
                      className="shrink-0"
                    />


                    <span className="truncate text-[11px] font-medium">
                      {item.label}
                    </span>

                  </button>

                );

              })}

            </div>

          </div>

        ))}

      </div>


      {/* ================================================== */}
      {/* COLLEGE */}
      {/* ================================================== */}

      <div className="pt-5">

        <p className="mb-3 text-[10px] font-bold tracking-wide text-gray-500">
          COLLEGE
        </p>


        <button
          type="button"
          className="
            flex
            w-full
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            p-2.5
            hover:bg-gray-50
          "
        >

          <Building2
            size={22}
            strokeWidth={1.7}
            className="shrink-0 text-gray-700"
          />


          <div className="min-w-0 flex-1">

            <p className="truncate text-[10px] font-semibold text-gray-700">
              ABC Engineering College
            </p>

            <p className="text-[9px] text-gray-500">
              2024 - 2025
            </p>

          </div>


          <ChevronDown
            size={14}
            className="shrink-0 text-gray-500"
          />

        </button>

      </div>

    </div>
  );
};