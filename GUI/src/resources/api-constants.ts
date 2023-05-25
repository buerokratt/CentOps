const baseUrl = process.env.REACT_APP_API_URL;
const basePublicUrl = process.env.REACT_APP_PUBLIC_API_URL;

export const dummyApi = (): string => `${baseUrl}/dummy`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
export const createInvitation = (): string => `${baseUrl}/create-invitation`;
export const validateInvitation = (): string =>
  `${basePublicUrl}/validate-invitation-id`;
