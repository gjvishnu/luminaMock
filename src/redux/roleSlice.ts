import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "student" | "placementOfficer" | "admin";

type RoleState = {
  activeRole: UserRole;
};

const initialState: RoleState = {
  activeRole: "placementOfficer",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.activeRole = action.payload;
    },
    resetRole: (state) => {
      state.activeRole = initialState.activeRole;
    },
  },
});

export const { setRole, resetRole } = roleSlice.actions;
export const roleReducer = roleSlice.reducer;
export const selectActiveRole = (state: { role: RoleState }) => state.role.activeRole;

export function mapBackendRole(role: string | null | undefined): UserRole | null {
  switch (role?.toUpperCase()) {
    case "STUDENT":
      return "student";
    case "PLACEMENT_OFFICER":
      return "placementOfficer";
    case "ADMIN":
      return "admin";
    default:
      return null;
  }
}
