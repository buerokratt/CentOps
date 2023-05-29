const baseUrl = process.env.REACT_APP_API_URL;

export const dummyApi = (): string => `${baseUrl}/dummy`;
export const sendApplication = (): string => `${baseUrl}/create-institution`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
export const validateInvitation = (): string =>
  `${baseUrl}/validate-invitation-id`;
