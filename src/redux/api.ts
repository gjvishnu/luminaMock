import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { clearCredentials, SESSION_EXPIRED_MESSAGE, SESSION_EXPIRED_STORAGE_KEY, type AuthCredentials, type AuthUser } from "./authSlice";
import { resetRole } from "./roleSlice";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer" | string;
};

export type LogoutResponse = {
  message: string;
};

export type ApiStatus = "ACTIVE" | "INACTIVE" | string;

export type SkillRecord = {
  id?: string | number;
  skillId?: string;
  skillUuid?: string;
  skill: string;
  category: string;
  domain: string;
  status?: ApiStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type DepartmentRecord = {
  id?: string | number;
  departmentId?: string;
  departmentUuid?: string;
  name: string;
  status?: ApiStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type DegreeRecord = {
  id?: string | number;
  degreeName: string;
  status?: ApiStatus;
  createdAt?: string;
};

export type ManagedUser = {
  userUuid: string;
  email: string;
  role: string;
  status: ApiStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type StudentRecord = {
  id?: string | number;
  studentId?: string;
  studentUuid?: string;
  userUuid?: string;
  name?: string;
  fullName?: string;
  email?: string;
  registrationNumber?: string;
  registrationNo?: string;
  department?: string | { name?: string };
  departmentName?: string;
  program?: string;
  batch?: string | number;
  semester?: string | number;
  cgpa?: string | number;
  backlogs?: string | number;
  skills?: string[] | { name?: string; skill?: string }[];
  placementStatus?: string;
  drives?: string | number;
  resume?: string | boolean;
  resumeUrl?: string | null;
  profile?: string | number;
  profileCompletion?: string | number;
  status?: ApiStatus;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    name?: string;
    fullName?: string;
    email?: string;
  };
};

export type CreateUserRequest = {
  email: string;
  password: string;
  role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
};

export type UpdateUserRequest = Partial<Pick<CreateUserRequest, "email" | "password" | "role">> & {
  status?: "ACTIVE" | "INACTIVE";
};

export type CreateSkillRequest = {
  skill: string;
  category: string;
  domain: string;
};

export type CreateDepartmentRequest = {
  name: string;
};

export type CreateDegreeRequest = {
  degreeName: string;
};

export type CompanyRecord = {
  id?: string | number;
  companyId?: string;
  companyUuid?: string;
  name: string;
  website?: string | null;
  location?: string | null;
  status?: ApiStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateCompanyRequest = {
  name: string;
  website?: string;
  location: string;
};

export type DriveStatus = "DRAFT" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type DriveJobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT" | "APPRENTICESHIP";
export type SelectionProcess =
  | "ONLINE_ASSESSMENT"
  | "APTITUDE_TEST"
  | "TECHNICAL_TEST"
  | "GROUP_DISCUSSION"
  | "TECHNICAL_INTERVIEW"
  | "HR_INTERVIEW"
  | "MANAGERIAL_INTERVIEW"
  | "CASE_STUDY"
  | "CODING_ROUND"
  | "OTHER";

export type CreateDriveRoleRequest = {
  jobRole: string;
  jobLocation: string;
  jobType: DriveJobType;
  ctcPackage: string;
  numberOfOpenings: number;
  departments: string[];
  graduationYears: number[];
  minimumCgpa: number;
  maximumBacklogs: number;
  degree: string;
  otherCriteria: string[];
  jobDescription?: string;
  jdPdfUrl?: string | null;
  selectionProcesses: SelectionProcess[];
  skillIds: string[];
};

export type CreateDriveRequest = {
  companyId: string;
  driveDate: string;
  driveTime: string;
  venue: string;
  registrationEndDate: string;
  status: DriveStatus;
  roles: CreateDriveRoleRequest[];
};

export type DriveRoleRecord = Partial<CreateDriveRoleRequest> & {
  id?: string | number;
  roleId?: string;
  roleUuid?: string;
};

export type DriveRecord = {
  id?: string | number;
  driveId?: string;
  driveUuid?: string;
  companyId?: string;
  companyName?: string;
  company?: string | { name?: string; website?: string | null; location?: string | null };
  driveDate?: string;
  driveTime?: string;
  venue?: string;
  registrationEndDate?: string;
  status?: DriveStatus | string;
  roles?: DriveRoleRecord[];
  applications?: number;
  eligibleStudents?: number;
  totalApplicants?: number;
};

export type UpdateDriveRequest = Partial<Omit<CreateDriveRequest, "roles">>;
export type UpdateDriveRoleRequest = Partial<CreateDriveRoleRequest>;

export type DriveDetailRole = Omit<DriveRoleRecord, "departments" | "skillIds" | "jobLocation" | "minimumCgpa" | "maximumBacklogs" | "degree" | "jobDescription"> & {
  jobLocation?: string | null;
  minimumCgpa?: number | null;
  maximumBacklogs?: number | null;
  degree?: string | null;
  jobDescription?: string | null;
  departments?: DepartmentRecord[];
  skills?: SkillRecord[];
};

export type DriveDetailRecord = Omit<DriveRecord, "company" | "roles"> & {
  company?: { name?: string; website?: string | null; location?: string | null };
  roles?: DriveDetailRole[];
};

export type DriveListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  companyId?: string;
  status?: DriveStatus;
  driveDate?: string;
  driveDateFrom?: string;
  driveDateTo?: string;
  jobRole?: string;
  jobType?: DriveJobType;
};

export type DrivePagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type DriveListResponse = {
  drives: DriveRecord[];
  pagination: DrivePagination;
};

function unwrapList<T>(response: unknown, collectionKey: string): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const record = response as Record<string, unknown>;
  const nested = record[collectionKey] ?? record.data ?? record.items ?? record.results;

  if (Array.isArray(nested)) {
    return nested as T[];
  }

  if (nested && typeof nested === "object") {
    return unwrapList<T>(nested, collectionKey);
  }

  return [];
}

function unwrapEntity<T>(response: unknown, entityKey: string): T {
  if (response && typeof response === "object") {
    const record = response as Record<string, unknown>;
    const nested = record[entityKey] ?? record.data;
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      return nested as T;
    }
  }

  return response as T;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: AuthCredentials | { accessToken: null } };
      const accessToken = state.auth?.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

