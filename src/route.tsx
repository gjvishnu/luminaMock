import { createBrowserRouter, Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./components/dashboard";
import { Students } from "./components/students";
import { RouterError } from "./components/routerError";
import { CampusDrive } from "./components/campusDrive";
import { DriveDetails } from "./components/driveDetails";
import { JDRecommendation } from "./components/jdRecommendation";
import Login from "./components/login";
import { AddDrive } from "./components/addDrive";
import { AnnouncementsRoute } from "./components/announcementsRoute";
import { Reports } from "./components/reports";

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
  // Login redirect
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <RouterError />,
  },

  // Login page
  {
    path: "/login",
    element: <Login />,
    errorElement: <RouterError />,
  },

  // Main application
  {
    path: "/",
    element: <Home />,
    errorElement: <RouterError />,

    children: [
      // Dashboard
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      // Students Directory
      {
        path: "students",
        element: <Students />,
      },

      // TPO - View selected student
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      // TPO - View applications of selected student
      {
        path: "students/:studentId/applications",
        element: <StudentApplicationDetails />,
      },

      // Campus Drive
      {
        path: "campusdrive",
        element: <CampusDrive />,
      },

      // Campus Drive Details
      {
        path: "campusdrive/:driveId",
        element: <DriveDetails />,
      },

      // JD Recommendation
      {
        path: "jdrecommendation",
        element: <JDRecommendation />,
      },

      // Add Drive
      {
        path: "add_drives",
        element: <AddDrive />,
      },

      // Announcements
      {
        path: "announcements",
        element: <AnnouncementsRoute />,
      },

      // Reports
      {
        path: "reports",
        element: <Reports />,
      },

      // ==========================================
      // STUDENT SIDE
      // ==========================================

      // Jobs
      {
        path: "jobs",
        element: <StudentJobs />,
      },

      // Job Details
      {
        path: "jobs/:jobId",
        element: <StudentJobDetails />,
      },

      // Student Applications
      {
        path: "applications",
        element: <StudentApplications />,
      },

      // Student Profile
      {
        path: "profile",
        element: <StudentProfile />,
      },

      // Student Resume
      {
        path: "resume",
        element: <StudentResume />,
      },
    ],
  },
]);
