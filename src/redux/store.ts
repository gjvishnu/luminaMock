import { configureStore } from '@reduxjs/toolkit';

// Login API removed: no auth state, no backend slices. The store is kept
// (Provider wiring in main.tsx) so future slices have a home.
export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;