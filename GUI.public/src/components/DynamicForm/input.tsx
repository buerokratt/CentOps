import React, { FC, ChangeEvent } from 'react';
import { Field } from './types';

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
        <input
          type={field.type}
          id={field.id}
          name={field.id}
          value={value || ''}
          onChange={handleInputChange}
        />
      );
    case 'checkbox':
      return (
        <input
          type="checkbox"
          id={field.id}
          name={field.id}
          checked={value === 'on'}
          onChange={handleInputChange}
        />
      );
    case 'select':
      return (
        <select
          id={field.id}
          name={field.id}
          value={value || ''}
          onChange={handleInputChange}
        >
          {field.options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
}
