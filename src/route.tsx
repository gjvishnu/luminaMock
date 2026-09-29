import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./components/dashboard";
import { Students } from "./components/students";
import { UserManagement } from "./components/userManagement";
import { RouterError } from "./components/routerError";
import { CampusDrive } from "./components/campusDrive";
import { DriveDetails } from "./components/driveDetails";
import { JDRecommendation } from "./components/jdRecommendation";
import { DriveStudents } from "./components/driveStudents";
import Login from "./components/login";
import { AddDrive } from "./components/addDrive";
import { AnnouncementsRoute } from "./components/announcementsRoute";
import { Reports } from "./components/reports";
import { StatusTracker } from "./components/statusTracker";
import { RoleProvider } from "./context/roleProvider";

import { ApplicationDetailRoute } from "./components/student/applications/ApplicationDetailRoute";
import { StudentApplicationDetailRoute } from "./components/student/applications/StudentApplicationDetailRoute";
import { StudentApplications } from "./components/student/applications/StudentApplications";
import { StudentJobDetails } from "./components/student/jobs/StudentJobDetails";
import { StudentJobs } from "./components/student/jobs/StudentJobs";
import { StudentApplicationDetails } from "./components/student/misc/StudentApplicationDetails";
import { StudentDetails } from "./components/student/misc/StudentDetails";
import { StudentResume } from "./components/student/misc/StudentResume";
import { StudentProfile } from "./components/student/profile/StudentProfile";

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
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "user-management",
            element: <UserManagement />,
          },
          {
            path: "students",
            element: <Students />,
          },
          {
            path: "students/:studentId",
            element: <StudentDetails />,
          },
          {
            path: "students/:studentId/applications",
            element: <StudentApplicationDetails />,
          },
          {
            path: "students/:studentId/applications/:applicationId",
            element: <StudentApplicationDetailRoute />,
          },
          {
            path: "campusdrive",
            element: <CampusDrive />,
          },
          {
            path: "campusdrive/:driveId",
            element: <DriveDetails />,
          },
          {
            path: "jdrecommendation",
            element: <JDRecommendation />,
          },
          {
            path: "jdrecommendation/:driveId/students",
            element: <DriveStudents />,
          },
          {
            path: "jdrecommendation/students",
            element: <DriveStudents />,
          },
          {
            path: "add_drives",
            element: <AddDrive />,
          },
          {
            path: "announcements",
            element: <AnnouncementsRoute />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "status-tracker",
            element: <StatusTracker />,
          },
          {
            path: "status-tracker/:driveId",
            element: <StatusTracker />,
          },
          {
            path: "jobs",
            element: <StudentJobs />,
          },
          {
            path: "jobs/:jobId",
            element: <StudentJobDetails />,
          },
          {
            path: "applications",
            element: <StudentApplications />,
          },
          {
            path: "applications/:applicationId",
            element: <ApplicationDetailRoute />,
          },
          {
            path: "profile",
            element: <StudentProfile />,
          },
          {
            path: "resume",
            element: <StudentResume />,
          },
        ],
      },
    ],
  },
]);
