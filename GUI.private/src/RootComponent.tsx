import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
<<<<<<<< HEAD:GUI.private/src/RootComponent.tsx
import {
  CreateInvitationPage,
  OverviewPage,
  NotFoundPage,
  RequestsPage,
  EditRequestPage,
} from './pages';
========
import { ApplicationPage, OverviewPage, NotFoundPage } from './pages';
>>>>>>>> upstream/main:GUI.public/src/RootComponent.tsx
import { ROUTES } from './resources/routes-constants';
import './styles/main.scss';

const RootComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
<<<<<<<< HEAD:GUI.private/src/RootComponent.tsx
        <Route
          path={ROUTES.INVITATION_ROUTE}
          element={<CreateInvitationPage />}
========
        <Route path={ROUTES.APPLICATION_ROUTE} element={<ApplicationPage />} />
        <Route
          path={ROUTES.APPLICATION_ROUTE_WITH_ID}
          element={<ApplicationPage />}
>>>>>>>> upstream/main:GUI.public/src/RootComponent.tsx
        />
        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route path={ROUTES.REQUESTS_ROUTE} element={<RequestsPage />} />
        <Route
          path={ROUTES.REQUESTS_EDIT_ROUTE}
          element={<EditRequestPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;
