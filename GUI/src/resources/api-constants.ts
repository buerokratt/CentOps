const baseUrl = process.env.REACT_APP_API_URL;

export const dummyApi = (): string => `${baseUrl}/dummy`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
