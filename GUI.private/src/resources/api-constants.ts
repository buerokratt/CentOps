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

export const getInstitutions = (): string => `admin/institutions`;
export const deleteInstitute = (id: number): string =>
  `${baseUrl}/admin/delete-institute?id=${id}`;
export const addInstitute = (): string =>
  `${baseUrl}/admin/add-institute`;
export const editInstitute = (): string =>
  `${baseUrl}/admin/update-institute`;
export const toggleInstituteActiveStatus = (id: number): string =>
  `${baseUrl}/admin/toggle-institute-active-status?id=${id}`;
