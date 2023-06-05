const publicAppUrl = process.env.REACT_APP_PUBLIC_URL;

export const ROUTES = {
  APPLICATION_ROUTE: `${publicAppUrl}/centops/application`,
  INVITATION_ROUTE: '/centops/invitation',
  OVERVIEW_ROUTE: '/centops/overview',
  REQUESTS_ROUTE: '/centops/requests',
  REQUESTS_EDIT_ROUTE: '/centops/requests/edit/:id',
};
