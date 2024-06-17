/**
  |============================
  | auth definitions
  |============================
*/

import { SerializedError } from '@reduxjs/toolkit';

export interface User {
  email: string;
  password: string;
}

export class CurrentUser {
  name: string = '';
  email: string = '';
  accessRules: string[] = [];
}

export class SignInData {
  accessToken: string = '';
  refreshToken: string = '';
  user: CurrentUser = new CurrentUser();
}

export interface AuthState {
  user: SignInData;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: SerializedError | null;
  isRefreshing: boolean;
}

export interface SignOutData {
  message: string;
}

export interface SignOutData {
  message: string;
}
