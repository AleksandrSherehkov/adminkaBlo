import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { AuthState } from '../shared/definitions/auth';
import { ProductsState } from '../shared/definitions/products';

export const pending = (state: AuthState | ProductsState) => {
  state.isLoading = true;
  state.error = null;
};

export const rejected = (
  state: AuthState | ProductsState,
  action: PayloadAction<SerializedError | undefined>,
) => {
  state.isLoading = false;
  state.error = action.payload ?? null;
};
