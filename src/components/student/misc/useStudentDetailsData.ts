import {
  type StudentProfileRecord,
  useGetDegreesQuery,
  useGetDepartmentsQuery,
  useGetInternshipsQuery,
  useGetProjectsQuery,
  useGetStudentSkillsQuery,
  useGetStudentsQuery,
} from "../../../redux/api";
import { getApiErrorMessage } from "../../formHelpers";
import { toProfileData } from "../shared/helpers";

const FRESH_ON_OPEN = { refetchOnMountOrArgChange: true };

// There is no single-student API, so the record comes from the student list.
// Email is left empty: it is not on the student record and only admins can read users.
export function useStudentDetailsData(studentId: string) {
  const studentsQuery = useGetStudentsQuery(undefined, FRESH_ON_OPEN);
  const departmentsQuery = useGetDepartmentsQuery();
  const degreesQuery = useGetDegreesQuery();

  const record = studentsQuery.data?.find((student) => String(student.id) === studentId);
  const student = record as unknown as StudentProfileRecord | undefined;
  const studentOptions = { ...FRESH_ON_OPEN, skip: !student };
  const skillsQuery = useGetStudentSkillsQuery(studentId, studentOptions);
  const internshipsQuery = useGetInternshipsQuery(studentId, studentOptions);
  const projectsQuery = useGetProjectsQuery(studentId, studentOptions);

  const queries = [studentsQuery, skillsQuery, internshipsQuery, projectsQuery];
  const isLoading = queries.some((query) => query.isFetching) || departmentsQuery.isLoading || degreesQuery.isLoading;
  const error = queries.find((query) => query.error)?.error;

  const refetch = () => {
    void studentsQuery.refetch();
    if (student) queries.slice(1).forEach((query) => void query.refetch());
  };

  if (isLoading || error) {
    return { isLoading, errorMessage: error ? getApiErrorMessage(error, "Unable to load this student.") : "", refetch, profile: null };
  }

  if (!student) {
    return { isLoading, errorMessage: "Student not found.", refetch, profile: null };
  }

  return {
    isLoading,
    errorMessage: "",
    refetch,
    profile: toProfileData({
      email: "",
      student,
      departments: departmentsQuery.data ?? [],
      degrees: degreesQuery.data ?? [],
      skills: skillsQuery.data ?? [],
      internships: internshipsQuery.data ?? [],
      projects: projectsQuery.data ?? [],
    }),
  };
}
