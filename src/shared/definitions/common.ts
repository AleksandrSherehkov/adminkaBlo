/**
  |============================
  | common definitions
  |============================
*/

import { SerializedError } from '@reduxjs/toolkit';

export interface DefaultThunkApiConfig {
  rejectValue: SerializedError;
}
