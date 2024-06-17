import * as yup from 'yup';

import { EMAIL_REGEX } from '../../../shared/constants/regex';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(EMAIL_REGEX, 'Please enter a valid E-mail address')
    .required('The E-mail field is required'),

  password: yup
    .string()
    .required('The Password field is required')
    .min(1, 'Password must contain at least 6 characters')
    .max(30, 'maximum 30 characters possible'),
});
