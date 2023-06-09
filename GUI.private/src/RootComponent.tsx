import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { CreateInvitationPage, OverviewPage, NotFoundPage } from './pages';
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;
