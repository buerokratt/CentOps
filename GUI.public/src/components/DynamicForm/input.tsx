import React, { FC, ChangeEvent } from 'react';
import { Field } from './types';
import FieldInput from '../FormElements/FormInput';
import { FormSelect, SwitchBox } from '../FormElements';

interface DynamicInputProps {
  field: Field;
  value: any;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DynamicInput: FC<DynamicInputProps> = ({
  field,
  value,
  handleInputChange,
}: DynamicInputProps) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
    case 'date':
    case 'time':
      return (
        <FieldInput
          label={field.label ?? ''}
          hideLabel={!field.label}
          type={field.type}
          id={field.id}
          name={field.id}
          value={value || ''}
          onChange={handleInputChange}
        />
      );
    case 'checkbox':
      return (
        <SwitchBox
          id={field.id}
          name={field.id}
          label={field.label ?? ''}
          hideLabel={!field.label}
          checked={value === 'on'}
          onChange={(e) => handleInputChange(e)}
        />
      );
    case 'select':
      return (
        <FormSelect
          id={field.id}
          name={field.id}
          value={value || ''}
          onChange={handleInputChange}
          label={field.label ?? ''}
          options={field.options ?? []}
        />
      );

    default:
      return null;
  }
}
