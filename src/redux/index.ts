import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store, type RootState, type AppDispatch } from './store';

export { store, type RootState, type AppDispatch };
export { useLoginMutation, useLogoutMutation } from './api';
export { clearCredentials, selectIsAuthenticated, selectUser, setCredentials } from './authSlice';
export { mapBackendRole, resetRole, selectActiveRole, setRole } from './roleSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
