import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { Home } from "./pages/home";
import { RouterError } from "./components/routerError";
import { RoleProvider } from "./context/roleProvider";

import {
  AddDriveElement,
  AnnouncementsElement,
  ApplicationDetailElement,
  CampusDriveElement,
  DashboardElement,
  DriveDetailsElement,
  DriveStudentsElement,
  JdRecommendationElement,
  ReportsElement,
  StatusTrackerElement,
  StudentApplicationDetailElement,
  StudentApplicationDetailsElement,
  StudentApplicationsElement,
  StudentDetailsElement,
  StudentJobDetailsElement,
  StudentJobsElement,
  StudentProfileElement,
  StudentResumeElement,
  StudentsElement,
  UserManagementElement,
} from "./components/lazyRoutes";

function AppLayout() {
  return (
    <RoleProvider>
      <Outlet />
    </RoleProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouterError />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "dashboard",
            children: [
              {
                index: true,
                element: DashboardElement,
              },
              {
                path: "actions",
                element: UserManagementElement,
              },
              {
                path: "user-management",
                element: <Navigate to="/dashboard/actions" replace />,
              },
              {
                path: "students",
                element: StudentsElement,
              },
              {
                path: "students/:studentId",
                element: StudentDetailsElement,
              },
              {
                path: "students/:studentId/applications",
                element: StudentApplicationDetailsElement,
              },
              {
                path: "students/:studentId/applications/:applicationId",
                element: StudentApplicationDetailElement,
              },
              {
                path: "campusdrive",
                element: CampusDriveElement,
              },
              {
                path: "campusdrive/:driveId",
                element: DriveDetailsElement,
              },
              {
                path: "jdrecommendation",
                element: JdRecommendationElement,
              },
              {
                path: "jdrecommendation/:driveId/students",
                element: DriveStudentsElement,
              },
              {
                path: "jdrecommendation/students",
                element: DriveStudentsElement,
              },
              {
                path: "add_drives",
                element: AddDriveElement,
              },
              {
                path: "announcements",
                element: AnnouncementsElement,
              },
              {
                path: "reports",
                element: ReportsElement,
              },
              {
                path: "status-tracker",
                element: StatusTrackerElement,
              },
              {
                path: "status-tracker/:driveId",
                element: StatusTrackerElement,
              },
              {
                path: "jobs",
                element: StudentJobsElement,
              },
              {
                path: "jobs/:jobId",
                element: StudentJobDetailsElement,
              },
              {
                path: "applications",
                element: StudentApplicationsElement,
              },
              {
                path: "applications/:applicationId",
                element: ApplicationDetailElement,
              },
              {
                path: "profile",
                element: StudentProfileElement,
              },
              {
                path: "resume",
                element: StudentResumeElement,
              },
            ],
          },
        ],
      },
    ],
  },
]);
