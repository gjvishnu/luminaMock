import { Announcements } from "./announcements";
import { StudentAnnouncements } from "./student/misc/StudentAnnouncements";
import { useUserRole } from "../context/useUserRole";
import { useAppSelector } from "../redux";

export function AnnouncementsRoute() {
  const { role: contextRole } = useUserRole();
  const { user } = useAppSelector((state) => state.auth);
  const role =
    user?.role === "admin" || user?.role === "recruiter"
      ? "admin"
      : user?.role === "student"
        ? "student"
        : user?.role === "placementOfficer"
          ? "placementOfficer"
          : contextRole;

  return role === "student" ? <StudentAnnouncements /> : <Announcements />;
}
