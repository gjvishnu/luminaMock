import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store, type RootState, type AppDispatch } from './store';

export { store, type RootState, type AppDispatch };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;