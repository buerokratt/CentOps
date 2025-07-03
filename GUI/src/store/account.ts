import { createStore } from 'store';
import type { ROLES } from 'utils/constants';

type AuthStore<T = ROLES> = {
  userRoles: T[];
};

export const accountStore = createStore<AuthStore>(() => ({
  userRoles: [],
}));
