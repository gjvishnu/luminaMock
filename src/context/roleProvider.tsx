import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { RoleContext, type UserRole, type UserData } from "./roleContext";

export function RoleProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUserState] = useState<UserData>(() => {
    try {
      const stored = localStorage.getItem("lumina_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    try {
      const storedUser = localStorage.getItem("lumina_user");
      if (storedUser) {
        const parsed: UserData = JSON.parse(storedUser);
        if (parsed?.role === "ADMIN") return "admin";
        if (parsed?.role === "STUDENT") return "student";
        if (parsed?.role === "PLACEMENT_OFFICER" || parsed?.role === "RECRUITER") return "officer";
      }
      const storedRole = localStorage.getItem("lumina_role") as UserRole;
      return storedRole || "officer";
    } catch {
      return "officer";
    }
  });

  const setUser = (newUser: UserData) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("lumina_user", JSON.stringify(newUser));
      let mappedRole: UserRole = "officer";
      if (newUser.role === "ADMIN") mappedRole = "admin";
      else if (newUser.role === "STUDENT") mappedRole = "student";
      else if (newUser.role === "PLACEMENT_OFFICER" || newUser.role === "RECRUITER") mappedRole = "officer";
      setRoleState(mappedRole);
      localStorage.setItem("lumina_role", mappedRole);
    } else {
      localStorage.removeItem("lumina_user");
      localStorage.removeItem("lumina_role");
    }
  };

  const setRole = (nextRole: UserRole) => {
    setRoleState(nextRole);
    localStorage.setItem("lumina_role", nextRole);
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem("lumina_user");
    localStorage.removeItem("lumina_role");
    navigate("/login");
  };

  return (
    <RoleContext.Provider value={{ role, setRole, user, setUser, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

