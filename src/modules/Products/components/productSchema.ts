import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Name must be at most 100 characters')
    .required('Name is required'),
  isSubscription: Yup.boolean(),
  oracleQuestions: Yup.number()
    .typeError('Value should be zero or higher')
    .required('Oracle Questions amount is required')
    .integer('Must be a number'),

  compatibilityTests: Yup.number()
    .typeError('Value should be zero or higher')
    .required('Compatibility Tests amount is required')
    .integer('Must be a number'),

  natalCharts: Yup.number()
    .typeError('Value should be zero or higher')
    .required('Natal Charts amount is required')
    .integer('Must be a number'),

  providerProductId: Yup.string()
    .max(255, 'Provider Product ID must be at most 255 characters')
    .required('Provider Product ID is required'),
  showFullTexts: Yup.mixed()
    .nullable()
    .oneOf([true, false, null], 'Invalid value'),
});
