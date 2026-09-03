import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext, type UserRole } from "./roleContext";

export function RoleProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [role, setRoleState] = useState<UserRole>("officer");

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    navigate("/dashboard");
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
