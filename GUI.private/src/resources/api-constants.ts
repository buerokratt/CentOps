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
export const toggleDummyApi = (): string => `${baseUrl}/toggle-dummy`;

export const getInboxMessages = (): string =>
  `${baseUrl}/get-inbox-messages`;
export const getOutboxMessages = (): string =>
  `${baseUrl}/get-outbox-messages`;
export const getParticipants = (): string =>
  `${baseUrl}/admin/participants`;

export const sendMessageApi = (): string =>
  `${baseUrl}/send-message`
