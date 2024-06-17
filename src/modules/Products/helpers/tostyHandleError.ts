import { toast } from 'react-toastify';
export const tostyHandleError = (error: any) => {
  switch (error.message) {
    case 'Conflict':
      toast.error('The product already exists');
      break;
    case 'Bad Request':
      toast.error('The product does not exist');
      break;
    case 'Unauthorized':
      toast.error('Unauthorized access');
      break;
    case 'Forbidden':
      toast.error('Forbidden access');
      break;
    case 'Not Found':
      toast.error('Resource not found');
      break;
    case 'Server Error':
      toast.error('Something went wrong while performing this action');
      break;
    default:
      toast.error('An unexpected error occurred');
  }
};
