import type { MenuItem } from 'types/menuItem';

export const isSameRoot = (menuItem: MenuItem, serviceId: string[]) => {
  const base = window.location.pathname.split('/')[1];
  const currentService = base === 'chat' ? serviceId : [base];
  if (menuItem.id && currentService.includes(menuItem.id)) {
    return menuItem.children?.some((item: MenuItem) =>
      item.path?.includes('/' + window.location.pathname.split('/')[2])
    );
  }
  return false;
};
