import axios from 'axios';
import { ERROR_MESSAGES } from '../shared/constants/errors';

export const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    let message = error.response?.data?.title || ERROR_MESSAGES.DEFAULT;

    switch (status) {
      case 400:
        console.log('Validation error:', error.response?.data);
        if (error.response?.data?.errors) {
          const validationErrors = error.response.data.errors;
          const errorMessages = Object.keys(validationErrors)
            .map(key => validationErrors[key].join(' '))
            .join(' ');
          message = ` ${errorMessages}`;
        } else {
          message = ERROR_MESSAGES.VALIDATION;
        }
        break;
      case 401:
        console.log('Unauthorized access:', error.response?.data);
        message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 403:
        console.log('Forbidden access:', error.response?.data);
        message = ERROR_MESSAGES.FORBIDDEN;
        break;
      case 404: {
        console.log('Not found:', error.response?.data);
        const resource = error.response?.data?.resource || 'Resource';
        message = `${resource} not found.`;
        break;
      }
      case 500:
        console.log('Server error:', error.response?.data);
        message = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        console.log('Error:', message);
    }

    throw new Error(message);
  } else {
    const errorMessage =
      (error as Error).message || 'An unexpected error occurred';
    console.log(`errorMessage:`, errorMessage);

    throw new Error(errorMessage);
  }
};
