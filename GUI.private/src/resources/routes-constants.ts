const publicAppUrl = process.env.REACT_APP_PUBLIC_URL;

export const ROUTES = {
  APPLICATION_ROUTE: `${publicAppUrl}/centops/application`,
  INVITATION_ROUTE: '/centops/invitation',
  OVERVIEW_ROUTE: '/centops/overview',
  PARTICIPANTS_ROUTE: '/centops/participants',
  PARTICIPANTS_REQUESTS_ROUTE: '/centops/requests/participants',
  PARTICIPANTS_EDIT_ROUTE: '/centops/participants/edit/:id',
  PARTICIPANTS_REQUESTS_EDIT_ROUTE: '/centops/requests/participants/edit/:id',
  MESSAGES_PAGE_ROUTE: '/centops/messages',
};
