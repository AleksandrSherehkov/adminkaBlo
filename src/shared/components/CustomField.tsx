import { ErrorMessage, useField } from 'formik';
import { FC } from 'react';

interface CustomFieldProps {
  name: string;
  type: string;
  placeholder: string;
}

export const CustomField: FC<CustomFieldProps> = ({
  name,
  placeholder,
  type,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="relative flex flex-col">
      <input
        {...field}
        type={type}
        id={name}
        className={`peer border-b ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'} p-2 placeholder-transparent focus:border-blue-500 focus:outline-none`}
        placeholder={placeholder}
      />
      <label
        htmlFor={name}
        className="absolute -top-2.5 left-2 cursor-text text-sm text-gray-600 transition-all duration-200 ease-in-out peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {placeholder}
      </label>
      <ErrorMessage
        name={name}
        component="div"
        className="absolute -bottom-5 right-0 mt-1 text-sm text-red-600"
      />
    </div>
  );
};
