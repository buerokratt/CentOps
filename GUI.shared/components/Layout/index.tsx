import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@centopsmodule/shared';
import './Layout.scss';

type LayoutProps = {
  navigation?: ReactNode;
  header?: ReactNode;
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  navigation,
  header,
  children,
}) => {
  return (
    <div className="layout">
      {navigation && navigation}
      <div className="layout__wrapper">
        {header ?? <Header />}
        <main className="layout__main">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;
