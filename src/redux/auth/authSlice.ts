import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  CheckAliveThunk,
  LoginThunk,
  LogoutThunk,
  LoadLoginDataThunk,
} from './authOperations';
import { pending, rejected } from '../stateFunctions';
import { AuthState } from '../../shared/definitions/auth';
import {
  clearAuthToken,
  clearAuthStorage,
  readAuthStorage,
  setAuthToken,
} from '../../services/api';

const initialState: AuthState = {
  user: {
    accessToken: '',
    refreshToken: '',
    user: {
      name: '',
      email: '',
      accessRules: [],
    },
  },
  isLoggedIn: false,
  isLoading: false,
  error: null,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: () => {
      const storageData = readAuthStorage();
      if (!storageData.accessToken || !storageData.refreshToken) {
        return initialState;
      }

      setAuthToken(storageData.accessToken);

      let resState: AuthState = {
        user: {
          accessToken: storageData.accessToken,
          refreshToken: storageData.refreshToken,
          user: initialState.user.user,
        },
        isLoggedIn: initialState.isLoggedIn,
        isLoading: initialState.isLoading,
        error: initialState.error,
        isRefreshing: initialState.isRefreshing,
      };

      return resState;
    },
    logout: () => {
      clearAuthToken();
      clearAuthStorage();
      return initialState;
    },
    startLoading: state => {
      state.isRefreshing = true;
    },
    stopLoading: state => {
      state.isRefreshing = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(CheckAliveThunk.fulfilled, state => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(CheckAliveThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(CheckAliveThunk.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(LogoutThunk.fulfilled, () => {
        logout();

        return initialState;
      })
      .addCase(LoadLoginDataThunk.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.user.user = action.payload;
      })
      .addCase(LoadLoginDataThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(LoadLoginDataThunk.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(isAnyOf(LoginThunk.pending, LogoutThunk.pending), pending)
      .addMatcher(isAnyOf(LoginThunk.rejected, LogoutThunk.rejected), rejected);
  },
});
export const { logout, init, stopLoading, startLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
