import { selectUser, useAppSelector } from "../../../redux";
import {
  useGetDegreesQuery,
  useGetDepartmentsQuery,
  useGetInternshipsQuery,
  useGetProjectsQuery,
  useGetStudentProfileQuery,
  useGetStudentSkillsQuery,
} from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { toProfileData } from "../shared/helpers";

const FRESH_ON_OPEN = { refetchOnMountOrArgChange: true };

// Profile saves do not invalidate these queries: a refetch while the edit page
// is open would reload the page and drop other sections' unsaved changes.
// Each screen fetches fresh data when it opens instead.
export function useStudentProfileData() {
  const user = useAppSelector(selectUser);
  const userId = user?.userUuid ?? "";

  const profileQuery = useGetStudentProfileQuery(userId, { ...FRESH_ON_OPEN, skip: !userId });
  const departmentsQuery = useGetDepartmentsQuery();
  const degreesQuery = useGetDegreesQuery();

  const student = profileQuery.data?.student ?? null;
  const studentId = student?.id ?? "";
  const studentOptions = { ...FRESH_ON_OPEN, skip: !studentId };
  const skillsQuery = useGetStudentSkillsQuery(studentId, studentOptions);
  const internshipsQuery = useGetInternshipsQuery(studentId, studentOptions);
  const projectsQuery = useGetProjectsQuery(studentId, studentOptions);

  const queries = [profileQuery, skillsQuery, internshipsQuery, projectsQuery];
  const isLoading = queries.some((query) => query.isFetching) || departmentsQuery.isLoading || degreesQuery.isLoading;
  const error = queries.find((query) => query.error)?.error;

  const refetch = () => {
    void profileQuery.refetch();
    if (studentId) queries.slice(1).forEach((query) => void query.refetch());
  };

  if (isLoading || error || !user || !profileQuery.data) {
    return { isLoading, errorMessage: error ? getApiErrorMessage(error, "") : "", refetch, result: null };
  }

  const departments = departmentsQuery.data ?? [];
  const degrees = degreesQuery.data ?? [];
  const skills = (student && skillsQuery.data) || [];
  const internships = (student && internshipsQuery.data) || [];
  const projects = (student && projectsQuery.data) || [];

  return {
    isLoading,
    errorMessage: "",
    refetch,
    result: {
      user,
      student,
      freshUser: profileQuery.data.freshUser,
      departments,
      degrees,
      skills,
      internships,
      projects,
      profile: toProfileData({ email: user.email, student, departments, degrees, skills, internships, projects }),
    },
  };
}
