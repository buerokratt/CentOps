import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components'
import NotFoundPage from './pages/NotFoundPage'
import OverviewPage from './pages/OverviewPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.scss'

const RootComponent: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.OVERVIEW_ROUTE} element={<OverviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route >
    </Routes >
  );
};

export default RootComponent;
