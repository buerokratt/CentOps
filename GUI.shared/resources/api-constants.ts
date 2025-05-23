const baseUrl = process.env.REACT_APP_API_URL;

export const getDynamicFormConfig = (formId: string): string =>
  `${baseUrl}/get-form?form_id=${formId}`;