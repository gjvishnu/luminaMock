import { Announcements } from "./announcements";
import { StudentAnnouncements } from "./student/misc/StudentAnnouncements";
import { useAppSelector } from "../redux";

export function AnnouncementsRoute() {
  const { user } = useAppSelector((state) => state.auth);
  const role = user?.role || "placementOfficer";

  return role === "student" ? <StudentAnnouncements /> : <Announcements />;
}