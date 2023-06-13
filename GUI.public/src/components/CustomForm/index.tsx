import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { getCustomFormConfig } from '../../resources/api-constants';

interface Field {
  id: string;
  label: string;
  type: 'text' | 'checkbox' | 'select' | 'email' | 'number' | 'date';
  options?: { value: string; label: string }[];
}

interface FormData {
  fields: Field[];
}

interface CustomFormProps {
  formId: string;
}

const CustomForm: FC<CustomFormProps> = ({ formId }: CustomFormProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setError(false);
      const res = await axios.get(getCustomFormConfig(formId));
      setFormData(res.data);
    } catch {
      setError(true)
    }
  }

  if (!formData) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>
        <span>Failed to fetch the required form</span>
        <button onClick={() => fetchFormData()}>retry</button>
      </div>
    )
  }

  return (
    <div>
      {formData.fields.map((field: any) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input type={field.type} id={field.id} name={field.id} />
              </div>
            );
          case 'checkbox':
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input type="checkbox" id={field.id} name={field.id} />
              </div>
            );
          case 'select':
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <select id={field.id} name={field.id}>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            );
          case 'date':
            return (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input type="date" id={field.id} name={field.id} />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  )
}

export default CustomForm;
