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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;
