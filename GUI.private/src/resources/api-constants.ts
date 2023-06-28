const baseUrl = process.env.REACT_APP_API_URL;

export const createInvitation = (): string =>
  `${baseUrl}/admin/participants/invitation`;
export const dummyApi = (): string => `${baseUrl}/dummy`;
export const updateParticipantDetails = (uuid: string): string =>
  `${baseUrl}/admin/participants?uuid=${uuid}`;
export const updateParticipantStatus = (uuid: string): string =>
  `${baseUrl}/admin/participants/status?uuid=${uuid}`;
export const deleteParticipant = (uuid: string): string =>
  `${baseUrl}/admin/participants?uuid=${uuid}`;

  export const manifestHistoryDetails = (): string =>
  `${baseUrl}/manifest/history-details`;
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;
