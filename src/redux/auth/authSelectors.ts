import { RootState } from '../store';

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
