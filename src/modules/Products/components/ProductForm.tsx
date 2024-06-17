import { FC, MutableRefObject } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Checkbox, Button } from '@nextui-org/react';
import { useAppDispatch } from '../../../redux/hook';
import { toast } from 'react-toastify';

import { fetchAddProductsThunk } from '../../../redux/products/productsOperations';
import { tostyHandleError } from '../helpers/tostyHandleError';
import { validationSchema } from './productSchema';
import { IndeterminateCheckbox } from '../../../shared/components/IndeterminateCheckbox';
import { GetProductsResponse } from '../../../shared/definitions/products';
import { CustomField } from '../../../shared/components/CustomField';

interface ProductFormProps {
  initialProduct?: GetProductsResponse | null;
  formikRef?: MutableRefObject<any>;
  mode: 'add' | 'edit';
  onClose: (reloadList: boolean) => void;
}

export const ProductForm: FC<ProductFormProps> = ({
  initialProduct,
  formikRef,
  mode,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const initialValues = initialProduct || {
    name: '',
    isSubscription: false,
    oracleQuestions: 0,
    compatibilityTests: 0,
    natalCharts: 0,
    providerProductId: '',
    showFullTexts: null,
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await dispatch(fetchAddProductsThunk(values))
            .unwrap()
            .then(() => {
              toast.success('Saving product successfully');
              resetForm();
              onClose(true);
            })
            .catch(tostyHandleError);
        } catch (error) {
          tostyHandleError(error);
        }
      }}
    >
      {({ values, isSubmitting, isValid, dirty }) => (
        <Form>
          <div className="flex flex-col gap-6 p-4">
            <CustomField name="name" placeholder="Name" type="text" />
            <CustomField
              name="providerProductId"
              placeholder="Provider Product ID"
              type="text"
            />
            <CustomField
              name="natalCharts"
              placeholder="Natal Charts"
              type="number"
            />
            <CustomField
              name="compatibilityTests"
              placeholder="Compatibility Tests"
              type="number"
            />
            <CustomField
              name="oracleQuestions"
              placeholder="Oracle Questions"
              type="number"
            />

            <label
              htmlFor="isSubscription"
              className="flex cursor-text items-center space-x-2 rounded-[6px]"
            >
              <Checkbox
                id="isSubscription"
                radius="sm"
                isSelected={values.isSubscription}
                onValueChange={() =>
                  formikRef?.current?.setFieldValue(
                    'isSubscription',
                    !values.isSubscription,
                  )
                }
                aria-label="Is Subscription"
              >
                <span className="text-sm lg:text-base">Is Subscription</span>
              </Checkbox>
            </label>

            <label className="relative flex cursor-text items-center rounded-[6px]">
              <Field
                name="showFullTexts"
                component={IndeterminateCheckbox}
                label="Show Full Texts"
              />
              <span className="cursor-pointer text-sm lg:text-base">
                Show Full Texts
              </span>
              <ErrorMessage
                name="showFullTexts"
                component="div"
                className="absolute -bottom-5 mt-1 text-sm text-red-600"
              />
            </label>
          </div>
          <div className="flex flex-1 justify-between gap-2 border-t-2 px-3 py-4">
            <Button
              fullWidth
              type="button"
              className="rounded-[6px] bg-gray-500 text-white"
              color="default"
              onPress={() => onClose(false)}
            >
              CANCEL
            </Button>
            <Button
              fullWidth
              type="submit"
              className={`rounded-[6px] ${
                !isValid || !dirty ? 'cursor-not-allowed opacity-50' : ''
              }`}
              color="primary"
              isDisabled={!isValid || !dirty || isSubmitting}
            >
              {mode === 'add' ? 'SAVE' : 'UPDATE'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
