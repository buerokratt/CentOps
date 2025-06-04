import type { ReactNode } from 'react';

export interface MenuItem {
  id?: string;
  label: string;
  path: string | null;
  target?: '_blank' | '_self';
  children?: MenuItem[];
}

export interface MainNavigation {
  data: MenuItem[];
}

export interface MenuIcon {
  id: string;
  icon: ReactNode;
}
