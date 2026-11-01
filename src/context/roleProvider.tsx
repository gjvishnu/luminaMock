import { useEffect, type ReactNode } from "react";
import { RoleContext, type UserRole } from "./roleContext";
import { clearCredentials, selectUser, setUser as setStoredUser } from "../redux/authSlice";
import { mapBackendRole, selectActiveRole, setRole } from "../redux/roleSlice";
import { useAppDispatch, useAppSelector } from "../redux";

export function RoleProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectActiveRole);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const authenticatedRole = mapBackendRole(user?.role);
    if (authenticatedRole) {
      dispatch(setRole(authenticatedRole));
    }
  }, [dispatch, user?.role]);

  const setActiveRole = (nextRole: UserRole) => dispatch(setRole(nextRole));
  const setUser = (nextUser: typeof user) => {
    if (nextUser) {
      dispatch(setStoredUser(nextUser));
    } else {
      dispatch(clearCredentials());
    }
  };
  const logout = () => dispatch(clearCredentials());

  return (
    <RoleContext.Provider
      value={{ role, setRole: setActiveRole, user, setUser, logout }}
    >
      {children}
    </RoleContext.Provider>
  );
}
