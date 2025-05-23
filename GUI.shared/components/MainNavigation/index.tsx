import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { MdClose, MdKeyboardArrowDown } from 'react-icons/md';

import '@centopsmodule/shared/components/MainNavigation/MainNavigation.scss';
import { Icon } from '@centopsmodule/shared/components/Icon';
import type {
  MenuIcon,
  MenuItem,
} from '@centopsmodule/shared/types/mainNavigation';

interface MainNavigationProps {
  items: MenuItem[];
  icons: MenuIcon[];
}

export const MainNavigation: FC<MainNavigationProps> = ({
  items: menuItems,
  icons: menuIcons,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [navCollapsed, setNavCollapsed] = useState(false);

  const handleNavToggle = (event: MouseEvent) => {
    const isExpanded =
      event.currentTarget.getAttribute('aria-expanded') === 'true';
    event.currentTarget.setAttribute(
      'aria-expanded',
      isExpanded ? 'false' : 'true'
    );
  };

  const renderMenuTree = (menuItems: MenuItem[]) => {
    return menuItems.map((menuItem) => {
      const className = clsx('nav__toggle', {
        'nav__toggle--icon': !!menuItem.id,
      });
      const children = (
        <>
          {menuItem.id && (
            <Icon
              icon={menuIcons.find((icon) => icon.id === menuItem.id)?.icon}
            />
          )}
          <span>{menuItem.label}</span>
        </>
      );
      return (
        <li key={menuItem.label}>
          {menuItem.children?.length ? (
            <>
              <button
                className={className}
                aria-expanded={
                  menuItem.path && location.pathname.includes(menuItem.path)
                    ? 'true'
                    : 'false'
                }
                onClick={handleNavToggle}
              >
                {children}
                <Icon icon={<MdKeyboardArrowDown />} />
              </button>
              <ul className="nav__submenu">
                {renderMenuTree(menuItem.children)}
              </ul>
            </>
          ) : (
            <NavLink className={className} to={menuItem.path || '#'}>
              {children}
            </NavLink>
          )}
        </li>
      );
    });
  };

  return (
    <nav className={clsx('nav', { 'nav--collapsed': navCollapsed })}>
      <button
        className="nav__menu-toggle"
        onClick={() => setNavCollapsed(!navCollapsed)}
      >
        <Icon icon={<MdClose />} />
        {t('menu.close')}
      </button>
      <ul className="nav__menu">{renderMenuTree(menuItems)}</ul>
    </nav>
  );
};
