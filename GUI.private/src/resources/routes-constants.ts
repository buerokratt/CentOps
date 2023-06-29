const publicAppUrl = process.env.REACT_APP_PUBLIC_URL;

export const ROUTES = {
  APPLICATION_ROUTE: `${publicAppUrl}/centops/application`,
  INVITATION_ROUTE: '/centops/invitation',
  OVERVIEW_ROUTE: '/centops/overview',
  PARTICIPANTS_ROUTE: '/centops/participants',
  PARTICIPANTS_REQUESTS_ROUTE: '/centops/requests/participants',
  PARTICIPANTS_EDIT_ROUTE: '/centops/participants/edit/:id',
  PARTICIPANTS_REQUESTS_EDIT_ROUTE: '/centops/requests/participants/edit/:id',
  INSTITUTIONS_ROUTE: '/centops/institutions',
  MESSAGES_PAGE_ROUTE: '/centops/messages',
  MANIFESTS_ROUTE: '/centops/manifests',
  MANIFESTS_OVERVIEW_ROUTE: '/centops/manifests/overview',
  MANIFESTS_NEW_MANIFESTS_ROUTE: '/centops/manifests/new_manifests',
  MANIFESTS_UPDATES_ROUTE: '/centops/manifests/updates',
  MANIFESTS_HISTORY_ROUTE: '/centops/manifests/history',
  MANIFESTS_DETAILS_ROUTE: '/centops/manifests/details/:id',
  MANIFESTS_CREATE_EDIT_ROUTE: '/centops/manifests/create_edit',
};
