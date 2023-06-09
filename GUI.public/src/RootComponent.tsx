import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { ApplicationPage, OverviewPage, NotFoundPage } from './pages';
import { ROUTES } from './resources/routes-constants';
import './styles/main.scss';

const RootComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.APPLICATION_ROUTE} element={<ApplicationPage />} />
        <Route
          path={ROUTES.APPLICATION_ROUTE_WITH_ID}
          element={<ApplicationPage />}
        />
        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default RootComponent;