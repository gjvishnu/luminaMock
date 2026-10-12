import { useState, type ReactNode } from "react";
import { RoleContext, type UserRole } from "./roleContext";

/**
 * View switcher only — no login, no tokens, no backend.
 * The header's "Switch view" menu flips between the three demo personas
 * (student / placementOfficer / admin) so every role-specific menu,
 * dashboard and page can be exercised directly.
 */
const DEFAULT_ROLE: UserRole = "placementOfficer";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(DEFAULT_ROLE);

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
  };

  return (
    <RoleContext.Provider
      value={{ role, setRole, user: null, setUser: () => {}, logout: () => {} }}
    >
      {children}
    </RoleContext.Provider>
  );
}
