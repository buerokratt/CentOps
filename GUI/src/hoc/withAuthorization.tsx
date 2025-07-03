import React, { useEffect, useState } from 'react';
import { ROLES } from 'utils/constants';
import { accountStore } from 'store/account';

export function withAuthorization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: ROLES[] = [ROLES.ROLE_ADMINISTRATOR]
): React.FC<P> {
  return (props: P) => {
    // Initialize state with the current value
    const [userRoles, setUserRoles] = useState(
      () => accountStore.getState().userRoles
    );

    useEffect(() => {
      // Set the initial state again to ensure we have the latest value
      setUserRoles(accountStore.getState().userRoles);

      // Subscribe to changes
      return accountStore.subscribe((state) => {
        setUserRoles(state.userRoles);
      });
    }, []);

    const allowed = allowedRoles?.some((x) => userRoles.includes(x));

    if (!userRoles.length) {
      return <span>Loading...</span>;
    }

    if (!allowed) {
      return <span>Unauthorized Access</span>;
    }

    return <WrappedComponent {...props} />;
  };
}
