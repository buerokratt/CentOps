import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout, MainNavigation } from 'components';
import {
  CreateInvitationPage,
  EditParticipantPage,
  NotFoundPage,
  OverviewPage,
  ParticipantsPage,
} from 'pages';
import { ROUTES } from 'resources/routes-constants';
import 'styles/main.scss';
import InstitutionsPages from 'pages/InstitutionsPage';
import MessagesPage from 'pages/MessagesPage';
import ManifestsOverviewPage from 'pages/manifests/ManifestsOverviewPage';
import NewManifestsPage from 'pages/manifests/NewManifestsPage';
import ManifestsUpdatesPage from 'pages/manifests/ManifestsUpdatesPage';
import ManifestsHistoryPage from 'pages/manifests/ManifestsHistoryPage';
import ManifestsHistoryDetailsPage from 'pages/manifests/ManifestsDetailsPage';
import CreateEditManifestPage from 'pages/manifests/CreateEditManifestPage';
import { ClientListPage } from 'pages/client/ClientListPage';
import { ClientDetailsPage } from 'pages/client/ClientDetailsPage';
import { ClientSecretListPage } from 'pages/client/ClientSecretListPage';
import { ClientSecretDetailsPage } from 'pages/client/ClientSecretDetailsPage';
import { ClientSecretDiffPage } from 'pages/client/ClientSecretDiffPage';
import { UserListPage } from 'pages/user/UserListPage';
import { UserDetailsPage } from 'pages/user/UserDetailsPage';
import { ClusterListPage } from 'pages/cluster/ClusterListPage';
import { ClusterDetailsPage } from 'pages/cluster/ClusterDetailsPage';

const RootComponent: FC = () => {
  return (
    <Routes>
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
          path={ROUTES.CLIENTS_SECRETS_DIFF_ROUTE}
          Component={ClientSecretDiffPage}
        />
        <Route path={ROUTES.USER_LIST_ROUTE} Component={UserListPage} />
        <Route path={ROUTES.USER_DETAILS_ROUTE} Component={UserDetailsPage} />
        <Route path={ROUTES.CLUSTER_LIST_ROUTE} Component={ClusterListPage} />
        <Route
          path={ROUTES.CLUSTER_DETAILS_ROUTE}
          Component={ClusterDetailsPage}
        />

        <Route
          path={ROUTES.INVITATION_ROUTE}
          element={<CreateInvitationPage />}
        />
        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route
          path={ROUTES.PARTICIPANTS_ROUTE}
          element={<ParticipantsPage />}
        />
        <Route
          path={ROUTES.PARTICIPANTS_REQUESTS_ROUTE}
          element={<ParticipantsPage />}
        />
        <Route
          path={ROUTES.PARTICIPANTS_EDIT_ROUTE}
          element={<EditParticipantPage />}
        />
        <Route
          path={ROUTES.PARTICIPANTS_REQUESTS_EDIT_ROUTE}
          element={<EditParticipantPage />}
        />
        <Route path={ROUTES.MESSAGES_PAGE_ROUTE} element={<MessagesPage />} />
        <Route
          path={ROUTES.INSTITUTIONS_ROUTE}
          element={<InstitutionsPages />}
        />
        <Route
          path={ROUTES.MANIFESTS_OVERVIEW_ROUTE}
          element={<ManifestsOverviewPage />}
        />
        <Route
          path={ROUTES.MANIFESTS_NEW_MANIFESTS_ROUTE}
          element={<NewManifestsPage />}
        />
        <Route
          path={ROUTES.MANIFESTS_UPDATES_ROUTE}
          element={<ManifestsUpdatesPage />}
        />
        <Route
          path={ROUTES.MANIFESTS_HISTORY_ROUTE}
          element={<ManifestsHistoryPage />}
        />
        <Route
          path={ROUTES.MANIFESTS_DETAILS_ROUTE}
          element={<ManifestsHistoryDetailsPage />}
        />
        <Route
          path={ROUTES.MANIFESTS_CREATE_EDIT_ROUTE}
          element={<CreateEditManifestPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;
