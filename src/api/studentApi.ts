import axios from "axios";
import api from "./axiosInstance";

/** Student record exactly as the backend (Prisma) returns it. */
export interface StudentRecord {
  id: string;
  userId: number | null;
  name: string;
  resume: string | null;
  email: string;
  phone: string | null;
  dateOfBirth: string | null; // ISO string, e.g. "2004-05-20T00:00:00.000Z"
  location: string | null;
  registrationNumber: string;
  department: string | null; // UUID on the backend
  program: string | null;
  batch: number | null;
  semester: number | null;
  cgpa: string | number | null; // Prisma Decimal is serialised as a string
  backlogs: number;
  createdAt?: string;
  updatedAt?: string;
}

/** Body for POST /students (snake_case, as documented in API.md). */
export interface CreateStudentPayload {
  name: string;
  email: string;
  registration_number: string;
  resume?: string | null;
  phone?: string | null;
  date_of_birth?: string | null; // YYYY-MM-DD
  location?: string | null;
  department?: string | null; // must be a UUID
  program?: string | null;
  batch?: number | null;
  semester?: number | null;
  cgpa?: number | null;
  backlogs?: number;
}

/** Body for PATCH /students/:id - every field optional. */
export type UpdateStudentPayload = Partial<CreateStudentPayload>;

interface StudentResponse {
  message?: string;
  student: StudentRecord;
}

export interface ApiErrorInfo {
  status?: number;
  message: string;
  fieldErrors: Record<string, string>;
}

/** Turns any thrown error into something the UI can show. */
export function parseApiError(error: unknown): ApiErrorInfo {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { message?: string; errors?: Record<string, string> }
      | undefined;

    if (!error.response) {
      return {
        message: "Cannot reach the server. Check that the backend is running.",
        fieldErrors: {},
      };
    }
    if (status === 403) {
      return {
        status,
        message: "You do not have permission to perform this action.",
        fieldErrors: {},
      };
    }
    if (status === 401) {
      return {
        status,
        message:
          data?.message || "Your session has expired. Please log in again.",
        fieldErrors: {},
      };
    }
    if (status === 409) {
      return {
        status,
        message:
          data?.message || "That email or registration number already exists.",
        fieldErrors: {},
      };
    }
    return {
      status,
      message: data?.message || "Something went wrong. Please try again.",
      fieldErrors: data?.errors ?? {},
    };
  }
  return {
    message: "Something went wrong. Please try again.",
    fieldErrors: {},
  };
}

export const studentApi = {
  /** GET /students/me - resolves to null when the student has no profile yet (404). */
  getMyProfile: async (): Promise<StudentRecord | null> => {
    try {
      const response = await api.get<StudentResponse>("/students/me");
      return response.data.student;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  /** POST /students - first-time profile creation. */
  createProfile: async (
    payload: CreateStudentPayload,
  ): Promise<StudentRecord> => {
    const response = await api.post<StudentResponse>("/students", payload);
    return response.data.student;
  },

  /** PATCH /students/:id - partial update of an existing profile. */
  updateProfile: async (
    studentId: string,
    payload: UpdateStudentPayload,
  ): Promise<StudentRecord> => {
    const response = await api.patch<StudentResponse>(
      `/students/${studentId}`,
      payload,
    );
    return response.data.student;
  },
};
