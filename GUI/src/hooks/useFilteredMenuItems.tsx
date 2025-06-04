import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { type MenuItem } from '../types/menuItem';
import useMenuItems from './useMenuItems';
import { type CountConf } from '../types/countConf';

const rolePermissions = {
  ROLE_ADMINISTRATOR: ['clients'],
  ROLE_SERVICE_MANAGER: ['clients'],
  ROLE_CUSTOMER_SUPPORT_AGENT: ['clients'],
  ROLE_CHATBOT_TRAINER: ['clients'],
  ROLE_ANALYST: ['clients'],
};
type Role = keyof typeof rolePermissions;

const useFilteredMenuItems = (countConf?: CountConf) => {
  const items = useMenuItems(countConf);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const { data } = useQuery<{ response: Role[] }>({
    queryKey: ['accounts/user-role', 'prod'],
    // TODO, remove initialData
    initialData: { response: ['ROLE_ADMINISTRATOR'] },
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const roles = data.response;

    let permissions = new Set();

    roles.forEach((role) => {
      if (rolePermissions[role]) {
        rolePermissions[role].forEach((permission: any) =>
          permissions.add(permission)
        );
      }
    });

    const filteredItems = items.filter((item: any) => {
      return permissions.has(item.id);
    });

    setMenuItems(filteredItems ?? []);
  }, [items, data]);

  return menuItems;
};

export default useFilteredMenuItems;
