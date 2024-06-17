import { SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { ERROR_MESSAGES } from '../../shared/constants/errors';

export const handleAxiosError = (error: unknown): SerializedError => {
  let errorMessage = ERROR_MESSAGES.UNKNOWN_ERROR;

  if (axios.isAxiosError(error)) {
    errorMessage =
      error.response?.data?.title ||
      error.message ||
      ERROR_MESSAGES.UNKNOWN_ERROR;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return {
    message: errorMessage,
  };
};
