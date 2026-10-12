import { createContext } from "react";

export type UserRole = "student" | "placementOfficer" | "admin";

export type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
  /** Kept for component compatibility; always null now that login is removed. */
  user: null;
  /** No-op kept for component compatibility. */
  setUser: (user: null) => void;
  /** No-op kept for component compatibility. */
  logout: () => void;
};

export const RoleContext = createContext<RoleContextValue | undefined>(undefined);


