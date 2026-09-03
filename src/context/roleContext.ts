import { createContext } from "react";

export type UserRole = "student" | "officer";

export type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
};

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);
