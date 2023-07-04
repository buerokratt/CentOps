const baseUrl = process.env.REACT_APP_API_URL;

export const dummyApi = (): string => `${baseUrl}/dummy`;
export const getApplicationStatus = (uuid: string): string =>
  `${baseUrl}/participants/application?uniqueIdentifier=${uuid}`;
export const sendApplication = (): string =>
  `${baseUrl}/participants/application`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
export const validateInvitation = (): string =>
  `${baseUrl}/validate-invitation-id`;
export const getDynamicFormConfig = (formId: string): string =>
  `${baseUrl}/get-form?form_id=${formId}`;

export const manifestHistoryDetails = (): string =>
  `${baseUrl}/manifest/history-details`;
export const manifestUpdateDetails = (): string =>
  `${baseUrl}/manifest/update-details`;
export const manifestDetailsById = (): string =>
  `${baseUrl}/manifest/manifest-details`;
