import { createBrowserRouter, Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./components/dashboard";
import { Students } from "./components/students";
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

import {
  StudentApplications,
  StudentJobDetails,
  StudentJobs,
  StudentProfile,
  StudentResume,
  StudentDetails,
  StudentApplicationDetails,
} from "./components/studentPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <RouterError />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouterError />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <RouterError />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "resume",
        element: <StudentResume />,
      },
    ],
  },
]);
