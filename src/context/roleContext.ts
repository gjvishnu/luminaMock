import { createContext } from "react";

export type UserRole = "student" | "officer" | "admin";

export type UserData = {
  id?: number;
  email: string;
  role: string;
  regno?: string | null;
} | null;

export type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: UserData;
  setUser: (user: UserData) => void;
  logout: () => void;
};

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);

