import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'placementOfficer';
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setRole(state, action: PayloadAction<'student' | 'placementOfficer'>) {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;