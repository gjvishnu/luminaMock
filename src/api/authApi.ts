import api from "./axiosInstance";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    role: "ADMIN" | "STUDENT" | "PLACEMENT_OFFICER" | "RECRUITER";
    regno: string | null;
  };
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
  regno?: string;
}

export interface UserResponse {
  message: string;
  user: {
    id: number;
    email: string;
    role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
    regno: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetUsersResponse {
  message: string;
  count: number;
  users: Array<{
    id: number;
    email: string;
    role: "STUDENT" | "PLACEMENT_OFFICER" | "ADMIN" | "RECRUITER";
    regno: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface AuthError {
  message: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  },

  createUser: async (userData: CreateUserRequest): Promise<UserResponse> => {
    const response = await api.post<UserResponse>("/create-user", userData);
    return response.data;
  },

  getUsers: async (): Promise<GetUsersResponse> => {
    const response = await api.get<GetUsersResponse>("/users");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lumina_user");
    localStorage.removeItem("lumina_role");
  },
};

export const mapBackendRoleToFrontend = (backendRole: string): "admin" | "student" | "placementOfficer" => {
  switch (backendRole) {
    case "ADMIN":
      return "admin";
    case "STUDENT":
      return "student";
    case "PLACEMENT_OFFICER":
    case "RECRUITER":
      return "placementOfficer";
    default:
      return "placementOfficer";
  }
};