import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import input from '../input.json';
import { User } from '../../../shared/definitions/auth';
import { LoginThunk } from '../../../redux/auth/authOperations';
import { loginSchema } from '../validation/loginSchema';
import { InputForm } from './InputForm';
import { VisibilityPassword } from './VisibilityPassword';
import { selectAuthError } from '../../../redux/auth/authSelectors';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = { email: '', password: '' };

  const dispatch = useAppDispatch();

  const error = useAppSelector(selectAuthError);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (value: User) => {
    const { email, password } = value;

    setIsSubmitting(true);

    try {
      await dispatch(
        LoginThunk({ email: email.trim(), password: password.trim() }),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="relative flex w-full max-w-[410px] flex-col items-center gap-10 md:max-w-80 lg:max-w-[450px]">
          <div className="relative flex w-full flex-col gap-5">
            {input.map(({ type, name, placeholder }) => {
              return (
                <Field
                  key={name}
                  type={showPassword ? 'text' : type}
                  name={name}
                  placeholder={placeholder}
                  component={InputForm}
                />
              );
            })}
            <VisibilityPassword
              toggleShowPassword={toggleShowPassword}
              showPassword={showPassword}
            />
          </div>

          <button
            type="submit"
            className={`${
              !isValid || !dirty || isSubmitting
                ? 'cursor-not-allowed opacity-50 hover:transform-none'
                : ''
            } btn bazi-btn rounded-full w-full py-[13px] text-sm uppercase leading-[18px]`}
            disabled={!isValid || !dirty || isSubmitting}
          >
            Log in
          </button>
          {error && (
            <div className="absolute -bottom-10 text-[15px] text-red-400">
              {error.message}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
