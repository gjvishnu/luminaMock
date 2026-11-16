import { createContext } from "react";
import type { AuthUser } from "../redux/authSlice";
import type { UserRole } from "../redux/roleSlice";

export type { UserRole } from "../redux/roleSlice";

export type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);


