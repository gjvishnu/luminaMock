import { Announcements } from "./announcements";
import { StudentAnnouncements } from "./studentPages";
import { useUserRole } from "../context/useUserRole";

export function AnnouncementsRoute() {
  const { role } = useUserRole();

  return role === "student" ? <StudentAnnouncements /> : <Announcements />;
}
