import { ApplicationDetailScreen } from "./ApplicationDetailScreen";
import { useParams } from "react-router-dom";

/**
 * Placement-officer route `/students/:studentId/applications/:applicationId` —
 * the same screen in read-only mode, so the student-only actions (Withdraw
 * Application, personal Notes) stay hidden and the Placement Cell notes block
 * is shown instead.
 */
export function StudentApplicationDetailRoute() {
  const { studentId } = useParams<{ studentId?: string }>();

  return (
    <ApplicationDetailScreen
      readOnly
      fallbackBackPath={
        studentId ? `/students/${studentId}/applications` : "/students"
      }
    />
  );
}
