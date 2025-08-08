const publicAppUrl = import.meta.env.REACT_APP_PUBLIC_URL;

export const ROUTES = {
  APPLICATION_ROUTE: `${publicAppUrl}/application`,

  CLIENT_LIST_ROUTE: '/clients',
  CLIENT_DETAILS_ROUTE: '/clients/:clientId',
  CLIENT_SECRETS_ROUTE: '/clients/:clientId/secrets',
  CLIENT_SECRETS_DETAILS_ROUTE: '/clients/:clientId/secrets/:secretId?',
  CLIENT_SECRETS_DIFF_ROUTE: '/clients/:clientId/secrets/:secretId/diff',
  CLIENT_CERTIFICATES_ROUTE: '/clients/:clientId/certificates',
  CLIENT_DEPLOYMENTS_ROUTE: '/clients/:clientId/deployments',
  CLIENT_DEPLOYMENTS_CREATE_ROUTE: '/clients/:clientId/deployments/create',
  CLIENT_MANIFESTS_ROUTE: '/clients/:clientId/manifests',
  CLIENT_MANIFESTS_DETAILS_ROUTE: '/clients/:clientId/manifests/:manifestId?',
  USER_LIST_ROUTE: '/users',
  USER_DETAILS_ROUTE: '/users/:userId',
  CLUSTER_LIST_ROUTE: '/clusters',
  CLUSTER_DETAILS_ROUTE: '/clusters/:clusterId',
  DOCUMENTATION_ROUTE: '/documentation',
  AUDIT_USER_ACTIVITY_ROUTE: '/audit/user-activity',
  AUDIT_SECRET_ACCESS_ROUTE: '/audit/secret-access',
  OVERVIEW_ROUTE: '/overview',
};
