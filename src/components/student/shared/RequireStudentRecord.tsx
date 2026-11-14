import { selectUser, useAppSelector } from "../../../redux";
import { useGetStudentProfileQuery } from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { ProfileLoadError, ProfileLoading } from "../profile/ProfileStatus";
import { EmptyState } from "./EmptyState";
import { useNavigate } from "react-router-dom";

/**
 * Jobs and applications APIs take the student record id, not the user's
 * userUuid. This loads it for the logged-in student and renders `children`
 * with it, or a prompt to complete the profile when there is no record yet.
 */
export function RequireStudentRecord({
  loadingLabel,
  emptyTitle,
  emptyDescription,
  children,
}: {
  loadingLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  children: (studentId: string) => React.ReactNode;
}) {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const userId = user?.userUuid ?? "";
  const profileQuery = useGetStudentProfileQuery(userId, { skip: !userId });

  if (profileQuery.isLoading) return <ProfileLoading label={loadingLabel} />;
  if (profileQuery.error) {
    return (
      <ProfileLoadError
        message={getApiErrorMessage(profileQuery.error, "Unable to load your student profile.")}
        onRetry={() => void profileQuery.refetch()}
      />
    );
  }

  const studentId = profileQuery.data?.student?.id;
  if (!studentId) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Complete Profile"
        onAction={() => navigate("/profile/edit")}
      />
    );
  }

  return <>{children(studentId)}</>;
}
