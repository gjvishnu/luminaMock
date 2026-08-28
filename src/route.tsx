import { createBrowserRouter, Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./components/dashboard";
import { Students } from "./components/students";
import { RouterError } from "./components/routerError";
import { CampusDrive } from "./components/campusDrive";
import { DriveDetails } from "./components/driveDetails";
import { JDRecommendation } from "./components/jdRecommendation";
import Login from "./components/login";
import  { AddDrive } from "./components/addDrive";
import { Announcements } from "./components/announcements";
import { Reports } from "./components/reports";

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
        path: "add_drives",
        element: <AddDrive/>,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);
