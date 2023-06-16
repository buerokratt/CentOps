import { Field } from './types';

export interface ValidationRule {
  [key: string]: [
    {
      regex: string;
      errorMessage?: string;
    }
  ]
}

export interface ValidationError {
  [key: string]: string[];
}

export const validateForm = (
  validator: ValidationRule,
  formValues: { [key: string]: string },
  formFields?: Field[],
  defaultErrorMessage = 'Invalid value',
): ValidationError => {
  if (!validator || !formFields?.length) {
    return {};
  }

  const errors: ValidationError = {};

  for (const key in validator) {
    if (!validator.hasOwnProperty(key)) {
      continue;
    }
    const targetField = formFields?.find((x) => (x.vaildationType || x.id) === key);
    if (!targetField) {
      continue;
    }

    for (const rule of validator[key]) {
      const regex = new RegExp(rule.regex);
      if (regex.test(formValues[targetField.id])) {
        const errorMessage = rule.errorMessage || defaultErrorMessage;
        errors[targetField.id] = [...(errors[targetField.id] || []), errorMessage];
      }
    }
  }

  return errors;
}
