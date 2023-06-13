import React, { FC, useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { getCustomFormConfig } from '../../resources/api-constants';
import Button from '../Button';

interface Field {
  id: string;
  label: string;
  type: 'text' | 'checkbox' | 'select' | 'email' | 'number' | 'date';
  options?: { value: string; label: string }[];
  vaildationType?: string;
}

interface FormData {
  version: string;
  vaildatorSource: string;
  fields: Field[];
}

interface CustomFormProps {
  formId: string;
  onSubmit: (formData: any) => void;
}

const CustomForm: FC<CustomFormProps> = ({ formId, onSubmit }: CustomFormProps) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchFormData();
  }, [formId]);

  const fetchFormData = async () => {
    try {
      setError(false);
      const res = await axios.get(getCustomFormConfig(formId));
      setFormData(res.data);
    } catch {
      setError(true)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ formId, values: formValues });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = value === 'on' ? 'off' : 'on';
    }
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  if (error) {
    return (
      <div>
        <span>Failed to fetch the required form</span>
        <Button appearance='primary' onClick={() => fetchFormData()}>retry</Button>
      </div>
    )
  }

  if (!formData) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formData.fields.map((field: any) => {
          switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
              return (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formValues[field.id] || ''}
                    onChange={handleInputChange}
                  />
                </div>
              );
            case 'checkbox':
              return (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type="checkbox"
                    id={field.id}
                    name={field.id}
                    checked={formValues[field.id] === 'on'}
                    onChange={handleInputChange}
                  />
                </div>
              );
            case 'date':
              return (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type="date"
                    id={field.id}
                    name={field.id}
                    value={formValues[field.id] || ''}
                    onChange={handleInputChange}
                  />
                </div>
              );
            case 'select':
              return (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}</label>
                  <select
                    id={field.id}
                    name={field.id}
                    value={formValues[field.id] || ''}
                    onChange={handleInputChange}
                  >
                    {field.options?.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            default:
              return null;
          }
        })}
        <Button type='submit'>submit</Button>
      </form>
    </div>
  )
}

export default CustomForm;
