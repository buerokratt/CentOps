import React, { FC, useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { getDynamicFormConfig } from '../../resources/api-constants';
import Button from '../Button';
import { ValidationRule, validateForm } from './validation';
import { DynamicInput } from './input';
import { DynamicFormConfig, KeyValueMap, KeyValuesMap } from './types';
import { useTranslation } from 'react-i18next';
import Track from '../Track';
import Label from '../Label';
import { useToast } from '../../hooks/useToast';

interface DynamicFormProps {
  formId: string;
  onSubmit?: (form: DynamicFormResult, submitUrl?: string) => void;
  onChange?: (values: KeyValueMap, isValid: boolean) => void;
  hideTitle?: boolean;
  skipValidation?: boolean;
  hideSubmitButton?: boolean;
  submitButtonTitle?: string;
}

interface DynamicFormResult {
  formId: string;
  values: KeyValueMap;
}

const DynamicForm: FC<DynamicFormProps> = ({
  formId,
  onSubmit,
  onChange,
  hideTitle = false,
  skipValidation = false,
  hideSubmitButton = false,
  submitButtonTitle,
}: DynamicFormProps) => {
  const [formConfig, setFormConfig] = useState<DynamicFormConfig | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<KeyValueMap>({});
  const [validator, setValidator] = useState<ValidationRule>({});
  const [errors, setErrors] = useState<KeyValuesMap>({});
  const { t } = useTranslation();
  const toast = useToast();

  useEffect(() => {
    fetchFormConfig();
  }, [formId]);

  useEffect(() => {
    const validation = validate();
    setErrors(validation.errors || {});
    onChange?.(formValues, validation.valid);
  }, [formValues]);

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
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation.errors || {});
    if (!validation.valid) {
      toast.open({
        type: 'error',
        title: t('forms.toast_title'),
        message: t('forms.invalid_form'),
      });
      return;
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

  const validate = () => {
    if (!skipValidation) {
      const errors = validateForm(validator, formValues, formConfig?.fields);
      if (Object.keys(errors).length > 0) {
        return {
          valid: false,
          errors
        };
      }
    }
    return { valid: true, };
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
