import type { FC, MouseEvent } from 'react';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { MenuTree } from 'components';
import useFilteredMenuItems from 'hooks/useFilteredMenuItems';
import 'components/MainNavigation/MainNavigation.scss';
import { type CountConf } from 'types/countConf';

interface MainNavigationProps {
  countConf?: CountConf;
}

export const MainNavigation: FC<MainNavigationProps> = ({ countConf }) => {
  const menuItems = useFilteredMenuItems(countConf);
  const serviceId = useMemo(
    () => import.meta.env.REACT_APP_SERVICE_ID?.split(','),
    []
  );

  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    setNavCollapsed(false);
    const isExpanded =
      event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute(
      'aria-expanded',
      isExpanded ? 'false' : 'true'
    );
  };

  const handleCloseButtonClick = () => {
    const doesMenuHasExpandedItem = !!document.querySelector(
      'button[aria-expanded="true"]'
    );
    if (doesMenuHasExpandedItem) setNavCollapsed(!navCollapsed);
  };

  if (!menuItems) return null;

  return (
    <nav className={clsx('nav', { collapsed: navCollapsed })}>
      <button
        className="nav__menu-toggle close-button-item"
        onClick={handleCloseButtonClick}
      >
        <span className="menu-item-title">Centops</span>
      </button>
      <ul className="nav__menu">
        <MenuTree
          menuItems={menuItems}
          serviceId={serviceId}
          handleNavToggle={handleNavToggle}
        />
      </ul>
    </nav>
  );
};

export default MainNavigation;
