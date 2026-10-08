import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  role: 'student' | 'placementOfficer' | 'admin' | 'recruiter';
  regno: string | null;
}

interface AuthState {
  user: User | null;
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
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setRole(state, action: PayloadAction<'student' | 'placementOfficer' | 'admin' | 'recruiter'>) {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;