import { createBrowserRouter, Navigate } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./components/dashboard";
import { Students } from "./components/students";
import { RouterError } from "./components/routerError";
import { CampusDrive } from "./components/campusDrive";
import Login from "./components/login";

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
    ],
  },
]);