import 'styles/main.scss';
import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout, MainNavigation } from 'components';
import { ROUTES } from 'resources/routes-constants';
import { ClientListPage } from 'pages/client/ClientListPage';
import { ClientDetailsPage } from 'pages/client/ClientDetailsPage';
import { ClientSecretListPage } from 'pages/client/ClientSecretListPage';
import { ClientSecretDetailsPage } from 'pages/client/ClientSecretDetailsPage';
import { ClientSecretDiffPage } from 'pages/client/ClientSecretDiffPage';
import { ClientManifestListPage } from 'pages/client/ClientManifestListPage';
import { UserListPage } from 'pages/user/UserListPage';
import { UserDetailsPage } from 'pages/user/UserDetailsPage';
import { ClusterListPage } from 'pages/cluster/ClusterListPage';
import { ClusterDetailsPage } from 'pages/cluster/ClusterDetailsPage';
import { DocumentationPage } from 'pages/documentation/DocumentationPage';
import { ClientManifestDetailsPage } from 'pages/client/ClientManifestDetailsPage';
import { ClientCertificateList } from 'pages/client/ClientCertificateList';
import { ClientCertificateCreatePage } from 'pages/client/ClientCertificateCreatePage';
import { ClientDeploymentList } from 'pages/client/ClientDeploymentList';
import { ClientDeploymentCreatePage } from 'pages/client/ClientDeploymentCreatePage';
import { UserActivityPage } from 'pages/audit/UserActivityPage';
import { SecretAccessPage } from 'pages/audit/SecretAccessPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import OverviewPage from 'pages/OverviewPage';

export const RootComponent: FC = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Navigate to={ROUTES.CLIENT_LIST_ROUTE} />} />
      <Route element={<Layout navigation={<MainNavigation />} />}>
        <Route path={ROUTES.CLIENT_LIST_ROUTE} Component={ClientListPage} />
        <Route
          path={ROUTES.CLIENT_DETAILS_ROUTE}
          Component={ClientDetailsPage}
        />
        <Route
          path={ROUTES.CLIENT_SECRETS_ROUTE}
          Component={ClientSecretListPage}
        />
        <Route
          path={ROUTES.CLIENT_SECRETS_DETAILS_ROUTE}
          Component={ClientSecretDetailsPage}
        />
        <Route
          path={ROUTES.CLIENT_SECRETS_DIFF_ROUTE}
          Component={ClientSecretDiffPage}
        />
        <Route
          path={ROUTES.CLIENT_CERTIFICATES_ROUTE}
          Component={ClientCertificateList}
        />
        <Route
          path={ROUTES.CLIENT_CERTIFICATES_CREATE_ROUTE}
          Component={ClientCertificateCreatePage}
        />
        <Route
          path={ROUTES.CLIENT_DEPLOYMENTS_ROUTE}
          Component={ClientDeploymentList}
        />
        <Route
          path={ROUTES.CLIENT_DEPLOYMENTS_CREATE_ROUTE}
          Component={ClientDeploymentCreatePage}
        />
        <Route
          path={ROUTES.CLIENT_MANIFESTS_ROUTE}
          Component={ClientManifestListPage}
        />
        <Route
          path={ROUTES.CLIENT_MANIFESTS_DETAILS_ROUTE}
          Component={ClientManifestDetailsPage}
        />
        <Route path={ROUTES.USER_LIST_ROUTE} Component={UserListPage} />
        <Route path={ROUTES.USER_DETAILS_ROUTE} Component={UserDetailsPage} />
        <Route path={ROUTES.CLUSTER_LIST_ROUTE} Component={ClusterListPage} />
        <Route
          path={ROUTES.CLUSTER_DETAILS_ROUTE}
          Component={ClusterDetailsPage}
        />
        <Route
          path={ROUTES.DOCUMENTATION_ROUTE}
          Component={DocumentationPage}
        />
        <Route
          path={ROUTES.AUDIT_USER_ACTIVITY_ROUTE}
          Component={UserActivityPage}
        />
        <Route
          path={ROUTES.AUDIT_SECRET_ACCESS_ROUTE}
          Component={SecretAccessPage}
        />

        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
