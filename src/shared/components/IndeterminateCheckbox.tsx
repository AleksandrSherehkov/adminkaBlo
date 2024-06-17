import React from 'react';
import { FieldProps } from 'formik';
import { Checkbox } from '@nextui-org/react';

interface IndeterminateCheckboxProps extends FieldProps {
  label: string;
}

export const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = ({
  field,
  form,
  label,
}) => {
  const handleChange = () => {
    const currentValue = form.values[field.name];
    let newValue =
      currentValue === true ? false : currentValue === false ? null : true;
    form.setFieldValue(field.name, newValue);
  };

  return (
    <Checkbox
      radius="sm"
      isSelected={field.value === true}
      isIndeterminate={field.value === null}
      onValueChange={handleChange}
      aria-label={label}
    />
  );
};
