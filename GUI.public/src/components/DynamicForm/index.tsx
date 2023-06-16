import React, { FC, useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { getDynamicFormConfig } from '../../resources/api-constants';
import Button from '../Button';
import { ValidationError, ValidationRule, validateForm } from './validation';
import { DynamicInput } from './input';
import { DynamicFormConfig } from './types';
import { useTranslation } from 'react-i18next';
import Track from '../Track';
import Label from '../Label';
import { useToast } from '../../hooks/useToast';

interface DynamicFormProps {
  formId: string;
  onSubmit?: (form: DynamicFormResult, submitUrl?: string) => void;
  hideTitle?: boolean;
  skipValidation?: boolean;
  hideSubmitButton?: boolean;
  submitButtonTitle?: string;
}

interface DynamicFormResult {
  formId: string;
  values: { [key: string]: string };
}

const DynamicForm: FC<DynamicFormProps> = ({
  formId,
  onSubmit,
  hideTitle = false,
  skipValidation = false,
  hideSubmitButton = false,
  submitButtonTitle,
}: DynamicFormProps) => {
  const [formConfig, setFormConfig] = useState<DynamicFormConfig | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [validator, setValidator] = useState<ValidationRule>({});
  const [errors, setErrors] = useState<ValidationError>({});
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    fetchFormConfig();
  }, [formId]);

  const fetchFormConfig = async () => {
    try {
      setError(false);
      const res = await axios.get(getDynamicFormConfig(formId));
      setFormConfig(res.data);

      if (!skipValidation) {
        const validator = await axios.get(res.data.vaildatorSource).catch(() => null);
        if (validator) {
          setValidator(validator.data);
        }
      }
    } catch (e) {
      setError(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      value = formValues[name] === 'on' ? 'off' : 'on';
    }
    setFormValues((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: [], });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!skipValidation) {
      const errors = validateForm(validator, formValues, formConfig?.fields);
      if (Object.keys(errors).length > 0) {
        setErrors(errors)
        return;
      }
    }

    const submitedForm = { formId, values: formValues };

    if (onSubmit) {
      onSubmit(submitedForm, formConfig?.submitUrl);
    }
    else if (formConfig && formConfig.submitUrl) {
      axios.post(formConfig.submitUrl, submitedForm)
        .then(() => {
          toast.open({
            type: 'success',
            title: t('forms.toast_title'),
            message: t('forms.submit_success'),
          });
        })
        .catch((err) => {
          toast.open({
            type: 'error',
            title: t('forms.toast_title'),
            message: t('forms.submit_failed'),
          });
        })
    }
  }

  if (error) {
    return (
      <div>
        <span>{t('forms.failed')}</span>
        <Button appearance='primary' onClick={fetchFormConfig}>{t('forms.retry')}</Button>
      </div>
    )
  }

  if (!formConfig) {
    return (
      <div>{t('forms.loading')}</div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Track direction='vertical' align='stretch' justify='center' gap={16}>
        {!hideTitle && <h5>{t(formConfig.title)}</h5>}
        <Track direction='vertical' align='stretch' gap={8}>
          {
            formConfig.fields.map((field: any) => (
              <Track key={field.id} direction='vertical' align='right' gap={8}>
                <DynamicInput
                  field={field}
                  value={formValues[field.id]}
                  handleInputChange={handleInputChange}
                />
                <Track direction='vertical' align='left' gap={8}>
                  {errors[field.id]?.map((error) => <Label type='error' key={error}>{t(error)}</Label>)}
                </Track>
              </Track>
            ))
          }
        </Track>
        {
          !hideSubmitButton &&
          <Track direction='vertical' align='center' gap={12}>
            <Button
              type='submit'
              disabled={!onSubmit && !formConfig?.submitUrl}
            >
              {submitButtonTitle || t('forms.submit')}
            </Button>
          </Track>
        }
      </Track>
    </form>
  )
}

export default DynamicForm;
