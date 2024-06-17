import { SerializedError, createAsyncThunk } from '@reduxjs/toolkit';

import { DefaultThunkApiConfig } from '../../shared/definitions/common';

import {
  SignInData,
  SignOutData,
  User,
  CurrentUser,
} from '../../shared/definitions/auth';
import { useAppSelector } from '../../redux/hook';
import { selectUser } from './authSelectors';

import {
  checkAlive,
  setAuthToken,
  signIn,
  signOut,
  loadLoginData,
} from '../../services/api';

import { handleAxiosError } from '../helpers/handleAxiosError';

export const LoginThunk = createAsyncThunk<
  SignInData,
  User,
  DefaultThunkApiConfig
>('auth/login', async (credentials: User, { rejectWithValue }) => {
  try {
    const data: SignInData = await signIn(credentials);

    return data;
  } catch (error) {
    const serializedError = handleAxiosError(error);
    return rejectWithValue(serializedError);
  }
});

export const CheckAliveThunk = createAsyncThunk<
  void,
  void,
  DefaultThunkApiConfig
>('auth/currentUser', async (_, { rejectWithValue }) => {
  const currentUser = useAppSelector(selectUser);

  if (!currentUser.accessToken) {
    return rejectWithValue({
      message: 'Undefined token!',
    } as SerializedError);
  } else {
    setAuthToken(currentUser.accessToken);
  }

  try {
    const data = await checkAlive();

    return data;
  } catch (error) {
    const serializedError = handleAxiosError(error);
    return rejectWithValue(serializedError);
  }
});

export const LoadLoginDataThunk = createAsyncThunk<
  CurrentUser,
  void,
  DefaultThunkApiConfig
>('auth/userData', async (_, { rejectWithValue }) => {
  try {
    const data = await loadLoginData();
    return data;
  } catch (error) {
    const serializedError = handleAxiosError(error);
    return rejectWithValue(serializedError);
  }
});

export const LogoutThunk = createAsyncThunk<
  SignOutData,
  void,
  DefaultThunkApiConfig
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const data: SignOutData = await signOut();
    return data;
  } catch (error) {
    const serializedError = handleAxiosError(error);
    return rejectWithValue(serializedError);
  }
});
