import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import {
  ApplicationPage,
  ApplicationStatusPage,
  NotFoundPage,
  OverviewPage,
} from './pages';
import { ROUTES } from './resources/routes-constants';
import './styles/main.scss';
import ManifestsDetailsPage from './pages/manifests/ManifestsDetailsPage';
import PastUpdatesPage from './pages/manifests/PastUpdatesPage';
import FutureUpdatesPage from './pages/manifests/FutureUpdatesPage';

const RootComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.APPLICATION_ROUTE} element={<ApplicationPage />} />
        <Route
          path={ROUTES.APPLICATION_ROUTE_WITH_ID}
          element={<ApplicationPage />}
        />
        <Route
          path={ROUTES.APPLICATION_STATUS_ROUTE}
          element={<ApplicationStatusPage />}
        />

        <Route
          path={ROUTES.MANIFESTS_PAST_UPDATES_ROUTE}
          element={<PastUpdatesPage />}
        />

        <Route
          path={ROUTES.MANIFESTS_FUTURE_UPDATES_ROUTE}
          element={<FutureUpdatesPage />}
        />
        
        <Route    
          path={ROUTES.MANIFESTS_DETAILS_ROUTE}
          element={<ManifestsDetailsPage />}
        />
        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;
