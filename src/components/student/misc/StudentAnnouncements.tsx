import { PageHeader } from "../shared/PageHeader";
import { Megaphone } from "lucide-react";

export function StudentAnnouncements() {
  const announcements = [
    {
      title: "TCS Campus Drive Registration Open",
      text: "Applications are open for eligible 2026 batch students.",
      date: "2 hours ago",
    },
    {
      title: "Resume submission deadline extended",
      text: "Update your resume before the next shortlisting round.",
      date: "Yesterday",
    },
    {
      title: "Placement orientation on Friday",
      text: "Join the placement cell orientation at 10:00 AM in Seminar Hall.",
      date: "2 days ago",
    },
  ];

  return (
    <div className="space-y-4 pb-5">
      <PageHeader
        title="Announcements"
        description="Important updates from your placement cell."
      />
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <section
            key={announcement.title}
            className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-500">
              <Megaphone size={18} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-slate-800">
                  {announcement.title}
                </h2>
                <span className="text-[10px] text-slate-500">
                  {announcement.date}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {announcement.text}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   TPO / PLACEMENT OFFICER - STUDENT APPLICATION DETAILS
   Reuses the exact same ApplicationsBoard list UI as the
   student's own "My Applications" page. Its "View Details"
   action opens the read-only detail route
   (/students/:studentId/applications/:applicationId). The
   top-level back action returns to the students LIST (not the
   student's detail screen).
========================================================= */
