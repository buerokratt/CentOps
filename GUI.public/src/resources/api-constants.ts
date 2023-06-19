const baseUrl = process.env.REACT_APP_API_URL;

export const getApplicationStatus = (uuid: string): string =>
  `${baseUrl}/participants/application?uniqueIdentifier=${uuid}`;
export const sendApplication = (): string =>
  `${baseUrl}/participants/application`;
export const validateInvitation = (): string =>
  `${baseUrl}/validate-invitation-id`;
export const getDynamicFormConfig = (formId: string): string =>
  `${baseUrl}/get-form?form_id=${formId}`;
