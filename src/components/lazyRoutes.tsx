import { lazyRoute } from "./RouteErrorBoundary";

// Route-level code splitting: each page becomes its own chunk that loads
// on demand. The shell (Home / sidebar / header) stays eager so navigation
// never flashes an empty frame. While a chunk downloads, the shared
// PageFallback skeleton shows; if the chunk fails (offline / stale deploy),
// the shared PageError screen (Try Again / Go to Dashboard / Contact Support)
// shows instead. All pages use named exports, so each import maps to default.
export const DashboardElement = lazyRoute(() =>
  import("./dashboard").then((m) => ({ default: m.Dashboard })),
);
export const UserManagementElement = lazyRoute(() =>
  import("./userManagement").then((m) => ({
    default: m.UserManagement,
  })),
);
export const StudentsElement = lazyRoute(() =>
  import("./students").then((m) => ({ default: m.Students })),
);
export const CampusDriveElement = lazyRoute(() =>
  import("./campusDrive").then((m) => ({ default: m.CampusDrive })),
);
export const DriveDetailsElement = lazyRoute(() =>
  import("./driveDetails").then((m) => ({
    default: m.DriveDetails,
  })),
);
export const JdRecommendationElement = lazyRoute(() =>
  import("./jdRecommendation").then((m) => ({
    default: m.JDRecommendation,
  })),
);
export const DriveStudentsElement = lazyRoute(() =>
  import("./driveStudents").then((m) => ({
    default: m.DriveStudents,
  })),
);
export const AddDriveElement = lazyRoute(() =>
  import("./addDrive").then((m) => ({ default: m.AddDrive })),
);
export const AnnouncementsElement = lazyRoute(() =>
  import("./announcementsRoute").then((m) => ({
    default: m.AnnouncementsRoute,
  })),
);
export const ReportsElement = lazyRoute(() =>
  import("./reports").then((m) => ({ default: m.Reports })),
);
export const StatusTrackerElement = lazyRoute(() =>
  import("./statusTracker").then((m) => ({
    default: m.StatusTracker,
  })),
);
export const ApplicationDetailElement = lazyRoute(() =>
  import("./student/applications/ApplicationDetailRoute").then((m) => ({
    default: m.ApplicationDetailRoute,
  })),
);
export const StudentApplicationDetailElement = lazyRoute(() =>
  import("./student/applications/StudentApplicationDetailRoute").then((m) => ({
    default: m.StudentApplicationDetailRoute,
  })),
);
export const StudentApplicationsElement = lazyRoute(() =>
  import("./student/applications/StudentApplications").then((m) => ({
    default: m.StudentApplications,
  })),
);
export const StudentJobDetailsElement = lazyRoute(() =>
  import("./student/jobs/StudentJobDetails").then((m) => ({
    default: m.StudentJobDetails,
  })),
);
export const StudentJobsElement = lazyRoute(() =>
  import("./student/jobs/StudentJobs").then((m) => ({
    default: m.StudentJobs,
  })),
);
export const StudentApplicationDetailsElement = lazyRoute(() =>
  import("./student/misc/StudentApplicationDetails").then((m) => ({
    default: m.StudentApplicationDetails,
  })),
);
export const StudentDetailsElement = lazyRoute(() =>
  import("./student/misc/StudentDetails").then((m) => ({
    default: m.StudentDetails,
  })),
);
export const StudentResumeElement = lazyRoute(() =>
  import("./student/misc/StudentResume").then((m) => ({
    default: m.StudentResume,
  })),
);
export const StudentProfileElement = lazyRoute(() =>
  import("./student/profile/StudentProfile").then((m) => ({
    default: m.StudentProfile,
  })),
);
