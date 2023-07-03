import { Field, KeyValueMap, KeyValuesMap } from './types';

export interface ValidationRule {
  [key: string]: [
    {
      regex: string;
      errorMessage?: string;
    }
  ]
}

export const validateForm = (
  validator: ValidationRule,
  formValues: KeyValueMap,
  formFields?: Field[],
  defaultErrorMessage = 'Invalid value',
): KeyValuesMap => {
  if (!validator || !formFields?.length) {
    return {};
  }

  const errors: KeyValuesMap = {};

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
