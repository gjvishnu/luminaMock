import { useContext } from "react";
import { RoleContext } from "./roleContext";

export function useUserRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useUserRole must be used inside RoleProvider");
  }

  return context;
}
