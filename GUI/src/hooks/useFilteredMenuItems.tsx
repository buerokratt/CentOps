import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type MenuItem } from 'types/menuItem';
import useMenuItems from 'hooks/useMenuItems';
import { type CountConf } from 'types/countConf';
import { ROLES } from 'utils/constants';
import { accountStore } from 'store/account';

const rolePermissions = {
  [ROLES.ROLE_ADMINISTRATOR]: [
    'clients',
    'clusters',
    'audit',
    'monitoring',
    'documentation',
    'users',
  ],
  [ROLES.ROLE_UNAUTHENTICATED]: [],
};
type Role = keyof typeof rolePermissions;

const useFilteredMenuItems = (countConf?: CountConf) => {
  const items = useMenuItems(countConf);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { isSuccess, data } = useQuery<Role[]>({
    queryKey: ['account/user-role', 'prod'],
    // TODO, hardcode the tole, because api returns 300 status code
    initialData: [ROLES.ROLE_ADMINISTRATOR],
    retryDelay: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (isSuccess && data) {
      accountStore.setState({ userRoles: data });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const roles = data;

    const permissions = new Set<string>();

    roles.forEach((role) => {
      if (rolePermissions[role]) {
        rolePermissions[role].forEach((permission) =>
          permissions.add(permission)
        );
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredItems = items.filter((item: any) => {
      if (item.id === 'monitoring') {
        item.path = import.meta.env.REACT_APP_MONITORING_URL;
      }
      return permissions.has(item.id);
    });

    setMenuItems(filteredItems ?? []);
  }, [items, data]);

  return menuItems;
};

export default useFilteredMenuItems;
