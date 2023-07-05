const baseUrl = process.env.REACT_APP_API_URL;

export const createInvitation = (): string =>
  `${baseUrl}/admin/participants/invitation`;
export const updateParticipantDetails = (uuid: string): string =>
  `${baseUrl}/admin/participants?uuid=${uuid}`;
export const updateParticipantStatus = (uuid: string): string =>
  `${baseUrl}/admin/participants/status?uuid=${uuid}`;
export const deleteParticipant = (uuid: string): string =>
  `${baseUrl}/admin/participants?uuid=${uuid}`;

export const manifestHistoryDetails = (): string =>
  `${baseUrl}/manifest/history-details`;
export const manifestUpdateDetails = (): string =>
  `${baseUrl}/manifest/update-details`;
export const manifestDetailsById = (): string =>
  `${baseUrl}/manifest/manifest-details`;

export const getInstitutions = (): string => `admin/institutions`;
export const deleteInstitute = (id: number): string =>
  `${baseUrl}/admin/delete-institute?id=${id}`;
export const addInstitute = (): string =>
  `${baseUrl}/admin/add-institute`;
export const editInstitute = (): string =>
  `${baseUrl}/admin/update-institute`;
export const toggleInstituteActiveStatus = (id: number): string =>
  `${baseUrl}/admin/toggle-institute-active-status?id=${id}`;
export const getInboxMessages = (): string =>
  `${baseUrl}/get-inbox-messages`;
export const getOutboxMessages = (): string =>
  `${baseUrl}/get-outbox-messages`;
export const getParticipants = (): string =>
  `${baseUrl}/admin/participants`;

export const sendMessageApi = (): string =>
  `${baseUrl}/send-message`;
export const sendReplyApi = (): string =>
  `${baseUrl}/send-reply`;