const baseQueryWithAuthExpiry: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const requestUrl = typeof args === "string" ? args : args.url;
  const isAuthenticationRequest = ["/api/users/login", "/api/users/refresh", "/api/users/logout"].some((path) => requestUrl.includes(path));

  if (result.error?.status === 401 && !isAuthenticationRequest) {
    api.dispatch(clearCredentials());
    api.dispatch(resetRole());

    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.sessionStorage.setItem(SESSION_EXPIRED_STORAGE_KEY, SESSION_EXPIRED_MESSAGE);
      window.location.assign("/login");
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Users", "Students", "Skills", "Departments", "Degrees", "Companies", "Drives"],
  baseQuery: baseQueryWithAuthExpiry,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
    getUsers: builder.query<ManagedUser[], void>({
      query: () => "/api/users",
      transformResponse: (response: unknown) => unwrapList<ManagedUser>(response, "users"),
      providesTags: (result) => result
        ? [{ type: "Users", id: "LIST" }, ...result.map((user) => ({ type: "Users" as const, id: user.userUuid }))]
        : [{ type: "Users", id: "LIST" }],
    }),
    createUser: builder.mutation<ManagedUser, CreateUserRequest>({
      query: (body) => ({
        url: "/api/users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<ManagedUser, { userUuid: string; body: UpdateUserRequest }>({
      query: ({ userUuid, body }) => ({
        url: `/api/users/${userUuid}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { userUuid }) => [
        { type: "Users", id: "LIST" },
        { type: "Users", id: userUuid },
      ],
    }),
    deactivateUser: builder.mutation<unknown, string>({
      query: (userUuid) => ({
        url: `/api/users/${userUuid}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getStudents: builder.query<StudentRecord[], void>({
      query: () => "/api/students",
      transformResponse: (response: unknown) => unwrapList<StudentRecord>(response, "students"),
      providesTags: (result) => result
        ? [{ type: "Students", id: "LIST" }, ...result.map((student) => ({ type: "Students" as const, id: student.studentUuid ?? student.studentId ?? student.id } ))]
        : [{ type: "Students", id: "LIST" }],
    }),
    getSkills: builder.query<SkillRecord[], void>({
      query: () => "/api/skills",
      transformResponse: (response: unknown) => unwrapList<SkillRecord>(response, "skills"),
      providesTags: (result) => result
        ? [{ type: "Skills", id: "LIST" }, ...result.map((skill) => ({ type: "Skills" as const, id: skill.skillUuid ?? skill.skillId ?? skill.id }))]
        : [{ type: "Skills", id: "LIST" }],
    }),
    createSkill: builder.mutation<SkillRecord, CreateSkillRequest>({
      query: (body) => ({
        url: "/api/skills",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Skills", id: "LIST" }],
    }),
    updateSkill: builder.mutation<SkillRecord, { id: string | number; body: CreateSkillRequest }>({
      query: ({ id, body }) => ({
        url: `/api/skills/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Skills", id: "LIST" }],
    }),
    deactivateSkill: builder.mutation<unknown, string | number>({
      query: (id) => ({
        url: `/api/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Skills", id: "LIST" }],
    }),
    getDepartments: builder.query<DepartmentRecord[], void>({
      query: () => "/api/departments",
      transformResponse: (response: unknown) => unwrapList<DepartmentRecord>(response, "departments"),
      providesTags: (result) => result
        ? [{ type: "Departments", id: "LIST" }, ...result.map((department) => ({ type: "Departments" as const, id: department.departmentUuid ?? department.departmentId ?? department.id }))]
        : [{ type: "Departments", id: "LIST" }],
    }),
    createDepartment: builder.mutation<DepartmentRecord, CreateDepartmentRequest>({
      query: (body) => ({
        url: "/api/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
    }),
    updateDepartment: builder.mutation<DepartmentRecord, { id: string | number; body: CreateDepartmentRequest }>({
      query: ({ id, body }) => ({
        url: `/api/departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
    }),
    deactivateDepartment: builder.mutation<unknown, string | number>({
      query: (id) => ({
        url: `/api/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Departments", id: "LIST" }],
    }),
    getDegrees: builder.query<DegreeRecord[], void>({
      query: () => "/api/degrees",
      transformResponse: (response: unknown) => unwrapList<DegreeRecord>(response, "degrees"),
      providesTags: [{ type: "Degrees", id: "LIST" }],
    }),
    createDegree: builder.mutation<DegreeRecord, CreateDegreeRequest>({
      query: (body) => ({
        url: "/api/degrees",
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) => unwrapEntity<DegreeRecord>(response, "degree"),
      invalidatesTags: [{ type: "Degrees", id: "LIST" }],
    }),
    getCompanies: builder.query<CompanyRecord[], void>({
      query: () => "/api/companies",
      transformResponse: (response: unknown) => unwrapList<CompanyRecord>(response, "companies"),
      providesTags: (result) => result
        ? [{ type: "Companies", id: "LIST" }, ...result.map((company) => ({ type: "Companies" as const, id: company.companyUuid ?? company.companyId ?? company.id }))]
        : [{ type: "Companies", id: "LIST" }],
    }),
    createCompany: builder.mutation<CompanyRecord, CreateCompanyRequest>({
      query: (body) => ({
        url: "/api/companies",
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) => unwrapEntity<CompanyRecord>(response, "company"),
      invalidatesTags: [{ type: "Companies", id: "LIST" }],
    }),
    getDrives: builder.query<DriveListResponse, DriveListParams | void>({
      query: (params) => ({
        url: "/api/drives",
        params: params ?? undefined,
      }),
      transformResponse: (response: unknown) => {
        const drives = unwrapList<DriveRecord>(response, "drives");
        const pagination = (response as { pagination?: Partial<DrivePagination> } | null)?.pagination;

        return {
          drives,
          pagination: {
            page: pagination?.page ?? 1,
            pageSize: pagination?.pageSize ?? drives.length,
            total: pagination?.total ?? drives.length,
            totalPages: pagination?.totalPages ?? 1,
          },
        };
      },
      providesTags: (result) => result
        ? [{ type: "Drives", id: "LIST" }, ...result.drives.map((drive) => ({ type: "Drives" as const, id: drive.driveUuid ?? drive.driveId ?? drive.id }))]
        : [{ type: "Drives", id: "LIST" }],
    }),
    getDrive: builder.query<DriveDetailRecord, string>({
      query: (driveId) => `/api/drives/${driveId}`,
      transformResponse: (response: unknown) => unwrapEntity<DriveDetailRecord>(response, "drive"),
      providesTags: (_result, _error, driveId) => [{ type: "Drives", id: driveId }],
    }),
    createDrive: builder.mutation<DriveRecord, CreateDriveRequest>({
      query: (body) => ({
        url: "/api/drives",
        method: "POST",
        body,
      }),
      transformResponse: (response: unknown) => unwrapEntity<DriveRecord>(response, "drive"),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
    updateDrive: builder.mutation<DriveDetailRecord, { driveId: string; body: UpdateDriveRequest }>({
      query: ({ driveId, body }) => ({
        url: `/api/drives/${driveId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
    deleteDrive: builder.mutation<unknown, string>({
      query: (driveId) => ({
        url: `/api/drives/${driveId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
    addDriveRole: builder.mutation<DriveDetailRole, { driveId: string; body: CreateDriveRoleRequest }>({
      query: ({ driveId, body }) => ({
        url: `/api/drives/${driveId}/roles`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
    updateDriveRole: builder.mutation<DriveDetailRole, { driveId: string; roleId: string; body: UpdateDriveRoleRequest }>({
      query: ({ driveId, roleId, body }) => ({
        url: `/api/drives/${driveId}/roles/${roleId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
    deleteDriveRole: builder.mutation<unknown, { driveId: string; roleId: string }>({
      query: ({ driveId, roleId }) => ({
        url: `/api/drives/${driveId}/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Drives", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeactivateUserMutation,
  useGetStudentsQuery,
  useGetSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeactivateSkillMutation,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeactivateDepartmentMutation,
  useGetDegreesQuery,
  useCreateDegreeMutation,
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useGetDrivesQuery,
  useGetDriveQuery,
  useCreateDriveMutation,
  useUpdateDriveMutation,
  useDeleteDriveMutation,
  useAddDriveRoleMutation,
  useUpdateDriveRoleMutation,
  useDeleteDriveRoleMutation,
} = authApi;
