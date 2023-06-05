const baseUrl = process.env.REACT_APP_API_URL;

export const dummyApi = (): string => `${baseUrl}/dummy`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
export const createInvitation = (): string => `${baseUrl}/invitation`;
export const getInstitutionsRequests = (): string =>
  `${baseUrl}/institutions-requests`;
