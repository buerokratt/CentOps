import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import {
  CreateInvitationPage,
  EditParticipantPage,
  NotFoundPage,
  OverviewPage,
  ParticipantsPage,
} from './pages';
import { ROUTES } from './resources/routes-constants';
import './styles/main.scss';
import ManifestsOverviewPage from './pages/manifests/ManifestsOverviewPage';
import NewManifestsPage from './pages/manifests/NewManifestsPage';
import ManifestsUpdatesPage from './pages/manifests/ManifestsUpdatesPage';
import ManifestsHistoryPage from './pages/manifests/ManifestsHistoryPage';
import ManifestsHistoryDetailsPage from './pages/manifests/ManifestsDetailsPage';
import CreateEditManifestPage from './pages/manifests/CreateEditManifestPage';

const RootComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
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
